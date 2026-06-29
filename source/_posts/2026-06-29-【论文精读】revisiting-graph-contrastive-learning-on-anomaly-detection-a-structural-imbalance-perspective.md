---
title: 【论文精读】Temporal Motif-aware Graph Test-time Adaptation for OOD Blockchain Anomaly Detection
date: 2026-06-29T10:39
updated: ''
tags: []
categories: '#论文精读'
cover: ''
description: ''
sticky: false
math: false
mermaid: false
---

区块链交易网络具有大规模、有向、具有时序性的特征。由于新型加密货币技术和攻击策略的发展，区块链上的异常行为会不断演变，导致基于历史数据训练的模型在实际部署中面对严重的**OOD（分布外）问题**

现有的常规GAD方法大多数仍然依赖于监督学习，且对分布偏移敏感。本研究发现，当前已有的工作存在两个尚未解决的挑战：（i）现有的图异常检测方法很少显式地对时序模式进行建模, 限制了其捕捉不断演化的对抗模式的能力;(ii) 监督学习方法难以适应分布外设置下的结构变化。

基于以上挑战，本研究提出了一种**时间模式感知的图测试时自适应(TEMG-TTA)框架**，以实现针对OOD区块链异常检测的显式时间模式感知。该研究的主要贡献可以归纳为以下几点：

- 设计了一种高效的模式匹配算法,将时间复杂度从O()降低到O(M · k2),其中M是交易数量, k是受限时间窗口内的最大边数
