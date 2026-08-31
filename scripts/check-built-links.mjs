import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, extname, join, normalize, relative, resolve } from 'node:path';
import { URL } from 'node:url';

const root = resolve('dist');

if (!existsSync(root)) {
  console.error('dist/ does not exist. Run npm run build first.');
  process.exit(1);
}

const htmlFiles = [];

function walk(directory) {
  for (const entry of readdirSync(directory)) {
    const absolute = join(directory, entry);
    if (statSync(absolute).isDirectory()) walk(absolute);
    else if (extname(entry) === '.html') htmlFiles.push(absolute);
  }
}

function resolveTarget(value, sourceFile) {
  const [rawPath, fragment = ''] = value.split('#', 2);
  const pathname = rawPath.split('?')[0];
  const sourceDirectory = dirname(relative(root, sourceFile));
  let resolvedPath;
  if (!pathname) {
    resolvedPath = `/${relative(root, sourceFile).replaceAll('\\', '/')}`;
  } else if (pathname.startsWith('/')) {
    resolvedPath = pathname;
  } else if (pathname.startsWith('.') || pathname.includes('/')) {
    resolvedPath = `/${normalize(join(sourceDirectory, pathname)).replaceAll('\\', '/')}`;
  } else {
    resolvedPath = `/${normalize(join(sourceDirectory, pathname)).replaceAll('\\', '/')}`;
  }
  return { pathname: resolvedPath, fragment: decodeURIComponent(fragment) };
}

function targetFile(pathname) {
  const normalizedPath = decodeURIComponent(pathname).replace(/^\/+/, '');
  if (!normalizedPath) return join(root, 'index.html');

  const direct = join(root, normalizedPath);
  if (existsSync(direct) && statSync(direct).isFile()) return direct;
  if (existsSync(`${direct}.html`)) return `${direct}.html`;
  const index = join(direct, 'index.html');
  return existsSync(index) ? index : null;
}

walk(root);

const missing = [];
const targetIssues = [];
const linkPattern = /(?:href|src)=["']([^"']+)["']/g;
const srcsetPattern = /srcset=["']([^"']+)["']/g;
const anchorPattern = /<a\b[^>]*>/gi;
const siteOrigin = 'https://bigatic.org';

function attributeValue(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, 'i'));
  return match?.[1];
}

function internalTargets(html) {
  const targets = [];
  let match;
  linkPattern.lastIndex = 0;
  while ((match = linkPattern.exec(html)) !== null) targets.push(match[1]);
  srcsetPattern.lastIndex = 0;
  while ((match = srcsetPattern.exec(html)) !== null) {
    for (const candidate of match[1].split(',')) {
      const value = candidate.trim().split(/\s+/, 1)[0];
      if (value) targets.push(value);
    }
  }
  return targets;
}

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');

  if (/<base\b[^>]*\btarget=["']_blank["']/i.test(html)) {
    targetIssues.push(`${relative(root, file)} -> blanket <base target="_blank">`);
  }

  anchorPattern.lastIndex = 0;
  let anchor;
  while ((anchor = anchorPattern.exec(html)) !== null) {
    const href = attributeValue(anchor[0], 'href');
    if (!href || /^(?:mailto|tel|data|javascript):/i.test(href)) continue;

    let destination;
    try {
      destination = new URL(href, siteOrigin);
    } catch {
      continue;
    }

    const isExternal = /^https?:$/i.test(destination.protocol) && destination.origin !== siteOrigin;
    const opensNewTab = attributeValue(anchor[0], 'target') === '_blank';
    const rel = new Set((attributeValue(anchor[0], 'rel') ?? '').toLowerCase().split(/\s+/));

    if (isExternal && (!opensNewTab || !rel.has('noopener'))) {
      targetIssues.push(
        `${relative(root, file)} -> ${href} (external link must use target="_blank" and noopener)`,
      );
    } else if (!isExternal && opensNewTab) {
      targetIssues.push(
        `${relative(root, file)} -> ${href} (internal link must reuse the current tab)`,
      );
    }
  }

  for (const value of internalTargets(html)) {
    if (
      /^(?:[a-z]+:)?\/\//i.test(value) ||
      /^(?:mailto|tel|data|javascript):/i.test(value) ||
      value.startsWith('//') ||
      value.startsWith('/cdn-cgi/') ||
      value.includes('{')
    ) {
      continue;
    }

    const { pathname, fragment } = resolveTarget(value, file);
    const target = targetFile(pathname);
    if (!target) {
      missing.push(`${relative(root, file)} -> ${value}`);
      continue;
    }

    if (fragment && extname(target) === '.html') {
      const targetHtml = readFileSync(target, 'utf8');
      const escaped = fragment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (!new RegExp(`\\bid=["']${escaped}["']`).test(targetHtml)) {
        missing.push(`${relative(root, file)} -> ${value} (missing fragment)`);
      }
    }
  }
}

if (missing.length > 0) {
  console.error(`Found ${missing.length} unresolved internal link(s):`);
  for (const item of [...new Set(missing)]) console.error(`- ${item}`);
  process.exit(1);
}

if (targetIssues.length > 0) {
  console.error(`Found ${targetIssues.length} link target issue(s):`);
  for (const item of [...new Set(targetIssues)]) console.error(`- ${item}`);
  process.exit(1);
}

console.log(
  `Checked ${htmlFiles.length} HTML files: internal links resolve and link targets are correct.`,
);
