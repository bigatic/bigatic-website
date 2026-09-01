---
title: Multimodal phishing detection
routeSlug: multimodal-phishing-detection
locale: en
translationKey: multimodal-phishing-detection
summary: 'Evaluation of textual, visual, and technical signals for detecting phishing attempts with reproducible models.'
status: planned
researchAreas:
  - cybersecurity
  - ai-data
members:
  - ismael-manuel-castellano-galvan
  - silvia-juliana-sandoval-rojas
collaborators: []
abstract: 'The project will study how text, visual elements, and technical metadata can be combined to classify phishing samples. Its expected contribution is a transparent evaluation of which modalities add value and under what conditions.'
problem: 'Detectors based on a single source of information may fail when campaigns imitate legitimate content, visual structure, or infrastructure. Combining modalities adds information, but it also introduces cost, bias, and data leakage risks.'
objectives:
  - 'Define modalities, sources, and a safe data preparation protocol.'
  - 'Build comparable unimodal and multimodal baselines.'
  - 'Evaluate accuracy, robustness, cost, and explainability.'
methodology: 'Reproducible experimentation with controlled splits, simple baselines, and ablation analysis. Provenance, balance, possible leakage, and generalization limits will be documented.'
technologies:
  - Python
  - Natural language processing
  - Computer vision
publications: []
software: []
datasets: []
partners: []
featured: false
gallery: []
tags:
  - Phishing
  - Multimodal learning
  - Detection
draft: false
---

The first phase will use a bounded sample and interpretable baselines. A more complex model will be justified only if it demonstrates a consistent improvement.
