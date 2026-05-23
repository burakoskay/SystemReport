---
title: "La violación de la licencia AGPL de BambuStudio desata un debate legal y de FOSS"
date: 2026-05-23T13:56:41.536Z
tags: ["foss","agpl","software licensing","gpl","open source"]
hero_image: "/hero/2026-05-23-bambustudio-agpl-violation-sparks-legal-and-foss-debate-09556d.jpg"
hero_image_credit_name: "Markus Winkler"
hero_image_credit_url: "https://www.pexels.com/@markus-winkler-1430818"
visual_keyword: "AGPL license agreement document next to a computer monitor showing code diffs"
description: "Una demanda en Texas cuestiona la licencia de código abierto"
sources_count: 3
locale: "es"
canonical_slug: "2026-05-23-bambustudio-agpl-violation-sparks-legal-and-foss-debate-09556d"
---

## La ley de código abierto entra en el mundo real

La versión modificada de PrusaSlicer por BambuStudio ha desencadenado una tormenta legal sobre el cumplimiento de la licencia AGPL. La violación no es solo una cuestión técnica, sino una colisión entre herramientas corporativas y las estrictas demandas de reciprocidad de las licencias de copyleft. Para la comunidad de Prusa, esto no se trata de reutilización de código, sino de si los actores propietarios pueden aprovechar los beneficios del desarrollo de código abierto mientras evitan sus obligaciones.

El conflicto se centra en cómo BambuStudio modificó PrusaSlicer, un software de impresión 3D de código abierto, y luego distribuyó esos cambios sin compartir su código fuente. La licencia AGPL requiere que cualquier obra derivada distribuida en red también debe ser de código abierto. El enfoque de Bambu - bifurcar la herramienta, agregar características y vender una versión de SaaS - cae directamente en el punto de mira de la licencia. El desarrollador principal de Prusa, Josef Prusa, ha documentado la violación en commits de código y diferencias de API, creando un rastro de papel difícil de ignorar para un tribunal.

## Precedentes legales chocan

Esta no es la primera vez que la licencia de código abierto se enreda con intereses comerciales. El caso Versata vs. Ameriprise de 2022 reveló una falla más profunda en la forma en que las empresas tratan el código con licencia GPL. El software de gestión de canales de distribución de Versata incluía el código GPL'd VTD-XML, pero la empresa evitó una licencia propietaria. Cuando Ameriprise descubrió esto, ellos contra-demandaron, argumentando que la violación de la GPL de Versata invalidaba su propio uso del software. El caso se centró en si un tribunal estatal podía escuchar la reclamación de violación de la GPL - una cuestión resuelta por la sentencia del tribunal de que la ley federal de derechos de autor la prevenía.

El resultado dejó un vacío. Los tribunales ahora enfrentan un obstáculo procesal: aunque pueden dictaminar sobre el cumplimiento de la licencia, no pueden obligar a una empresa a abrir el código de un producto bajo la GPL a menos que el caso se enmarque como una infracción directa de derechos de autor. Esta técnica permite a los infractores evitar el alcance completo de los requisitos de la licencia mientras aún enfrentan riesgos legales sobre la distribución.

## Por qué la AGPL es importante para los ecosistemas propietarios

La AGPL fue diseñada para cerrar una laguna en la GPL al requerir la divulgación del código fuente incluso para servicios en red. A diferencia de la GPL, que se centra en la distribución de software, la AGPL aborda explícitamente el SaaS como una forma de distribución. El modelo de SaaS de BambuStudio, que combina el código modificado de PrusaSlicer en un servicio alojado, hace que la violación de la AGPL sea legalmente procesable.

La defensa de Prusa destaca una tensión más amplia: los proyectos de código abierto deben hacer cumplir las licencias para mantener su integridad, pero la aplicación requiere recursos que la mayoría de los desarrolladores no tienen. Este caso podría obligar a una reconsideración de cómo las licencias de código abierto interactúan con los modelos de negocio en la nube. Si Prusa gana, podría sentar un precedente de que el SaaS no es inmune a los requisitos de copyleft - un cambio que podría propagarse por la industria.

## Qué observar

El caso de BambuStudio probablemente girará en torno a si un tribunal acepta el argumento de Prusa de que el SaaS constituye una distribución bajo la AGPL. Si Prusa gana, podría convertirse en una plantilla para que otros proyectos de FOSS hagan cumplir las licencias contra los proveedores de la nube. Por el contrario, una pérdida podría embolden a las empresas para explotar la ambigüedad de la AGPL sobre los modelos de servicio.

En paralelo, el resultado del caso Versata podría aclarar cómo los tribunales manejan las violaciones de la GPL en el software comercial. Incluso si un tribunal no puede obligar a una empresa a abrir el código, aún podría imponer daños o injuciones. Cualquiera de los resultados redefiniría las evaluaciones de riesgo para las empresas que utilizan componentes de código abierto. La comunidad FOSS necesita reglas claras - preferiblemente de los tribunales, no de las demandas - sobre dónde se dibuja la línea entre el cumplimiento y la explotación.