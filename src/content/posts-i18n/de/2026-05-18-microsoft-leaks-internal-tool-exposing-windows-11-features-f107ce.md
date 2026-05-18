---
title: "Microsoft veröffentlicht versehentlich internes Tool und offenbart Windows-11-Features"
date: 2026-05-18T18:07:07.084Z
tags: ["windows","security","features"]
hero_image: "/hero/2026-05-18-microsoft-leaks-internal-tool-exposing-windows-11-features-f107ce.jpg"
hero_image_credit_name: "Edward Jenner"
hero_image_credit_url: "https://www.pexels.com/@edward-jenner"
visual_keyword: "Windows 11 taskbar with hidden feature toggle overlay"
description: "Das geleakte StagingTool und eine Recall-Schwachstelle geben Power-Usern und Angreifern neuen Zugriff auf Windows-11-Innenleben, während das Betriebssystem endl"
sources_count: 5
locale: "de"
canonical_slug: "2026-05-18-microsoft-leaks-internal-tool-exposing-windows-11-features-f107ce"
audio_path: "/audio/2026-05-18-microsoft-leaks-internal-tool-exposing-windows-11-features-f107ce.mp3"
audio_bytes: 577037
audio_mime: "audio/mpeg"
---

Microsofts versehentliche Veröffentlichung seines internen StagingTools hat Windows-Power-Usmern einen direkten Schlüssel zu versteckten Windows-11-Features gegeben und sowohl die Entwicklungsopazität des Unternehmens als auch eine breitere Sicherheitslücke offengelegt.

Das Tool erschien in einer "Bug-Bash"-Quest auf dem Feedback-Hub am Mittwoch, nur um Stunden später zurückgezogen zu werden, nachdem Community-Mitglieder es geteilt hatten. StagingTool ist eine Kommandozeilen-App, die Feature-IDs umschaltet und es jedem ermöglicht, Microsofts A/B-Tests zu umgehen und nicht veröffentlichte Funktionalitäten in Insider-Vorschau-Builds zu aktivieren. Der Leak spiegelt das langjährige Drittanbieter-Tool ViveTool wider, verwendet jedoch Microsofts eigenes Flag-System. Der Zeitpunkt ist bemerkenswert: Microsoft hat auf ein bevorstehendes September-Update hingewiesen, das native Unterstützung für RAR- und 7-Zip-Dateien bringt, und die Community hat jetzt eine Abkürzung, um diese und andere nicht genannte "Moments" zu testen, bevor sie offiziell angekündigt werden.

## Eine Recall-Schwachstelle, die es jedem Benutzer ermöglicht, Screenshots abzusaugen

Wenn Microsoft die Recall-Zeitachse mit VBS-Enklaven, AES-256-GCM-Verschlüsselung und Windows-Hello-Authentifizierung neu aufbaute, war die Absicht klar: Aufgenommene Screenshots, OCR-Text und Metadaten in einem sicheren Bereich zu halten. In der Praxis läuft der Frontend-Prozess des sicheren Bereichs, AIXHost.exe, ohne Protected Process Light, AppContainer oder Code-Integritätsüberwachung. Diese Auslassung bedeutet, dass jeder Standard-Benutzerprozess Code in AIXHost.exe injizieren und dieselben COM-APIs, die die legitime Benutzeroberfläche verwendet, kapern kann.

TotalRecall Reloaded nutzt diese Lücke mit einer Zwei-Dateien-Payload: einem Injektor (totalrecall.exe) und einer DLL. Der Injektor macht einen Schnappschuss der Prozessliste, ordnet Speicher in AIXHost.exe zu, schreibt den DLL-Pfad und generiert einen Remote-Thread, der LoadLibraryW aufruft - klassische DLL-Injektion, kein Kernel-Exploit, keine Administratorkrechte. Da die standardmäßige Windows-DACL denselben Benutzern volle Zugriffsrechte gewährt, funktioniert der Angriff auf einer mittleren obligatorischen Ebene mit BUILTIN\Administrators, die auf "nur verweigern" gesetzt sind. Die Payload initialisiert dann eine COM-Wohnung, umhüllt ihre Identität und geht denselben Entschlüsselungsweg, den die legitime Benutzeroberfläche verfolgt, und zieht entschlüsselte Screenshots und OCR-Daten als lebende COM-Objekte.

## Taskbar erhält endlich die Optionen, die Benutzer gefordert haben

Fünf Jahre nach dem Start von Windows 11 testet Microsoft eine kleinere Taskbar und ein anpassbareres Startmenü. Die Änderungen gehen auf eine langjährige Beschwerde ein, dass die standardmäßige Taskbar zu umfangreich ist und das Startmenü begrenzte Personalisierungsmöglichkeiten bietet. Frühzeitige Builds zeigen eine kondensierte Symbolleiste und die Möglichkeit, Elemente mit feinerer Granularität zu fixieren oder zu lösen, wodurch die Benutzeroberfläche näher an die Flexibilität kommt, die Benutzer in Windows 10 genossen.

## Was zu beobachten ist: September-Update, Community-Tooling und Microsofts Antwort

Das nächste große Windows-11-Update, das für September geplant ist, verspricht native RAR- und 7-Zip-Unterstützung - Funktionen, die traditionell Drittanbieter-Installer erforderten. Da StagingTool bereits verfügbar ist, werden Enthusiasten diese Funktionalität wahrscheinlich Wochen vor dem offiziellen Rollout testen, möglicherweise Fehler oder Sicherheitsregressionen aufdecken, bevor sie offiziell bekannt gegeben werden. Die Überwachung der GitHub-Repositorys der Community auf neue Feature-ID-Einreichungen gibt einen Vorgeschmack darauf, was Microsoft plant, auszuliefern.

Microsofts offizielle Haltung, wie in einem früheren Insider-Programm-Blogbeitrag erwähnt, erkennt an, dass "technische Insider" deaktivierte Flags entdecken und sie manuell aktivieren. Der Leak von StagingTool macht diesen Prozess einfacher und setzt das Unternehmen unter Druck, seine internen Vertriebskanäle zu straffen. Zukünftige Bug-Bash-Events könnten eine strengere Überprüfung interner Links sehen, und wir könnten sehen, dass Microsoft mit seinem eigenen sanktionierten Feature-Umschalt-Dienstprogramm oder strengeren A/B-Test-Sicherheitsvorkehrungen zurückdrängt. Für Unternehmen unterstreicht die Kombination aus einem Recall-Extraktionsweg und einem öffentlich geteilten Feature-Umschalt-Tool die Notwendigkeit einer rigorosen Endpunktüberwachung und Richtlinienüberwachung, während Windows 11 weiterentwickelt wird.