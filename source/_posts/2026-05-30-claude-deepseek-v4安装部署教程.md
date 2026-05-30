---
title: Claude+deepseek v4安装部署教程
date: 2026-05-30T11:58:00
updated: 2026-05-30T11:58:00
tags:
  - '#VibeCoding'
categories: '#入门'
cover: https://raw.githubusercontent.com/chenlan7064/Picbed_PicGo/main/img/306e43a457d5294bd720e262d4841918.jpg
description: ''
sticky: false
---

## 1.为什么要安装Claude？

Claude Code并非一个单一的AI模型，而是一个**专为开发者设计的AI编程助手（Agent）**。它的核心价值在于将自然语言指令转化为具体的开发行动，其安装意义主要体现在：

- **工程化思维**：它擅长理解复杂的项目上下文，能进行架构设计、代码重构和系统性思考，而不仅仅是生成代码片段。
- **自动化工作流**：Claude Code可以执行一系列连贯的任务，例如创建项目脚手架、运行测试、调试代码、生成文档等，模拟一个初级开发者的完整工作流程。
- **深度集成**：作为命令行工具，它能与本地开发环境深度交互，直接操作文件系统，提供更贴近实际编程的辅助体验。

简单来说，安装Claude Code是为了获得一个具备**工程化思维和自动化执行能力**的AI编程伙伴。

## 2.Claude Code能干什么？

Claude Code的能力覆盖软件开发生命周期的多个关键环节，尤其适合高频使用命令行的开发者（如运维、后端、全栈工程师）。其主要应用场景包括：

- **项目初始化与架构设计**：快速生成符合最佳实践的项目结构，为React、Vue、微服务等应用提供初始蓝图。
- **核心编码与调试**：根据需求描述生成高质量、可运行的代码，并能够诊断和修复代码中的错误。
- **代码审查与重构**：分析现有代码，提出优化建议，并执行安全、可控的重构操作。
- **生成测试用例与文档**：自动编写单元测试、集成测试，并生成清晰的技术文档或API说明。
- **自动化部署与脚本编写**：协助完成部署流程的自动化，编写运维脚本和日常自动化任务。

许多开发者的实践反馈表明，一个配置得当的Claude Code已经能够丝滑地处理日常开发中的大部分任务。本博客的搭建配置就是完全由Claude Code所完成的

## 3.为什么选择DeepSeek V4作为接入后端？

虽然Claude Code设计之初适配Anthropic自家的模型（如Opus、Sonnet），但将其后端切换至DeepSeek V4是一个极具成本效益和实用性的策略。主要原因如下：

1. **极致的成本控制**
使用原生Claude模型（如Sonnet 4.6）处理大量编程任务成本高昂。而DeepSeek V4系列模型在保持强大性能的同时，价格极具竞争力。一个典型的对比是：处理400万Tokens的编程任务，使用Claude Sonnet 4.6可能需花费约26美元，而使用DeepSeek V4可将成本降低至约2美元，降幅超过90%。
2. **卓越的技术性能**

    - **长上下文支持**：DeepSeek V4支持128K乃至1M Tokens的上下文窗口，非常适合处理大型代码库和复杂项目需求。
    - **扎实的编程基准**：在主流编程基准测试中表现优异，尤其在软件工程、工具调用和浏览器自动化任务上能力突出。
    - **模型可选性**：提供`deepseek-v4-pro`（深度推理）和`deepseek-v4-flash`（轻量快速）两个版本，可根据任务复杂度灵活调度。

3. **无缝的接入体验**
DeepSeek平台原生支持Anthropic API格式，这意味着无需复杂的代理或中间层即可让Claude Code直接调用。配置仅需两步：

    - 设置环境变量，将请求指向DeepSeek的API端点。
    - 在Claude Code的配置文件中指定使用DeepSeek的模型名称。

4. **混合编程范式**
最实用的策略并非完全用DeepSeek V4替代高端模型，而是**让它们各司其职**。可以构建这样的工作流：

    - **DeepSeek V4 作为主力引擎**：处理日常编码、脚本编写、单元测试、基础架构等低风险、高频率任务。
    - **高端模型（如Claude Opus）作为精加工工具**：仅在需要进行复杂架构设计、关键代码审查或深度逻辑推理时调用。

**总结而言**，安装Claude Code是为了获得一个工程化的AI编程代理；而选择接入DeepSeek V4，则是在确保核心能力不受重大影响的前提下，实现成本的大幅优化和资源的智能调度，从而打造一个真正高效、实用的个人AI开发环境。

## 4.如何安装Claude

### 1.前置准备

安装Node.js 18+,详情参考[node.js安装及环境配置超详细教程【Windows系统安装包方式】](https://zhuanlan.zhihu.com/p/442215189)

Windows 用户需安装 [Git for Windows](https://git-scm.com/download/win)。

获取deepseekapi，这里提供两种方式。第一种是前往[deepseek官网](https://platform.deepseek.com)，注册登录账号以后，在左侧选择API keys选项卡，选择创建API keys，生成api，名称可以随便取。密钥目前只在生成时可见，生成以后建议立刻妥善到本地。![](https://raw.githubusercontent.com/chenlan7064/Picbed_PicGo/main/img/%E8%81%94%E6%83%B3%E6%88%AA%E5%9B%BE_20260530112740.jpg)

### 2.安装Claude Code

在命令行界面，执行以下命令安装 Claude Code：

`npm install -g @anthropic-ai/claude-code`

> 假如出现`npm : 无法加载文件 D:\Nodejs\node_global\npm.ps1，因为在此系统上禁止运行脚本`的报错，是由于Windows系统中PowerShell的执行策略限制了脚本的执行，而你要执行的文件是一个PowerShell脚本文件，所以默认情况下无法执行。只需要执行以下命令来更改执行策略为RemoteSigned并设置为作用于当前用户即可。

`Set-ExecutionPolicy -Scope CurrentUser`

安装结束后，执行以下命令，若显示版本号则安装成功：

`claude --version`

### 3.配置环境变量

Linux / Mac 用户执行以下命令配置 [DeepSeek Anthropic API](https://api.deepseek.com/anthropic) 环境变量，其中 API Key 在 [DeepSeek Platform](https://platform.deepseek.com/api_keys) 获取：

```plain
export ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic
export ANTHROPIC_AUTH_TOKEN=<你的 DeepSeek API Key>
export ANTHROPIC_MODEL=deepseek-v4-pro[1m]
export ANTHROPIC_DEFAULT_OPUS_MODEL=deepseek-v4-pro[1m]
export ANTHROPIC_DEFAULT_SONNET_MODEL=deepseek-v4-pro[1m]
export ANTHROPIC_DEFAULT_HAIKU_MODEL=deepseek-v4-flash
export CLAUDE_CODE_SUBAGENT_MODEL=deepseek-v4-flash
export CLAUDE_CODE_EFFORT_LEVEL=max
```

Windows用户在powershell执行以下命令：

```plain
$env:ANTHROPIC_BASE_URL="https://api.deepseek.com/anthropic"
$env:ANTHROPIC_AUTH_TOKEN="<你的 DeepSeek API Key>"
$env:ANTHROPIC_MODEL="deepseek-v4-pro[1m]"
$env:ANTHROPIC_DEFAULT_OPUS_MODEL="deepseek-v4-pro[1m]"
$env:ANTHROPIC_DEFAULT_SONNET_MODEL="deepseek-v4-pro[1m]"
$env:ANTHROPIC_DEFAULT_HAIKU_MODEL="deepseek-v4-flash"
$env:CLAUDE_CODE_SUBAGENT_MODEL="deepseek-v4-flash"
$env:CLAUDE_CODE_EFFORT_LEVEL="max"
```

进入项目目录，执行 `claude` 命令，即可开始使用了。注意，必须和上面的操作在同一个终端执行，每次启动claude，都需要重新执行一遍以上环境变量配置，因而建议让Claude写一个脚本，实现自动配置启动

```plain
cd /path/to/my-project
claude
```

成功接入DeepSeek v4后的Claude界面如下所示，接下来只需要用自然语言向Claude提出要求即可，享受你的VibeCoding之旅吧！

![](https://raw.githubusercontent.com/chenlan7064/Picbed_PicGo/main/img/Claude%E8%BF%90%E8%A1%8C%E7%A4%BA%E4%BE%8B%E5%9B%BE.jpg)
