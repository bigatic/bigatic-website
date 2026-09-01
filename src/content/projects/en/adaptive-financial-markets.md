---
title: Adaptive model for financial-market decisions
routeSlug: adaptive-financial-markets
locale: en
translationKey: adaptive-financial-markets
summary: 'Design and evaluation of an adaptive model for supporting decisions under changing market conditions.'
status: planned
researchAreas:
  - ai-data
  - software-engineering
lead: diego-alejandro-correa-reyes
members:
  - andres-david-elizalde-peralta
  - diego-alejandro-correa-reyes
collaborators: []
abstract: 'This project studies how decision-support models can adapt when data distributions and market regimes change. Its scope is academic and experimental; it does not constitute financial advice or promise returns.'
problem: 'Models trained on historical data may degrade when volatility, liquidity, or relationships among variables change. That degradation must be measured, and update strategies must be compared under a correct temporal protocol.'
objectives:
  - 'Define a decision task, variables, and evaluation metrics.'
  - 'Compare static baselines with adaptive strategies.'
  - 'Analyze robustness, drift, cost, and generalization limits.'
methodology: 'Retrospective evaluation with temporal splits, explicit costs, baselines, and out-of-sample testing. Information leakage will be controlled, and both positive and negative findings will be reported.'
technologies:
  - Python
  - Time-series analysis
  - Machine learning
publications: []
software: []
datasets: []
partners: []
featured: true
gallery: []
tags:
  - Adaptive systems
  - Financial markets
  - Time series
draft: false
---

The first planned deliverable is a reproducible experimental protocol. The model will be judged through out-of-sample comparisons rather than isolated examples.
