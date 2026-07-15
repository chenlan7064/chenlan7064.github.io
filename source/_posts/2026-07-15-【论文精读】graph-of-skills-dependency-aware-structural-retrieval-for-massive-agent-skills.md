---
title: '【论文精读】Graph-of-Skills: Dependency-Aware Structural Retrieval for Massive Agent Skills'
date: 2026-07-15T11:52
updated: ''
tags: []
categories: ''
cover: ''
description: ''
sticky: false
math: false
mermaid: false
---

随着LLM agent的skills库的增长，LLM agent的一大核心挑战从是否使用、何时使用以及如何正确格式化调用某个skills变为了如何找出完成任务所需的最接近skills集合。两种常见策略被应用于处理skills库，一种是**基础技能（Vanilla Skills）**，将整个skills库前置到上下文窗口中，这种方法的优点是简单，但仅适用于小型skills库，随着skills库的增长，token成本也会随着注入skills库的增长而同步线性增长，且过载上下文也容易导致模型忽略关键领域约束。另一种方法是**基于向量的检索（Vector Skills）**，通过检索语义相近的skills来提升效率，然而，语义相近不代表可执行充分性，在工程任务中，语义最为相近的可能是一个高层的求解器，但是为了完成任务，实际的解决方案依然要依赖低层的工具。

![](%E8%81%94%E6%83%B3%E6%88%AA%E5%9B%BE_20260715143626.jpg)

为了克服前两种方法的不足，本研究提出了技能图谱（GoS）,一种面向大型本地技能库的推理时结构检索层。GoS在本地skills包上构建有向多关系图，其中节点为可执行技能，边编码了前置条件和工作流结构。查询时，先通过语义和词汇信号识别一个小型种子集，再利用反向感知的个性化PageRank（PPR），来恢复执行时结构上重要的额外技能。结果是一个有界的技能包，既相关又比孤立的前k检索更接近依赖完整性。

目前已有利用图结构检索提高知识访问能力的工作，如GraphRAG和ToolNet，但这些工作的情境都不是直接针对大规模本地技能库的检索，GraphRAG针对知识合成、记忆访问或关系问答，ToolNet主要关注推理过程中基于图的工具规划与导航。相比之下，本研究的GoS主要聚焦于上游检索层的构建，在生成开始之前一次性检索出一个依赖完整的最小相关可执行skills集合，并保持预算可控。

本研究的贡献可以主要归纳为以下两点：

- 提出了代理型skill使用管道GoS，将离线图构建与推理时结构检索相结合，提高技能选择准确性的同时减少输入令牌消耗。
- 在两个benchmark（SkillBench、ALFWorld）和三个模型家族（）上评估了GoS，发现在GPT-5.2 Codex下的1,  000技能SkillsBench设置中,GoS相比完整技能加载基线获得了25.55%的峰值奖励提升,同时总令牌数减少了56.72%,并且在每个模型-基准测试块中均持续优于两个基线。额外的消融实验在200到2,000个技能库中证实了这一模式

设C={$d_{1} ...d_{m} $}为skill包的本地语料库，GoS将C转化为类型化的有向图G=（V,E,w,$\varphi $）,其中每个节点v是一个规范化的可执行skill记录，每条边e连接两个skill，w(e)>0代表边的权重，$\varphi （e）\in R$从关系集R中集中分配边类型，关系集R如下所示：

R={dep,wf,sem,alt}

> dep (dependency，依赖)

> skill B 的 input 正好是 skill A 的 output。确定性匹配——不需要 LLM，代码直接比对 I/O 字段算出。

> 例：A 输出 .stl 文件 → B 输入 .stl 文件 → 自动连 dep 边。

> wf (workflow，工作流)

> 两个 skill 经常按顺序一起用的多步流程。LLM 判定。

> 例：先用 mesh-analysis 解析 STL，再用 3d-visualizer 渲染 → LLM 连 wf 边。

> sem (semantic，语义)

> 功能相近或话题相似的可互换 skill。LLM 判定。

> 例：pdf-extractor 和 doc-parser 都能读文档 → LLM 连 sem 边。

> alt (alternative，替代)

> 同一问题的不同解法，互斥。LLM 判定。

> 例：pytorch-trainer 和 tensorflow-trainer 都能训练模型 → LLM 连 alt 边。

>   PPR 扩散时权重不同：dep=1.0（最强）→ wf=0.7 → sem=0.4 → alt=0.3（最弱）。这意味着搜索"解 STL 文件"时，dep 边传给前置依赖的分数最高，确保必需的前置 skill 被优先召回。

给定一个任务查询q和一个上下文预算τ,检索问题是返回一个同时满足相关性、尽可能执行完整且紧凑的束B(q)⊆V。我们将此视为一个有预算的选择问题:

$\underset{B\subseteq V}{max}\sum_{v\in B}rel(v,q)+\beta \sum_{(u,v)\in E_{dep} }\mathbb{I}[u\in B\wedge v\in B]$

$s.t. cost(B)<=τ$

其中$\mathbb{I}[\cdot ]$为指示函数，当方括号内的条件满足时取值1，否则取值0。该函数第一项倾向于查询相关性，第二项则奖励依赖完整的捆绑包。cost(B)用以衡量水化（指持久化）捆绑包消耗的prompt预算。该函数不会精确求解，但会通过以下三阶段来近似达到目标：混合种子检索、反向感知图扩散以及预算重排序加水化。

![](%E8%81%94%E6%83%B3%E6%88%AA%E5%9B%BE_20260715143700.jpg)

GoS的框架如上图所示。首先，将本地的skill库解析并标准化为规范的skill记录，通过I/O匹配来找出依赖边，通过LLM对语义关系的判断找出其他三类边，依据规范化的skill节点与建立起的四种边，构建出skill graph。然后，将任务查询通过LLM映射为紧凑查询模式，结合密集检索和词汇检索得到合并种子，应用反向感知个性化PageRank,并在重排序和补充信息后返回预算执行包。其中，密集检索有着能有效找到顶级skill的优点，但难以找到语义微妙的先决条件的缺点；词汇检索对于具体的人工制品和文件名稳健，但是释义下很脆弱。
