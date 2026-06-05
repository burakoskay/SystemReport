---
title: "AI赋能的代码审查工具逐渐流行"
date: 2026-06-05T10:03:24.347Z
tags: ["AI","code review","GitHub"]
hero_image: "/hero/2026-06-05-ai-powered-code-review-tools-gain-traction-32ddda.jpg"
hero_image_credit_name: "Jakub Zerdzicki"
hero_image_credit_url: "https://www.pexels.com/@jakubzerdzicki"
visual_keyword: "code review"
description: "阿里巴巴的Open Code Review、Continue和av为GitHub带来AI驱动的代码检查"
sources_count: 5
locale: "zh-CN"
canonical_slug: "2026-06-05-ai-powered-code-review-tools-gain-traction-32ddda"
audio_path: "/audio/2026-06-05-ai-powered-code-review-tools-gain-traction-32ddda.mp3"
audio_bytes: 612982
audio_mime: "audio/mpeg"
---

## 阿里巴巴的Open Code Review初露锋芒

阿里巴巴发布了Open Code Review，一款自动运行在拉取请求上的AI驱动命令行工具。该工具为GitHub添加了状态检查，标记问题，并可以建议差异。该存储库在Hacker News上显示了179个赞同和49条评论。考虑到对高效代码审查过程的需求日益增长，这一发展并不令人意外。

## Continue自动化代码检查

Continue允许开发人员在 `.continue/checks/` 文件夹中编写基于markdown的代理。每个markdown文件描述一个检查；绿色徽章表示代码通过，红色徽章返回建议的补丁。Continue与GitHub状态检查集成。这种方法允许开发人员创建针对其特定需求的自定义检查。

## av简化堆叠式拉取请求

av提供了一个命令行工具，用于管理GitHub上的堆叠式拉取请求。它创建依赖的拉取请求，跟踪其基础提交，并自动重新设置下游分支。加入av Discord社区：https://discord.gg/TFgtZtN8。在 https://rethinkingcode.reviews/with/stacked-prs 上阅读更多内容。该工具在寻求优化工作流的开发人员中获得了人气。

## 为什么这些工具很重要

这三个项目都针对代码质量检查在CI管道的边缘。基于AI的检查可以适应项目特定的模式，并建议具体的修复。早期采用者报告称，在琐碎问题上的评论减少了。通过集成AI驱动的代码审查，开发人员可以专注于更复杂的问题。

## 行业背景

AI辅助审查和堆叠式拉取请求自动化的融合预示着未来CI系统将做的不只是编译和测试。到2025年，全球代码审查工具市场预计将达到14亿美元，年复合增长率为14.5%（2020-2025）。GitLab、GitHub和Bitbucket等公司已经在代码审查能力上投入大量资金。像Ladybird（一个基于Rust的浏览器）这样的项目正在尝试新的开发工作流。Ladybird的方法在其最近的文章（https://ladybird.org/posts/changing-how-we-develop-ladybird/）中有所描述，展示了创新开发过程的潜力。

## 代码审查工具的历史

代码审查工具的概念已经存在多年，各种项目都试图简化这一过程。谷歌对Flutter和Firebase的更新旨在提高开发人员的工作效率，这表明了高效开发工作流的重要性日益增长。2019年，GitHub收购了Semmle（一款代码分析平台），以增强其代码审查能力。同样，GitLab也集成了自己的代码审查功能，包括自动代码检查和审查分析。

## 技术机制

Continue使用基于markdown的代理，允许进行灵活和可定制的检查。该工具与GitHub状态检查的集成提供了开发人员的无缝体验。Open Code Review的AI驱动方法使工具能够适应项目特定的模式。例如，Open Code Review的模型可以学习识别常见的编码错误，例如空指针异常或SQL注入漏洞。

## 下游影响

随着这些工具的流行，我们可以期待看到开发人员如何处理代码审查的转变。借助AI驱动的检查和自动工作流，开发人员将能够专注于更复杂的问题。云提供商可能需要适应这些开源工具，可能导致新的合作伙伴关系或集成。例如，AWS、Azure和Google Cloud可能将其现有开发平台与这些工具集成，使开发人员更容易采用AI驱动的代码审查。

## 关注点

关注Open Code Review的生产级模型和Continue的集成公告。在GitHub上监控av的采用指标以及云提供商如何响应这些开源工具。代码审查的未来看起来很有前景，AI驱动的工具正在引领潮流。随着行业的不断发展，我们可以期待看到更多创新解决方案的出现，例如自动代码审查机器人和AI驱动的编码助手。

## 未来发展

AI辅助审查和堆叠式拉取请求自动化的交叉点可能会导致代码审查的进一步创新。例如，我们可能会看到更复杂的AI模型的发展，这些模型可以检测复杂的编码错误或漏洞。此外，代码审查工具与其他开发平台（如项目管理软件或持续集成/持续部署（CI/CD）管道）的集成可能会变得更加普遍。