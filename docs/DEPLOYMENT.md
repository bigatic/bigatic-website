# Despliegue y dominio

BIGATIC se compila como un sitio estático portable. GitHub es la fuente de verdad y la misma salida `dist/` puede desplegarse en GitHub Pages o Cloudflare Pages sin bifurcar el código.

Cloudflare Pages es el hosting preferido; GitHub Pages se mantiene como alternativa compatible. Solo un proveedor debe ser el destino público autoritativo de `bigatic.org` en un momento dado.

## Preflight

Requisitos del build:

- Node.js según `.nvmrc` y el rango `engines.node` de `package.json`;
- npm y `package-lock.json` comprometido;
- cero secretos: el sitio no necesita variables de entorno para construir;
- acceso de lectura al repositorio.

Desde un checkout limpio:

```bash
npm ci
npm run verify
test -d dist
```

`npm run verify` ejecuta chequeo de Astro/TypeScript, integridad del contenido bilingüe, lint, comprobación de formato y build. El build también comprueba enlaces internos. El artefacto publicable es exclusivamente `dist/`; no despliegue `src/` ni ejecute un servidor Node en producción.

## Configuración canónica

Tres archivos deben mantenerse alineados:

| Archivo            | Valor o función                                                                        |
| ------------------ | -------------------------------------------------------------------------------------- |
| `astro.config.mjs` | `site: 'https://bigatic.org'`, necesario para canonical y sitemap                      |
| `src/data/site.ts` | `domain: 'https://bigatic.org'`, usado por layouts y datos estructurados               |
| `public/CNAME`     | Declaración portable/legacy; GitHub la ignora con un workflow personalizado de Actions |

No agregue `base` mientras el sitio se publique en la raíz de `bigatic.org`. No hardcodee `bigatic.github.io` en contenido o componentes.

## GitHub Pages

El workflow `.github/workflows/deploy.yml`:

- se activa con push a `main`, `workflow_dispatch` y un schedule diario;
- limita el job de build a `contents: read` y el de deploy a `pages: write` e `id-token: write`;
- instala, valida y construye mediante la action oficial de Astro;
- despliega el artefacto mediante GitHub Pages;
- serializa despliegues con `concurrency`.

El schedule diario (`05:20 UTC`, aproximadamente `00:20` en Colombia) no es un monitor en runtime: inicia un build estático nuevo para reevaluar las fechas civiles de convocatorias y después publica ese HTML en GitHub Pages. Las ejecuciones programadas usan el contenido de la rama por defecto, pueden comenzar con retraso y GitHub puede deshabilitarlas en repositorios públicos después de 60 días sin actividad. Verifique el historial antes de fechas críticas y use `workflow_dispatch` como respaldo; no dependa del cron para una hora legal o contractual exacta. Consulte [Events that trigger workflows: schedule](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule).

### Activación inicial

1. El administrador debe crear en la organización BIGATIC el repositorio previsto `bigatic/bigatic.github.io` y publicar allí el checkout validado.
2. Cuando el repositorio exista, abra **Settings → Pages** y seleccione **GitHub Actions** como source.
3. Confirme que Actions está habilitado para el repositorio y ejecute manualmente el workflow si todavía no hubo push a `main`.
4. Revise los jobs `build` y `deploy`; no continúe con DNS si el build falla.
5. En Pages, agregue `bigatic.org` como custom domain y siga el proceso de verificación de GitHub.
6. Aplique en el proveedor DNS únicamente los registros y valores que GitHub muestre o que figuren en su documentación oficial vigente.
7. Espere la propagación y emisión del certificado; después active **Enforce HTTPS** cuando GitHub lo permita.
8. Compruebe `https://bigatic.org`, redirección HTTPS, canonical, sitemap, RSS y una ruta profunda en ambos idiomas.

El repositorio incluye `public/.nojekyll` como marcador de sitio estático y `public/CNAME` como declaración portable/legacy del dominio previsto. Con el despliegue mediante un workflow personalizado de Actions, GitHub ignora el `CNAME` del artefacto: **Settings → Pages** o la API de Pages son la configuración autoritativa del custom domain.

Documentación oficial: [Deploy an Astro site to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/) y [Managing a custom domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## Cloudflare Pages

### Conexión con GitHub

1. En Cloudflare, cree un proyecto Pages y conecte la cuenta/organización de GitHub autorizada.
2. Cuando el administrador haya creado y publicado el repositorio previsto, seleccione `bigatic/bigatic.github.io`.
3. Configure:

   | Ajuste                 | Valor                |
   | ---------------------- | -------------------- |
   | Production branch      | `main`               |
   | Build command          | `npm run build`      |
   | Build output directory | `dist`               |
   | Root directory         | raíz del repositorio |

4. Asegure que el entorno de build use una versión de Node compatible con `.nvmrc` y `package.json`; no fije una versión distinta solo en el panel sin documentarla.
5. No configure adapter, Pages Functions, base de datos ni variables secretas: no son necesarias para v1.
6. Ejecute el primer deploy y valide la URL de preview antes de asociar el dominio.

Cada commit en `main` produce un deployment de producción. Las branches y pull requests pueden generar previews si la configuración del proyecto lo permite; esos previews no deben tratarse como el canonical ni indexarse como producción.

La integración Git de Cloudflare Pages no ejecuta el schedule del workflow de GitHub Pages. Como el estado de convocatorias se materializa en build time, programe o dispare un deployment de Cloudflare después del cambio de fecha pertinente. No añada infraestructura específica de Cloudflare al código del sitio solo para resolver esta operación.

### Dominio personalizado

1. Abra el proyecto Pages y use **Custom domains → Set up a domain**.
2. Introduzca `bigatic.org` y complete el flujo que Cloudflare muestre.
3. El administrador del dominio debe decidir dónde se administra la zona DNS y aplicar los cambios indicados por Cloudflare para el apex.
4. No cree registros manuales antes de asociar el dominio al proyecto ni copie valores de ejemplos de documentación.
5. Confirme certificado activo, HTTPS, redirecciones, canonical y rutas profundas.

Esta guía omite deliberadamente nombres de host de Pages, direcciones IP y valores de registros DNS: dependen del proyecto y del proveedor que el administrador elija. Consulte [Custom domains · Cloudflare Pages](https://developers.cloudflare.com/pages/configuration/custom-domains/) durante la activación.

## Headers opcionales de Cloudflare

`public/_headers` se copia durante el build a:

```text
dist/_headers
```

Cloudflare Pages interpreta ese archivo para respuestas estáticas. GitHub Pages no aplica estas reglas, por lo que son una mejora opcional y no un requisito funcional. La configuración actual contempla:

- `X-Content-Type-Options`;
- `Referrer-Policy`;
- `Permissions-Policy`;
- Content Security Policy;
- cache inmutable para assets fingerprinted;
- cache moderada para branding.

Después del build, confirme que existe:

```bash
test -f dist/_headers
```

Al agregar fuentes externas, analytics, imágenes remotas, embeds o formularios, revise la CSP antes de desplegar. No relaje `default-src` de forma general para resolver un único recurso. Cloudflare documenta la sintaxis en [Headers · Cloudflare Pages](https://developers.cloudflare.com/pages/configuration/headers/).

## Elección o migración de proveedor

El código puede desplegarse en ambos proveedores, pero DNS debe resolver a uno solo como producción. Para cambiar:

1. construya y valide el proveedor destino sin tocar DNS;
2. asocie y verifique el custom domain según el flujo del destino;
3. registre la ventana de cambio y un plan de reversión;
4. aplique únicamente los cambios DNS indicados por el destino;
5. verifique HTTPS, rutas profundas, assets, `_headers` cuando aplique, sitemap, RSS y formularios externos;
6. mantenga temporalmente disponible el deployment anterior para rollback;
7. retire la asociación anterior solo después de confirmar estabilidad.

No elimine `public/CNAME` solo por usar Cloudflare: mantiene documentado el dominio previsto y conserva compatibilidad con flujos legacy que lo consuman. No tiene efecto en el workflow personalizado actual de GitHub Pages; configure el dominio en Settings.

## Analytics opcional, inicialmente deshabilitado

La versión inicial no incluye scripts de analytics, cookies ni trackers. Cloudflare Web Analytics solo puede habilitarse después de:

1. aprobación institucional del propósito y responsables del tratamiento;
2. revisión de la documentación y comportamiento vigente del producto;
3. definición de métricas mínimas y tiempo de retención;
4. actualización de la política de privacidad si corresponde;
5. revisión de CSP y comprobación en producción;
6. registro del cambio en README y en el pull request.

No agregue el snippet “por si acaso”. Si se desactiva, retire también cualquier permiso CSP que haya dejado de ser necesario. La necesidad de avisos, consentimiento o un banner debe determinarse mediante evaluación institucional y jurídica según las tecnologías realmente activas y las jurisdicciones aplicables.

## Previews y no indexación

- Cloudflare Pages puede crear previews por branch/PR; limite el acceso si contienen contenido no aprobado.
- GitHub Actions despliega producción desde `main`; valide cambios visuales localmente o en un entorno autorizado antes del merge.
- No use la URL de preview en canonical, `site`, contenido ni sitemap.
- Confirme que la plataforma aplica noindex a previews o configure una protección específica en el panel; no asuma que un nombre de URL evita indexación.

## Verificación posterior al despliegue

Checklist mínimo:

- [ ] `https://bigatic.org/` responde por HTTPS;
- [ ] `/en/` y rutas internas profundas responden sin fallback de SPA;
- [ ] canonical apunta a `https://bigatic.org`, nunca al host de preview;
- [ ] alternates ES/EN y `x-default` son válidos;
- [ ] `/sitemap-index.xml` o el sitemap generado responde;
- [ ] `/rss.xml` y `/en/rss.xml` responden;
- [ ] `/robots.txt` responde y permite indexación de producción;
- [ ] assets oficiales, favicon, imagen OG y póster cargan;
- [ ] formulario externo de una convocatoria abierta funciona;
- [ ] una convocatoria cerrada no muestra CTA de inscripción;
- [ ] headers de seguridad se aplican en Cloudflare si se usa `_headers`;
- [ ] no aparecen secretos, errores de consola ni enlaces internos rotos.

## Imagen Open Graph generada

La imagen social por defecto se sirve desde `public/images/og-default.png`. Se genera desde los logos locales mediante:

```bash
npm run generate:og
```

El comando no forma parte de `npm run build`. Ejecútelo cuando cambie `scripts/generate-og-image.mjs` o cualquiera de sus assets de entrada, inspeccione el PNG de 1200 × 630 y comprometa el archivo generado. El resultado puede variar entre plataformas por las fuentes del sistema usadas al rasterizar; el PNG versionado es el artefacto autoritativo y garantiza que GitHub Pages y Cloudflare Pages publiquen exactamente la misma imagen sin generar otra durante el deploy.

## Rollback

La fuente de verdad es Git:

- para una regresión de contenido o código, cree un commit que revierta el cambio y deje trazabilidad;
- en GitHub Pages, despliegue ese commit mediante el workflow;
- en Cloudflare Pages, puede restaurarse un deployment conocido desde el panel o desplegarse el commit revertido, según las capacidades vigentes;
- después de rollback, repita la verificación posterior al despliegue.

No reescriba `main`, no borre historial y no cambie DNS como primer mecanismo de rollback para una regresión de aplicación.

## Resolución de problemas

### El build falla en la plataforma pero no localmente

- confirme versión de Node y uso de `npm ci`;
- compruebe que `package-lock.json` está actualizado;
- revise diferencias entre mayúsculas/minúsculas en rutas de archivos;
- ejecute el build desde un checkout limpio;
- no solucione el problema añadiendo secretos o desactivando validaciones.

### Una ruta profunda devuelve 404

- confirme que existe el archivo de página o entrada no draft;
- compruebe `routeSlug`, `locale` y `translationKey`; el campo antiguo `slug` no pertenece al schema estricto;
- revise que el contenido se generó dentro de `dist/`;
- valide que el proveedor sirve páginas estáticas por directorio y que no está configurado como SPA.

### El dominio no activa HTTPS

- confirme primero que el dominio está asociado en el panel del proveedor elegido;
- revise el estado que muestra ese proveedor;
- valide los registros directamente con el administrador DNS;
- compruebe restricciones CAA si el proveedor las señala;
- no añada registros de ejemplo ni desactive seguridad TLS para acelerar la activación.
