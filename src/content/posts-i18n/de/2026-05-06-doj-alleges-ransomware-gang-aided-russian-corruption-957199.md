---
title: "DOJ behauptet, dass Ransomware-Gang russische Korruption unterstützte"
date: 2026-05-06T21:25:08.167Z
tags: ["cybersecurity","ransomware","api-breach","supply-chain-attack","braintrust"]
hero_image: "/hero/2026-05-06-doj-alleges-ransomware-gang-aided-russian-corruption-957199.jpg"
hero_image_credit_name: "Christina Morillo"
hero_image_credit_url: "https://www.pexels.com/@divinetechygirl"
visual_keyword: "cybersecurity breach investigation in a dimly lit server room"
description: "US-Staatsanwälte klagen Ransomware-Gruppe an, russische Regierungskorruption unterstützt zu haben"
sources_count: 3
locale: "de"
canonical_slug: "2026-05-06-doj-alleges-ransomware-gang-aided-russian-corruption-957199"
---

## DOJ legt Anklage gegen Ransomware-Gruppe vor, die mit russischem Staat in Verbindung steht
US-Staatsanwälte haben eine Ransomware-Gruppe wegen Unterstützung russischer Regierungskorruption durch Hackerangriffe angeklagt, die illegale Gelder an staatliche Akteure weitergeleitet haben. Die Anklage, die diese Woche öffentlich gemacht wurde, behauptet, dass die Gruppe Steuern vermieden und den Militärdienst entging, während sie von Angriffen profitierte, die Schwachstellen in der russischen Staatsinfrastruktur ausnutzten. Der Fall markiert eine Veränderung in der Art und Weise, wie westliche Regierungen Cyberkriminalitätsnetzwerke mit nationalen Sicherheitsbedrohungen in Verbindung bringen.

Die Gruppe, die unter einem Alias operiert, der in der Anklage nicht genannt wird, wird beschuldigt, ein "sophistisches Geldwäschesystem" betrieben zu haben, das Ransomware-Erlöse durch Scheinfirmen in Dubai und auf den Britischen Jungferninseln geleitet hat. Staatsanwälte bemerken die Verwendung von Zero-Day-Exploits, die zuvor russischen staatlichen Einheiten zugeordnet wurden, was einen rechtlichen Graubereich schafft, der die Auslieferungsbemühungen erschwert.

## Braintrust ordnet API-Schlüssel-Rotation nach Cloud-Breach an
Einige Stunden vor der Ankündigung der DOJ legte der AI-Infrastruktur-Startup Braintrust einen Breach in seiner Amazon-Web-Services-Umgebung offen. In einem Kundenbericht empfahl das Unternehmen allen Nutzern, ihre API-Schlüssel sofort zu rotieren, nachdem Angreifer auf ein internes System zugegriffen hatten, das Kundendaten verarbeitete. Der Angriff deckte Metadaten über AI-Modell-Trainingspipelines auf, aber nicht den direkten Zugriff auf proprietäre Modelle oder Datenbanken.

Braintrusts Sicherheitsteam verfolgte den Einbruch zu einem falsch konfigurierten S3-Bucket zurück, der 17 Tage lang offen blieb. Das Unternehmen hat seitdem das Sicherheitsloch gepatcht und eine vollständige forensische Analyse eingeleitet. Startups, die Braintrusts "AI-Engineering-OS" verwenden, stehen nun vor einem dringenden operativen Overhead, um Anmeldeinformationen in Produktionsworkflows neu zu generieren.

## Monatlanges Supply-Chain-Attacken infizieren Daemon Tools
Parallel zu diesen Ereignissen bestätigten Sicherheitsforscher eine Supply-Chain-Attacke gegen Daemon Tools, eine Disk-Imaging-Anwendung, die von über 15 Millionen Entwicklern verwendet wird. Schadsoftware war in einem Software-Update zwischen dem 15. März und dem 15. April 2024 enthalten, laut Analyse von Kaspersky. Der kompromittierte Installer schuf eine persistente Verbindung in den Opfersystemen durch ein benutzerdefiniertes Rootkit, das den Windows-Defender umging.

Der Angriff umging Standard-Code-Signierungsprotokolle, indem er eine Drittanbieter-Abhängigkeit in der Build-Pipeline kompromittierte. Forscher fanden Beweise, die die Malware mit der gleichen Infrastruktur in Verbindung brachten, die bei der SolarWinds-Breach verwendet wurde, obwohl keine direkte Verbindung zum DOJ-Fall hergestellt wurde. Benutzer werden aufgefordert, vollständige Systemscans mit aktualisierten YARA-Regeln durchzuführen.

## Die erweiterte Oberfläche des Cyber-Risikos
Diese drei Vorfälle zeigen eine tiefere Komplexität moderner Cyber-Bedrohungen. Der DOJ-Fall zeigt, wie kriminelle Gruppen zu de facto-Erweiterungen staatlicher Interessen werden können, indem sie geopolitische Blindstellen ausnutzen. Währenddessen heben die Braintrust- und Daemon-Tools-Breaches hervor, wie Supply-Chain-Schwachstellen nicht mehr auf traditionelle Unternehmenssoftware beschränkt sind, sondern nun auch AI-Infrastruktur und Entwickler-Tools betreffen.

Das Department of Homeland Security hat eine neue Beratung herausgegeben, in der Organisationen aufgefordert werden, Drittanbieter-Abhängigkeiten in AI-Workflows zu überprüfen. Die Richtlinie betont speziell die Risiken unpatchter Abhängigkeiten in Modell-Trainingsumgebungen, in denen sogar Metadaten-Exposition adversarial Training-Angriffe ermöglichen kann. Wenn diese Fälle konvergieren, steht die technische Gemeinschaft vor einer Auseinandersetzung mit veralteten Sicherheitsmodellen, die moderne Angriffsvektoren nicht angehen können.

## Was zu beobachten ist
Die DOJ wird wahrscheinlich innerhalb von 45 Tagen eine Auslieferungsanhörung in Moskau beantragen, ein Schritt, der Russland zwingen könnte, auf US-Zyberkriminalitätsvorwürfe unter dem Budapester Übereinkommen zu reagieren. Braintrusts Kunden sollten mit einem formalen Sicherheitsbericht bis zum 1. Mai rechnen, der forensische Ergebnisse und Entschädigungspläne enthält. Für Daemon-Tools-Benutzer ist der kritische nächste Schritt, alle Systeme mit dem neuesten Build (5.5.2+) zu aktualisieren, das heute veröffentlicht wurde und Signaturüberprüfung für alle zukünftigen Updates enthält.