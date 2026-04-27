---
title: "谷歌通过 Chrome 的 Prompt API 扩展 AI 边缘能力"
date: 2026-04-27T10:23:15.024Z
tags: ["Google","AI","Edge Computing"]
hero_image: "/hero/2026-04-27-google-expands-ai-edge-capabilities-with-chrome-s-prompt-api-dc9ad0.jpg"
hero_image_credit_name: "Deepanker Verma"
hero_image_credit_url: "https://www.pexels.com/@deepanker70"
visual_keyword: "Chrome"
description: "谷歌推出 AI 边缘工具，包括 Chrome 的 Prompt API，以降低延迟和数据传输成本。"
sources_count: 4
locale: "zh-CN"
canonical_slug: "2026-04-27-google-expands-ai-edge-capabilities-with-chrome-s-prompt-api-dc9ad0"
audio_path: "/audio/2026-04-27-google-expands-ai-edge-capabilities-with-chrome-s-prompt-api-dc9ad0.mp3"
audio_bytes: 567842
audio_mime: "audio/mpeg"
---

## 简介
谷歌正在部署用于推理的硬件加速器，适用于笔记本电脑、手机和物联网设备，并将其与 Chrome 中的 Prompt API 捆绑提供。该举措是针对亚马逊的 AWS Snowball Edge 和微软的 Azure Stack 的直接回应，它们已经提供现场 AI 能力。谷歌的时机与行业向本地化推理的转变相吻合，这一趋势有望降低延迟和减少数据传输成本。

## Chrome 的 Prompt API 扩展本地 AI
Prompt API 允许网络开发者向本地托管的语言模型发送文本提示。该 API 位于 `chrome.ai` 命名空间下，并镜像服务器端 LLM 端点的请求-响应模式，但完全在浏览器中运行。developer.chrome.com 上的文档显示了一个简单的 JavaScript 调用，返回模型的补全结果，而无需离开客户端。该 API 支持实现 OpenAI 兼容模式的模型。

## 边缘硬件和软件
谷歌的边缘努力包括 TPU-Edge 加速器，为设备上的推理提供硬件加速。《金融时报》报道称，谷歌将这些加速器与一个软件栈结合起来，镜像谷歌云的生成模型。

## 人才渠道和高级工程师杠杆
EvalCode 上的一篇评论文章认为，停止招聘初级人才会给高级工程师对架构决策的不成比例的控制权。作者指出，高级工程师的所有权可能导致难以快速迭代的整体设计，而在边缘部署 AI 模型会放大这一风险。文章引用了一个模式：维持初级人才稳定流动的团队往往会更多地尝试新兴 API。

## 竞争压力和市场影响
亚马逊和微软已经通过 Snowball Edge 设备和 Azure Stack HCI 将边缘 AI 商业化。谷歌的进入重点是将模型集成到 Chrome 浏览器中，有效地将每个启用 Chrome 的设备变成潜在的推理节点。这可能会改变开发者的成本曲线，他们不再需要购买专门的边缘盒来运行 LLM。

## 行业背景
向边缘 AI 的转变是由对更低延迟和减少数据传输成本的需求驱动的。随着设备产生的数据量继续增长，对本地处理的需要变得越来越重要。谷歌的 Prompt API 很好地利用了这一趋势，因为它允许开发者直接在设备上运行 AI 模型，减少了对基于云的处理的需求。

## 边缘 AI 历史
边缘 AI 的概念并非新颖，但最近的硬件和软件进步使其更加可行。亚马逊和微软等公司已在边缘 AI 上投入数年，谷歌进入市场是重大发展。使用 TPU-Edge 加速器和 Prompt API 标志着边缘 AI 的新时代，因为它提供了一个专门为本地推理设计的硬件和软件栈。

## 技术机制
Prompt API 使用沙盒环境防止任意代码执行，这是一个关键安全功能。该 API 还支持实现 OpenAI 兼容模式的模型，这为与语言模型的交互提供了一个标准化的接口。使用 TPU-Edge 加速器显著提高了推理性能，使得在设备上运行复杂的 AI 模型成为可能。

## 下游影响
谷歌边缘 AI 努力的影响深远。随着在设备上运行 AI 模型的成本降低，我们可以预期会出现 AI 增强型应用的激增。这可能会导致新的使用场景和商业模式，公司将寻求利用边缘 AI 提供能力。下个季度将至关重要，以确定谷歌边缘 AI 努力的成功，因为公司将在由亚马逊和微软主导的市场中获得关注。

## 关注点
下个季度将揭示谷歌边缘栈是否获得关注。关键指标包括 Chrome 遥测中报告的 Prompt API 调用量、比较设备性能与 AWS Snowball Edge GPU 的第三方基准测试，以及基于 Chrome 的 AI 产品的任何企业公告。

## 未来发展
随着边缘 AI 市场的不断发展，我们可以预期会看到谷歌及其竞争对手的新发展。公司专注于将模型集成到 Chrome 浏览器中是一个重要步骤，但它需要继续创新以保持领先地位。使用 TPU-Edge 加速器和 Prompt API 是一个坚实的基础，但谷歌需要在此基础上继续发展，以实现长期成功。

## 结论
谷歌通过 Chrome 的 Prompt API 扩展 AI 边缘能力是边缘 AI 市场的重大发展。公司专注于将模型集成到 Chrome 浏览器中，并为本地推理提供硬件和软件栈，是一个强有力的步骤。随着市场的不断发展，我们可以预期会看到谷歌及其竞争对手的新发展，下个季度将至关重要，以确定谷歌边缘 AI 努力的成功。