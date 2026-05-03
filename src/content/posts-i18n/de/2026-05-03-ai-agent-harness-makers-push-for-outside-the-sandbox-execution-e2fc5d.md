---
title: "Entwickler von KI-Agenten-Harnesses drängen auf Ausführung außerhalb der Sandbox"
date: 2026-05-03T09:26:43.710Z
tags: ["AI","machine learning","software development"]
hero_image: "/hero/2026-05-03-ai-agent-harness-makers-push-for-outside-the-sandbox-execution-e2fc5d.jpg"
hero_image_credit_name: "Katya Wolf"
hero_image_credit_url: "https://www.pexels.com/@katya-wolf"
visual_keyword: "AI agent harnesses"
description: "Entwickler von KI-Agenten-Harnesses wie OmoiOS und Broccoli argumentieren, dass die Ausführung außerhalb der Sandbox Leistung und Zuverlässigkeit verbessert."
sources_count: 6
locale: "de"
canonical_slug: "2026-05-03-ai-agent-harness-makers-push-for-outside-the-sandbox-execution-e2fc5d"
audio_path: "/audio/2026-05-03-ai-agent-harness-makers-push-for-outside-the-sandbox-execution-e2fc5d.mp3"
audio_bytes: 621759
audio_mime: "audio/mpeg"
---

## Der Fall für die Ausführung außerhalb der Sandbox

Die Entwickler von KI-Agenten-Harnesses wie OmoiOS und Broccoli drängen auf die Ausführung außerhalb der Sandbox. Dieser Ansatz verspricht verbesserte Leistung und Zuverlässigkeit. OmoiOS, ein quelloffener Orchestrierungs-Runtime, wandelt Spezifikationen in PRs um, indem es parallele Agentenschwärme in isolierten Sandboxes verwendet.

Das OmoiOS-System umfasst einen Supervisor-Agenten, der Zusammenführungen durchführt und alles auf dem richtigen Weg hält. Es generiert Spezifikationen, die auf dem bestehenden Code basieren, und erstellt einen Task-DAG mit realen Abhängigkeiten. Das System führt Agentenschwärme über isolierte Sandboxes aus, bis die Arbeit erledigt ist.

## Konkrete Implementierungen

Broccoli, ein weiteres KI-Agenten-Harness, wandelt Linear-Tickets in ausgelieferte PRs um, die von Claude und Codex angetrieben werden und auf Google Cloud laufen. Das System läuft als zwei Cloud Run-Workloads über eine gemeinsame Postgres.

Um Broccoli bereitzustellen, benötigen Benutzer ein Google Cloud-Projekt, eine GitHub-App und bestimmte Geheimnisse von GitHub-, Linear-, OpenAI- und Anthropic-Konten. Die Reihenfolge der Bereitstellung beginnt bei Null, erklärt, woher die Werte kommen, und ruft Schritte auf, die aus Sicherheitsgründen noch manuell durchgeführt werden müssen.

## Vorteile und Kompromisse

Die Ausführung von Agenten außerhalb der Sandbox bietet mehrere Vorteile, darunter bessere Abhängigkeitswahrnehmung, parallele Ausführung und strukturierte Übergabe zwischen Aufgaben. Dieser Ansatz wirft jedoch auch Fragen nach Sicherheit und Kontrolle auf.

Die OmoiOS- und Broccoli-Systeme adressieren diese Bedenken durch isolierte Sandboxes und Supervisor-Agenten. Benutzer müssen jedoch immer noch die Vorteile und Risiken der Ausführung außerhalb der Sandbox abwägen.

## Ein tieferer Blick auf OmoiOS

OmoiOS ist konzipiert, um den Prozess der Umwandlung von Spezifikationen in PRs zu automatisieren. Es verwendet einen Supervisor-Agenten, um den Prozess zu verwalten und sicherzustellen, dass alles auf dem richtigen Weg bleibt. Das System ist konzipiert, um komplexe Aufgaben und Abhängigkeiten zu bewältigen, was es zu einem leistungsstarken Werkzeug für Entwickler macht.

Eine der wichtigsten Funktionen von OmoiOS ist seine Fähigkeit, Spezifikationen zu generieren, die auf dem bestehenden Code basieren. Dies ermöglicht es Entwicklern, auf dem aufzubauen, was sie bereits haben, anstatt von vorne zu beginnen. Das System umfasst auch einen Task-DAG mit realen Abhängigkeiten, der dazu beiträgt, dass Aufgaben in der richtigen Reihenfolge abgeschlossen werden.

## Broccoli-Architektur

Die Architektur von Broccoli ist konzipiert, um die Leistungsfähigkeit von KI-Agenten zu nutzen. Das System verwendet zwei Cloud Run-Workloads über eine gemeinsame Postgres, was es ermöglicht, zu skalieren und große Arbeitslasten zu bewältigen.

Der Bereitstellungsprozess für Broccoli ist konzipiert, um unkompliziert zu sein, mit klaren Anweisungen und einem einfachen Einrichtungsprozess. Benutzer müssen jedoch immer noch auf Sicherheitsbedenken achten und sicherstellen, dass sie die erforderlichen Berechtigungen und Zugänge haben.

## Branchenkontext

Der Drang nach Ausführung außerhalb der Sandbox spiegelt einen breiteren Trend in der KI-Entwicklung wider. Da KI-Agenten leistungsfähiger werden, suchen Entwickler nach Wegen, ihre Nutzung zu skalieren und ihre Zuverlässigkeit zu verbessern.

Die Verwendung von KI-Agenten in der Softwareentwicklung beispielsweise wird immer beliebter. KI-Agenten können Aufgaben automatisieren, wie z.B. Codierung und Testen, und Entwicklern ermöglichen, sich auf höherwertige Arbeiten zu konzentrieren.

Allerdings wirft die Verwendung von KI-Agenten auch Fragen nach der Arbeitsplatzverlagerung und der Notwendigkeit neuer Fähigkeiten auf. Da KI-Agenten häufiger werden, müssen Entwickler sich an neue Arbeitsweisen anpassen.

## Geschichte von KI-Agenten-Harnesses

Das Konzept von KI-Agenten-Harnesses gibt es seit mehreren Jahren. Frühe Implementierungen waren oft durch ihre Fähigkeit zur Skalierung und zur Bewältigung komplexer Aufgaben begrenzt. Jüngste Fortschritte in KI und maschinellem Lernen haben es jedoch ermöglicht, leistungsfähigere und komplexere Harnesses zu bauen.

OmoiOS und Broccoli sind nur zwei Beispiele für die vielen KI-Agenten-Harnesses, die derzeit verfügbar sind. Jedes hat seine eigenen Stärken und Schwächen, und Entwickler müssen ihre Optionen sorgfältig abwägen, bevor sie ein Harness wählen.

## Technische Mechanismen

Die technischen Mechanismen von KI-Agenten-Harnesses sind komplex und vielschichtig. Auf hoher Ebene verwenden Harnesses KI-Agenten, um Aufgaben und Workflows zu automatisieren. Die Einzelheiten, wie dies funktioniert, können jedoch je nach Implementierung stark variieren.

Im Falle von OmoiOS verwendet das System eine Kombination aus parallelen Agentenschwärmen und isolierten Sandboxes, um Arbeit zu erledigen. Dieser Ansatz ermöglicht eine größere Skalierbarkeit und Flexibilität, während er sicherstellt, dass Aufgaben sicher und zuverlässig abgeschlossen werden.

## Auswirkungen

Die Entwicklung von KI-Agenten-Harnesses hat signifikante Auswirkungen. Da diese Systeme häufiger werden, dürften sie einen großen Einfluss auf die Art und Weise haben, wie Software entwickelt und bereitgestellt wird.

Eine der wichtigsten Auswirkungen ist das Potenzial für erhöhte Produktivität. Durch die Automatisierung von Aufgaben und Workflows können Entwickler sich auf höherwertige Arbeiten konzentrieren und Software schneller liefern.

Allerdings gibt es auch potenzielle Risiken und Herausforderungen, die mit KI-Agenten-Harnesses verbunden sind. Zum Beispiel besteht das Risiko, dass diese Systeme menschliche Arbeiter verdrängen oder bestehende Vorurteile verschlimmern.

## Was zu beobachten ist

Die Entwicklung von KI-Agenten-Harnesses und ihre Bereitstellung außerhalb der Sandbox ist ein zu beobachtendes Gebiet. Wichtige Entscheidungen, wie die Einführung von OmoiOS und Broccoli, und regulatorische Maßnahmen, wie Richtlinien für die KI-Agenten-Entwicklung, werden die Zukunft der KI-Agenten-Nutzung prägen.

Der nächste Datenpunkt, den es zu beobachten gilt, ist, wie diese Systeme in realen Bereitstellungen abschneiden. Werden sie ihre Versprechen von verbesserter Leistung und Zuverlässigkeit einhalten? Nur die Zeit wird es zeigen.

Da KI-Agenten häufiger werden, ist es wichtig, ihre Entwicklung und Bereitstellung zu verfolgen. Die Entscheidungen, die jetzt getroffen werden, werden die Zukunft der KI-Agenten-Nutzung und ihre Auswirkungen auf Branchen und Gesellschaft als Ganzes prägen.

## Zukünftige Entwicklungen

Die Zukunft von KI-Agenten-Harnesses wird wahrscheinlich von einer Reihe von Faktoren geprägt sein, darunter Fortschritte in KI und maschinellem Lernen, Änderungen in regulatorischen Anforderungen und Verschiebungen in der Marktnachfrage.

Ein Ding ist sicher: KI-Agenten-Harnesses sind hier, um zu bleiben. Da diese Systeme häufiger werden, ist es wichtig, ihre potenziellen Vorteile und Risiken zu verstehen und ihre Entwicklung und Bereitstellung über die Zeit zu verfolgen.