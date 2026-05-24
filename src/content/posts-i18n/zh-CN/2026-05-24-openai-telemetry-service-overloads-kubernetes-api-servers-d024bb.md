---
title: "OpenAI遥测服务导致Kubernetes API服务器过载"
date: 2026-05-24T15:10:45.641Z
tags: ["OpenAI","Kubernetes","Telemetry","Outage"]
hero_image: "/hero/2026-05-24-openai-telemetry-service-overloads-kubernetes-api-servers-d024bb.jpg"
hero_image_credit_name: "Anna Hinckel"
hero_image_credit_url: "https://www.pexels.com/@anna-hinckel-3008225"
visual_keyword: "Kubernetes"
description: "OpenAI的新遥测服务于2024年12月11日导致Kubernetes控制平面宕机，原因是数千个节点发出的API调用过多。"
sources_count: 3
locale: "zh-CN"
canonical_slug: "2026-05-24-openai-telemetry-service-overloads-kubernetes-api-servers-d024bb"
audio_path: "/audio/2026-05-24-openai-telemetry-service-overloads-kubernetes-api-servers-d024bb.mp3"
audio_bytes: 641612
audio_mime: "audio/mpeg"
---

OpenAI于2024年12月11日下午3点12分部署了一个遥测服务。该服务的推出导致大规模集群中的Kubernetes API服务器过载，崩溃了DNS服务发现。

## 遥测部署触发API饱和

新服务收集了详细的控制平面指标。在生产环境中，每个节点执行与集群规模相关的资源密集型列表操作。当数千个节点同时执行这些操作时，API服务器变得不堪重负。

过载表现为API服务器饱和。 API服务器停止正常运行，基于DNS的服务发现机制也随之失效。

## 控制平面崩溃

OpenAI的预部署检查仅测量了每个集群的CPU和内存使用情况，但未评估API服务器负载。遥测服务通过每个节点上的kubelet生成的身份验证和授权请求增加了API服务器的负载。

身份验证请求的激增给API服务器带来了压力，而其他组件仍在运行。容器没有重启，但由于DNS丢失，服务无法再解析彼此的名称。

## 更广泛的行业背景

OpenAI事件凸显了行业内一个常见的挑战：在详细监控和遥测的需求与对系统性能的潜在影响之间取得平衡。随着Kubernetes的采用率不断增长，公司越来越寻求优化其集群以适应大规模部署的方法。OpenAI的经验提醒人们，在部署新服务之前进行彻底的负载测试和评估的重要性。

## 历史上的类似事件

这并不是第一次有公司因遥测或监控服务而经历宕机。过去，其他组织也发生过类似事件，通常是由于测试不足或对系统性能缺乏可见性所致。例如，2022年，一家主要的云提供商因一个故障的监控系统导致多个数据中心发生故障，引发了重大宕机。

## 技术机制

遥测服务的配置导致每个集群中的每个节点执行资源密集型列表操作。这导致向Kubernetes API服务器发出大量API调用，导致饱和和最终的故障。为了避免未来发生类似事件，公司可以考虑实施更高效的数据收集和聚合策略，例如从中央聚合器中提取指标，而不是每个节点发出API调用。

## 缓解策略和经验教训

深入分析提出了三个关键问题：
1. 如何在部署前更好地评估负载？
2. 对于使用生产流量进行金丝雀发布有哪些影响？
3. 如何监控控制平面健康状况？

缓解策略包括从中央聚合器中提取指标，而不是每个节点发出API调用，或者根据集群大小限制请求速率。加强集群范围的API服务器延迟和请求量健康检查也至关重要。