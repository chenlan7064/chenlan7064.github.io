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

- 提出TEMG-TTA,一种时间模式感知的图测试时自适应框架,用于提升区块链异常检测中的结构 表达能力和对时间分布偏移的鲁棒性
- 通过在多个真实世界区块链数据集上的大量实验，验证该方法始终优于最先进的baseline方法，平均优于SOTA方法54.88%，在时间分布漂移下保持鲁棒性。深入的motif分析和消融研究进一步证明了不同组件的有效性。

> TTA，即测试时自适应，相比传统学习流程的训练->部署->预测，TTA在部署以后的推理环节，还会根据目标数据微调模型，能够更好地适应分布偏移

> Motif，指重复出现的子图模式，比如存在三个节点，按时序进行了三次交易，节点与有时序的交易边组合起来就是一个Motif。本研究主要采用三节点+有时序的三边Motif，既能捕获超越成对连接的交互关系，又相对于四节点Motif计算代价更低更易紧凑表示

![](/images/%E8%81%94%E6%83%B3%E6%88%AA%E5%9B%BE_20260629125814.jpg)

TEMG-TTA架构如上所示，

实验在AlphaHomora、Crypto piaHacker、PlusTokenPonzi和UpbitHack四个公开数据集，以及Trace这个私有数据集上进行，使用GNN、GraphSAGE、SpaceGNN、DGAGNN作为baseline，时序GNN如DyG-Former由于训练成本过高而并不作为主要baseline。
