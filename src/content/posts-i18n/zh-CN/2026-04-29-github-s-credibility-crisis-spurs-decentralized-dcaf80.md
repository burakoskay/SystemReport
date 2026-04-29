---
title: "GitHub 信任危机催生分散化"
date: 2026-04-29T14:28:41.142Z
tags: ["github","open-source","decentralization","ai"]
hero_image: "/hero/2026-04-29-github-s-credibility-crisis-spurs-decentralized-dcaf80.jpg"
hero_image_credit_name: "Antoni Shkraba Studio"
hero_image_credit_url: "https://www.pexels.com/@shkrabaanthony"
visual_keyword: "developer working at a laptop with code overlays and decentralized network icons"
description: "HashiCorp联合创始人批评GitHub,而Radicle、荷兰政府和AI工具正在改变开发者合作的方式。"
sources_count: 8
locale: "zh-CN"
canonical_slug: "2026-04-29-github-s-credibility-crisis-spurs-decentralized-dcaf80"
---

## GitHub 身份漂移

GitHub多年来一直是开源和企业代码的默认聚集地，但最近的产品决策使得平台倾斜向市场营销。平台引入的赞助仓库、付费广告插槽和算法推荐小工具使得许多工程团队成为了被动内容消费者。Hashimoto的批评瞄准了这一转变：开发者现在花费更多时间在curating likes上而不是修复bug。

### 分散化合作获得动力

Radicle, 一个基于对等协议的分散式Git替代品,在2026年4月26日获得了一个重要的认可,当时HardenedBSD宣布了其正式集成。HardenedBSD, 一个专注于安全的FreeBSD分支,现在将其源代码树托管在Radicle上,允许贡献者直接同步而不需要中央服务器。这个举动规避了GitHub的依赖于单一企业基础设施并消除了第三方身份验证的需求。

前期采用者称赞了Radicle的密码签名模型,该模型保证了每个提交都可以被验证为合法的作者的公钥。这一模型与HardenedBSD的安全目标相符,后者通常提供了硬化的内核和强制访问控制。通过将代码托管在分散式主机上,该项目也减少了跨多个大洲的贡献者的延迟,这是一个实际的优势超过了新颖性。

### 政府支持开源代码平台

在平行的发展中,荷兰数字政府宣布了一个软启动一个开源代码平台,旨在支持公共部门开发者。这项倡议,详细描述在荷兰数字政府网站,提供了一个自己托管的环境,允许机构分享、审阅和审计代码而不依赖商业SaaS供应商。该平台的早期采用者包括国家税务局和市政服务部门。

政府的决定源于保持对公民数据和合规资产的控制的愿望。通过保持代码库在内,机构可以强制执行更严格的安全政策并避免供应商锁定。软启动也作为一个测试环境来集成CI/CD管道以尊重荷兰隐私规定,这是许多私有Git托管服务难以保证的特性。

### AI工具重新定义代码审查和内容创建

当开发者忙于在哪里托管他们的仓库时,AI模型正在重新定义他们编写和审查代码的方式。Anthropic的Claude,最近被配置为创造性的工作,现在提供了一个"代码助手"模式,可以生成代码片段、建议重构并甚至编写文档。该模型的输出基于一个大型的公共代码库,但它不宣称能够捕捉到每个Rust-特定的bug,如最近的博客文章Corrode.dev所提醒的读者。

同一篇文章还提到Rust的借用检查器仍然允许某些逻辑错误逃避,尤其是涉及不安全块或外部C库的错误。Claude可以表面出类似已知错误的模式,但它不能替代正式验证工具。与此同时,OpenAI的ChatGPT悄然地开始在其界面内提供广告,如Buchodi调查中所述。广告循环将用户的询问与赞助内容关联,这引发了对代码相关答案的纯度的担忧。

## 下一步

下个季度将揭示Radicle的对等模型是否可以超越小型项目,如HardenedBSD。请关注Radicle与任何主要云提供商之间的正式合作宣布,这可能表明更广泛的企业采用。在公共部门,荷兰平台的使用指标将在6月份公布;如果有大幅增加,将验证政府优先方案并可能激发其他欧盟国家的类似推动。