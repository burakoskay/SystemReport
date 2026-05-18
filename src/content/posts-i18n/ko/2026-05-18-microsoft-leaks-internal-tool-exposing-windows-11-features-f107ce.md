---
title: "마이크로소프트, 내부 도구 유출로 Windows 11 기능 노출"
date: 2026-05-18T18:07:07.084Z
tags: ["windows","security","features"]
hero_image: "/hero/2026-05-18-microsoft-leaks-internal-tool-exposing-windows-11-features-f107ce.jpg"
hero_image_credit_name: "Edward Jenner"
hero_image_credit_url: "https://www.pexels.com/@edward-jenner"
visual_keyword: "Windows 11 taskbar with hidden feature toggle overlay"
description: "유출된 StagingTool과 Recall 취약점으로 인해 파워 유저와 공격자에게 Windows 11 내부 기능에 대한 새로운 접근 권한이 부여되었습니다."
sources_count: 5
locale: "ko"
canonical_slug: "2026-05-18-microsoft-leaks-internal-tool-exposing-windows-11-features-f107ce"
audio_path: "/audio/2026-05-18-microsoft-leaks-internal-tool-exposing-windows-11-features-f107ce.mp3"
audio_bytes: 577037
audio_mime: "audio/mpeg"
---

## 마이크로소프트, 내부 도구 유출로 Windows 11 기능 노출

마이크로소프트의 내부 도구 StagingTool이 유출되어 Windows 파워 유저들에게 숨겨진 Windows 11 기능에 대한 직접적인 접근 권한을 부여했습니다. 이는 회사의 개발 과정 투명성과 보안 취약점을 노출했습니다.

StagingTool은 명령 줄 앱으로, 기능 ID를 토글하여 누구나 Microsoft의 A/B 테스트를 우회하고 인사이더 프리뷰 빌드에서 미출시 기능을 활성화할 수 있습니다. 이는 오래전부터 존재하던 비공식 도구 ViveTool과 유사하지만, Microsoft의 자체 플래그 시스템을 사용합니다.

## Recall 취약점으로 인해 사용자 스크린샷 탈취 가능

마이크로소프트가 Recall 타임라인을 재구축하면서 VBS 엔클레이브, AES-256-GCM 암호화, Windows Hello 인증을 사용했지만, 실제로는 캡처된 스크린샷, OCR 텍스트, 메타데이터가 보호되지 않았습니다.

## 작업 표시줄, 사용자 요구에 따라 옵션 제공

Windows 11 출시 5년 만에 마이크로소프트는 더 작은 작업 표시줄과 더 사용자 지정 가능한 시작 메뉴를 테스트하고 있습니다. 이러한 변경 사항은 기본 작업 표시줄이 부피가 크고 시작 메뉴가 제한된 개인화를 제공한다는 오랜 불만을 해결합니다.

## 주목할 점: 9월 업데이트, 커뮤니티 툴링, 마이크로소프트의 대응

다음 주요 Windows 11 업데이트는 9월에 예정되어 있으며, 기본 RAR 및 7-Zip 처리를 약속합니다. StagingTool이 이미 유출된 상황에서 열성적인 사용자들은 공식 출시 전에 해당 기능을 테스트할 가능성이 높으며, 잠재적으로 버그나 보안 회귀를 발견할 수 있습니다.

## 개방성과 통제 사이의 넓은 긴장

StagingTool의 유출과 Recall 주입의 두 이야기는 마이크로소프트의 개발 철학의 모순을 강조합니다. 한편으로, 회사는 기능 플래그 뒤에 점진적인 변경 사항을 전달하는 "지속적인 혁신" 모델을 채택하고 있습니다.另一方面, 이러한 메커니즘이 노출되면 공격 벡터가 됩니다.