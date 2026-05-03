---
title: "Los creadores de arneses de agentes de IA impulsan la ejecución fuera de la sandbox"
date: 2026-05-03T09:26:43.710Z
tags: ["AI","machine learning","software development"]
hero_image: "/hero/2026-05-03-ai-agent-harness-makers-push-for-outside-the-sandbox-execution-e2fc5d.jpg"
hero_image_credit_name: "Katya Wolf"
hero_image_credit_url: "https://www.pexels.com/@katya-wolf"
visual_keyword: "AI agent harnesses"
description: "Los desarrolladores de arneses de agentes de IA, como OmoiOS y Broccoli, argumentan que ejecutar agentes fuera de la sandbox mejora el rendimiento y la fiabilid"
sources_count: 6
locale: "es"
canonical_slug: "2026-05-03-ai-agent-harness-makers-push-for-outside-the-sandbox-execution-e2fc5d"
audio_path: "/audio/2026-05-03-ai-agent-harness-makers-push-for-outside-the-sandbox-execution-e2fc5d.mp3"
audio_bytes: 621759
audio_mime: "audio/mpeg"
---

## El caso de la ejecución fuera de la sandbox

Los creadores de arneses de agentes de IA, como OmoiOS y Broccoli, están impulsando la ejecución fuera de la sandbox. Este enfoque promete mejorar el rendimiento y la fiabilidad. OmoiOS, un runtime de orquestación de código abierto, convierte especificaciones en solicitudes de extracción (PR) utilizando enjambres de agentes paralelos en sandbox aisladas.

El sistema OmoiOS incluye un agente supervisor que maneja fusiones y mantiene todo bajo control. Genera especificaciones basadas en el código base existente, construyendo un DAG de tareas con dependencias reales. El sistema ejecuta enjambres de agentes en sandbox aisladas hasta que el trabajo esté hecho.

## Implementaciones concretas

Broccoli, otro arnés de agentes de IA, convierte tickets de Linear en PR enviados utilizando Claude y Codex, ejecutándose en Google Cloud. El sistema se ejecuta como dos cargas de trabajo de Cloud Run sobre un Postgres compartido.

Para implementar Broccoli, los usuarios necesitan un proyecto de Google Cloud, una aplicación de GitHub y secretos específicos de cuentas de GitHub, Linear, OpenAI y Anthropic. La secuencia de implementación comienza desde cero, explica de dónde provienen los valores y llama la atención sobre los pasos que aún deben realizarse manualmente por razones de seguridad.

## Beneficios y compensaciones

Ejecutar agentes fuera de la sandbox proporciona varios beneficios, incluyendo una mejor conciencia de las dependencias, ejecución paralela y transferencia estructurada entre tareas. Sin embargo, este enfoque también plantea preguntas sobre la seguridad y el control.

Los sistemas OmoiOS y Broccoli abordan estas preocupaciones a través de sandbox aisladas y agentes supervisores. Sin embargo, los usuarios aún deben sopesar los beneficios y riesgos de la ejecución fuera de la sandbox.

## Una mirada más profunda a OmoiOS

OmoiOS está diseñado para automatizar el proceso de convertir especificaciones en PR. Utiliza un agente supervisor para gestionar el proceso y asegurarse de que todo se mantenga bajo control. El sistema está construido para manejar tareas complejas y dependencias, lo que lo convierte en una herramienta poderosa para desarrolladores.

Una de las características clave de OmoiOS es su capacidad para generar especificaciones basadas en el código base existente. Esto permite a los desarrolladores construir sobre lo que ya tienen, en lugar de empezar desde cero. El sistema también incluye un DAG de tareas con dependencias reales, lo que ayuda a asegurarse de que las tareas se completen en el orden correcto.

## Arquitectura de Broccoli

La arquitectura de Broccoli está diseñada para aprovechar el poder de los agentes de IA. El sistema utiliza dos cargas de trabajo de Cloud Run sobre un Postgres compartido, lo que le permite escalar y manejar cargas de trabajo grandes.

El proceso de implementación de Broccoli está diseñado para ser sencillo, con instrucciones claras y un proceso de configuración simple. Sin embargo, los usuarios aún deben estar atentos a las preocupaciones de seguridad y asegurarse de que tengan los permisos y accesos necesarios.

## Contexto de la industria

El impulso por la ejecución fuera de la sandbox refleja una tendencia más amplia en el desarrollo de IA. A medida que los agentes de IA se vuelven más poderosos, los desarrolladores buscan formas de escalar su uso y mejorar su fiabilidad.

El uso de agentes de IA en el desarrollo de software, por ejemplo, se está volviendo cada vez más popular. Los agentes de IA pueden automatizar tareas, como la codificación y las pruebas, lo que libera a los desarrolladores para centrarse en trabajos de nivel superior.

Sin embargo, el uso de agentes de IA también plantea preguntas sobre el desplazamiento de empleos y la necesidad de nuevas habilidades. A medida que los agentes de IA se vuelvan más prevalentes, los desarrolladores deberán adaptarse a nuevas formas de trabajar.

## Historia de los arneses de agentes de IA

El concepto de arneses de agentes de IA lleva varios años en existencia. Las implementaciones tempranas a menudo estaban limitadas por su capacidad para escalar y manejar tareas complejas. Sin embargo, los avances recientes en IA y aprendizaje automático han hecho posible construir arneses más poderosos y sofisticados.

OmoiOS y Broccoli son solo dos ejemplos de los muchos arneses de agentes de IA que están disponibles actualmente. Cada uno tiene sus propias fortalezas y debilidades, y los desarrolladores deberán evaluar cuidadosamente sus opciones antes de elegir un arnés.

## Mecánica técnica

La mecánica técnica de los arneses de agentes de IA es compleja y multifacética. A un nivel alto, los arneses utilizan agentes de IA para automatizar tareas y flujos de trabajo. Sin embargo, los detalles de cómo funciona esto pueden variar ampliamente dependiendo de la implementación.

En el caso de OmoiOS, el sistema utiliza una combinación de enjambres de agentes paralelos y sandbox aisladas para realizar el trabajo. Este enfoque permite una mayor escalabilidad y flexibilidad, mientras se asegura de que las tareas se completen de manera segura y fiable.

## Implicaciones posteriores

El desarrollo de arneses de agentes de IA tiene implicaciones posteriores significativas. A medida que estos sistemas se vuelvan más prevalentes, es probable que tengan un impacto importante en la forma en que se desarrolla y despliega el software.

Una de las implicaciones clave es el potencial para una mayor productividad. Al automatizar tareas y flujos de trabajo, los desarrolladores pueden centrarse en trabajos de nivel superior y entregar software más rápidamente.

Sin embargo, también existen riesgos y desafíos potenciales asociados con los arneses de agentes de IA. Por ejemplo, existe el riesgo de que estos sistemas puedan desplazar a los trabajadores humanos o exacerbar los sesgos existentes.

## Qué observar

El desarrollo de arneses de agentes de IA y su implementación fuera de la sandbox es un área que hay que observar. Las decisiones clave, como la adopción de OmoiOS y Broccoli, y las acciones regulatorias, como las directrices para el desarrollo de agentes de IA, darán forma al futuro del uso de agentes de IA.

El próximo dato a observar es cómo estos sistemas se desempeñan en implementaciones del mundo real. ¿Cumplirán con sus promesas de mejorar el rendimiento y la fiabilidad? Solo el tiempo lo dirá.

A medida que los agentes de IA se vuelvan más prevalentes, es esencial rastrear su desarrollo y despliegue. Las decisiones que se tomen ahora darán forma al futuro del uso de agentes de IA y su impacto en las industrias y la sociedad en su conjunto.

## Desarrollos futuros

El futuro de los arneses de agentes de IA probablemente estará determinado por una serie de factores, incluyendo avances en IA y aprendizaje automático, cambios en los requisitos regulatorios y cambios en la demanda del mercado.

Una cosa es segura: los arneses de agentes de IA están aquí para quedarse. A medida que estos sistemas se vuelvan más prevalentes, es esencial entender sus beneficios y riesgos potenciales, y rastrear su desarrollo y despliegue a lo largo del tiempo.