---
title: '【论文精读】GADBench: Revisiting and Benchmarking Supervised Graph Anomaly Detection'
date: 2026-06-05T08:58:00
updated: ''
tags: []
categories: ''
cover: ''
description: ''
sticky: false
math: false
mermaid: false
---

## 引言

**benchmark**（基准）的原意是用作衡量、比较或判断其他事物性能、质量、价值等的参照点或标准。相比普通论文，benchmark论文并不发明新的方法，而是把别人已经提出的方法全部拉出来，在统一的条件（相同数据、相同评价标准、相同硬件）下公平比拼，回答一个问题："到底谁更强？"

**GAD**(图异常检测)是一种识别图中那些与大多数参考对象存在显著偏离的异常图对象的过程，这些对象可以包括**节点**、**边**或**子结构**等。其应用领域包括：防止金融欺诈和洗钱行为、预测网络入侵和设备故障、识别垃圾评论和虚假新闻等。相比表格数据异常检测，GAD将对象间的依赖关系纳入考虑，增强了识别欺诈行为的能力，但与此同时也存在着**标签不平衡**、**特征多样性**以及**关系伪装**等独特的挑战。

**GADbench**所做的，就是在**GAD**(图异常检测)领域提供了一个针对静态图的有监督方法基准。

## GADbench构成

#### 基准数据集

来自真实世界的10个GAD数据集

#### 基准模型

###### 经典方法

MLP, KNN, SVM, RF, XGBoost, XGBOD, NA

###### 标准GNN

GCN , SGC , GIN , GraphSAGE , GAT , GT , PNA ,BGNN, RGCN , HGT

###### 异常检测特化的GNN

GAS , DCI , PC-GNN , GAT-sep , BernNet , AMNet ,BWGNN , GHRN , CARE-GNN , H2-FDetector 

###### 基于邻居聚合的树集成模型

RF-Graph，XGB-Graph
