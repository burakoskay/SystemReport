---
title: "微软内部工具泄露，曝光 Windows 11 新功能"
date: 2026-05-18T18:07:07.084Z
tags: ["windows","security","features"]
hero_image: "/hero/2026-05-18-microsoft-leaks-internal-tool-exposing-windows-11-features-f107ce.jpg"
hero_image_credit_name: "Edward Jenner"
hero_image_credit_url: "https://www.pexels.com/@edward-jenner"
visual_keyword: "Windows 11 taskbar with hidden feature toggle overlay"
description: "泄露的 StagingTool 和 Recall 漏洞为高级用户和攻击者提供了新的访问 Windows 11 内部功能的方式，同时操作系统终于恢复了长期缺失的任务栏选项。"
sources_count: 5
locale: "zh-CN"
canonical_slug: "2026-05-18-microsoft-leaks-internal-tool-exposing-windows-11-features-f107ce"
audio_path: "/audio/2026-05-18-microsoft-leaks-internal-tool-exposing-windows-11-features-f107ce.mp3"
audio_bytes: 577037
audio_mime: "audio/mpeg"
---

## 微软意外发布内部工具 StagingTool，曝光 Windows 11 新功能

微软意外发布内部工具 StagingTool，让 Windows 高级用户可以直接访问隐藏的 Windows 11 功能，暴露了公司的开发过程不透明性和更广泛的安全漏洞。

该工具在反馈中心（Feedback Hub）的“bug bash”任务中出现，几小时后被删除，因为社区成员开始分享它。StagingTool 是一个命令行应用程序，可以切换功能 ID，让任何人都可以绕过微软的 A/B 测试，并启用 Insider 预览版中未发布的 功能。该泄露事件与长期的第三方工具 ViveTool 类似，但它使用微软自己的标志系统。时机值得注意：微软已经暗示将在 9 月份的更新中添加对 RAR 和 7-Zip 文件的原生支持，社区现在有了一个快捷方式来测试这些和未命名的“瞬间”（Moments）。

## Recall 漏洞允许任何用户窃取截图

当微软使用 VBS 安全区、AES-256-GCM 加密和 Windows Hello 身份验证重建 Recall 时间线时，其意图很明确：保持捕获的截图、OCR 文本和元数据在保险库中安全。在实践中，保险库的前端进程 AIXHost.exe 在没有 Protected Process Light、AppContainer 或代码完整性强制的情况下运行。这种省略意味着任何标准用户进程都可以将代码注入 AIXHost.exe 并劫持合法 UI 使用的相同 COM API。

TotalRecall Reloaded 利用这个漏洞，使用两个文件的有效载荷：一个注入器（totalrecall.exe）和一个 DLL。注入器快照进程列表，在 AIXHost.exe 中分配内存，写入 DLL 路径，并生成一个远程线程，调用 LoadLibraryW - 经典的 DLL 注入，无需内核利用，无需管理员权限。由于默认的 Windows DACL 授予相同用户进程完全访问权限，因此攻击在中级强制级别下有效，并将 BUILTIN\Administrators 设置为仅拒绝。

## 任务栏终于获得用户要求的功能

在 Windows 11 发布五年后，微软正在测试一个较小的任务栏和一个更可定制的开始菜单。这些更改解决了长期存在的投诉，即默认任务栏感觉笨重，而开始菜单提供有限的个性化。早期构建显示了一个精简的图标行，以及以更精细的粒度固定或取消固定项目，使 UI 更接近 Windows 10 中用户享受的灵活性。

## 下一步：9 月更新、社区工具和微软的回应

下一次主要的 Windows 11 更新预计在 9 月份，承诺原生支持 RAR 和 7-Zip 文件 - 这些功能传统上需要第三方安装程序。随着 StagingTool 已经泄露，爱好者很可能会在官方推出之前测试该功能，可能会在官方推出之前发现错误或安全回归。监控社区的 GitHub 存储库中新功能 ID 的提交将为微软计划发布的内容提供预览。

微软的官方立场，如之前的 Insider Program 博客文章中所述，承认“技术 Insider”发现禁用的标志并手动启用它们。StagingTool 的泄露使该过程更加简单，并迫使公司加强其内部分发渠道。未来的 bug bash 活动可能会看到内部链接的更严格的审查，我们可能会看到微软推出自己的功能切换实用程序或更严格的 A/B 测试防护措施。对于企业来说，Recall 提取路径和公开的功能切换工具的组合强调了在 Windows 11 继续演变时，需要严格的端点监控和策略强制执行。