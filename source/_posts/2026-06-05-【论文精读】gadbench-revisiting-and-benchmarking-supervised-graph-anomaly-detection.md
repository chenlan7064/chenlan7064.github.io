---
title: '【论文精读】GADBench: Revisiting and Benchmarking Supervised Graph Anomaly Detection'
date: 2026-06-05T08:58:00
updated: ''
tags: []
categories: 论文精读
cover: ''
description: ''
sticky: false
math: false
mermaid: false
---

## 引言

**benchmark**（基准）的原意是用作衡量、比较或判断其他事物性能、质量、价值等的参照点或标准。相比普通论文，benchmark论文并不发明新的方法，而是把别人已经提出的方法全部拉出来，在统一的条件（相同数据、相同评价标准、相同硬件）下公平比拼，回答一个问题："到底谁更强？"

**GAD**(图异常检测)是一种识别图中那些与大多数参考对象存在显著偏离的异常图对象的过程，这些对象可以包括**节点**、**边**或**子结构**等。其应用领域包括：防止金融欺诈和洗钱行为、预测网络入侵和设备故障、识别垃圾评论和虚假新闻等。相比表格数据异常检测，GAD将对象间的依赖关系纳入考虑，增强了识别欺诈行为的能力，但与此同时也存在着**标签不平衡**、**特征多样性**以及**关系伪装**等独特的挑战。

- 标签不平衡：异常对象远少于正常对象（10000个人中只有1个骗子）
- 特征异配：[同配图和异配图是什么](https://blog.csdn.net/weixin_51087794/article/details/144307689) 异常节点和邻居节点通常特征差异更大，呈现出高异配性：异常节点更倾向于和特征、标签不同的正常节点相连，和正常节点普遍存在的同配性（同类特征节点相连）形成鲜明对比，这种特征异质性会干扰GNN的邻居聚合过程，增加异常检测难度。
- 关系伪装：异常节点会主动和大量正常节点建立连接，伪装成正常样本的关系结构，降低自身被识别的概率；但实际上异常节点仍主要和同类异常节点保持核心连接，这种连接模式提升了检测难度（骗子会故意加大量正常人为好友躲避检测）

下图为目前的GAD基准

![](https://raw.githubusercontent.com/chenlan7064/Picbed_PicGo/main/img/GAD%E5%9F%BA%E5%87%86.jpg)

从图中可以看到，目前GAD基准存在的问题：

- 缺乏一个全面的监督性（半监督+有监督）基准。与此同时，已经存在非常多时间序列数据、图像、视频以及表格数据的异常检测基准
- 树集成方法与GNN之间的比较缺乏研究。前面的基准只对GNN方法进行了比较，最新的BOND基准依然只包括GNN和标准方法
- 对大尺度图的探索依然有限。

**GADbench**所做的，就是在**GAD**(图异常检测)领域提供了一个针对静态图的有监督方法基准。

## GADbench构成

#### 基准数据集

来自真实世界的10个GAD数据集

![](https://raw.githubusercontent.com/chenlan7064/Picbed_PicGo/main/img/%E5%9F%BA%E5%87%86%E6%95%B0%E6%8D%AE%E9%9B%86.jpg)

可以看到，这些数据集具有以下特点：

- **真实的异常**：GADBench 中的数据集仅包含在实际场景中自然出现的异常情况，这与之前那些使用合成异常数据进行 GAD 评估的研究有所不同。这些早期的研究通常会向正常图结构中插入人工节点属性和结构，比如 Cora[71]中的做法，从而生成一些相对容易识别的异常，而且这些异常显然与现实世界中的异常有所不同。
- **广泛的领域**：GADBench 中的数据集涵盖多个领域，包括社交媒体、电子商务、电子金融以及众包等
- **不同的规模范围**：GADBench 的数据集涵盖了广泛的节点数量范围，从数千（weibo,8405）到数百万(T-social,5781065)个节点不等
- **不平衡的比例**：每个数据集中的异常数量超过 100 个，这样可以保证实验结果的稳定性：同时，异常比例不超过 25%，从而保留了 GAD 系统固有的不平衡特性。

在这些数据集中，Weibo、Reddit、Questions 和 T-Social 这些数据集被专门用于识别社交媒体平台上的异常账户。Tolokers、Amazon 和 YelpChi 数据集则旨在检测众包或电子商务平台上的欺诈性员工、评论以及评论者。T-Finance、Elliptic 和 DGraph-Fin 这些数据集则分别专注于识别金融网络中的欺诈用户、非法实体以及逾期未偿还的贷款。如需了解每个数据集的更详细描述

#### 基准模型

###### 经典方法

MLP, KNN, SVM, RF, XGBoost, XGBOD, NA

###### 标准GNN

GCN , SGC , GIN , GraphSAGE , GAT , GT , PNA ,BGNN, RGCN , HGT

###### 异常检测特化的GNN

GAS , DCI , PC-GNN , GAT-sep , BernNet , AMNet ,BWGNN , GHRN , CARE-GNN , H2-FDetector 

###### 基于邻居聚合的树集成模型

RF-Graph，XGB-Graph

![](https://raw.githubusercontent.com/chenlan7064/Picbed_PicGo/main/img/%E5%9F%BA%E5%87%86%E6%A8%A1%E5%9E%8B.jpg)

#### 评估指标

AUROC：ROC曲线下的面积，对头部的预测不敏感

AUPRC：PR曲线下的面积，适配GAD中正负样本（异常样本极少）极度不平衡的场景，在ROC和top-k之间取得了平衡

Rec@K：基于top-K检索的召回率指标，对整体不敏感

## 复现

#### 默认超参数条件+全监督

![](https://raw.githubusercontent.com/chenlan7064/Picbed_PicGo/main/img/fig_Rec%40K_barchart.png)

![](https://raw.githubusercontent.com/chenlan7064/Picbed_PicGo/main/img/fig_AUROC_barchart.png)

![](https://raw.githubusercontent.com/chenlan7064/Picbed_PicGo/main/img/fig_AUPRC_barchart.png)![](https://raw.githubusercontent.com/chenlan7064/Picbed_PicGo/main/img/AUPRC_boxplot.png)

![](https://raw.githubusercontent.com/chenlan7064/Picbed_PicGo/main/img/Rec%40K_boxplot.png)

![](https://raw.githubusercontent.com/chenlan7064/Picbed_PicGo/main/img/AUROC_boxplot.png)

![](https://raw.githubusercontent.com/chenlan7064/Picbed_PicGo/main/img/Time_Total.png)

结果分析：在所有模型使用默认超参数，全监督的情况下，采用邻居聚合机制的集成树具有显著优越的性能，XGB-Graph 和 RF-Graph 在所有指标上都持续优于其他比较模型

#### 实验中遇到的问题

一开始我是打算在本地跑这个实验的，但是本地是5070显卡，论文环境依赖的DGL 官方没有为 Windows 发布 CUDA 12.4+ 版本，而 RTX 5070 又必须用 CUDA 12.4+才支持。两个约束冲突了。我尝试通过WSL来规避这个问题，但依然困难重重，最终还是决定转云平台

由于论文实验环境是48GB显存，而云平台4090是24GB显存，因而在 tfinance上跑HGT时炸显存了，HGT跳过。

DGraph-Fin和T-Social数据集过于庞大，超出承受范围，同样予以跳过。
