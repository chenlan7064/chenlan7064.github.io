---
title: '【论文精读】Graph-of-Skills: Dependency-Aware Structural Retrieval for Massive Agent Skills'
date: 2026-07-14T13:40
updated: ''
tags: []
categories: ''
cover: ''
description: ''
sticky: false
math: false
mermaid: false
---

随着LLM agent的skills数量不断膨胀，大型skills库的核心挑战从是否使用某个skill变成了如何找出为了解决某项任务最适合的skills集合。目前已有两种策略用以应对大型skills库中skill的检索，一个是Vanilla Skills，将整个skill库前置到上下文窗口中，但这种方法只能适用于小型skill集，可扩展性差，token成本随库大小线性增长，且容易忽略关键领域约束；另一种策略是基于向量的检索，通过检索语义相似的skill来提高效率，但是语义相似不代表可执行充分性，在许多工程任务中，语义相似度最高的是高层求解器，但是实际解决方案还需要语义相似度较低的底层解析器、转化器等。

本实验提出的技能图谱（Graph-of-Skills，GoS）旨在克服前两种方案的不足。其思路为在本地skills包上构建有向多关系图，
