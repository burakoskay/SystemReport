---
title: "Microsoft filtra herramienta interna, exponiendo características de Windows 11"
date: 2026-05-18T18:07:07.084Z
tags: ["windows","security","features"]
hero_image: "/hero/2026-05-18-microsoft-leaks-internal-tool-exposing-windows-11-features-f107ce.jpg"
hero_image_credit_name: "Edward Jenner"
hero_image_credit_url: "https://www.pexels.com/@edward-jenner"
visual_keyword: "Windows 11 taskbar with hidden feature toggle overlay"
description: "La filtración de StagingTool y una vulnerabilidad en Recall dan a usuarios avanzados y atacantes acceso a los entresijos de Windows 11 mientras el SO finalmente"
sources_count: 5
locale: "es"
canonical_slug: "2026-05-18-microsoft-leaks-internal-tool-exposing-windows-11-features-f107ce"
audio_path: "/audio/2026-05-18-microsoft-leaks-internal-tool-exposing-windows-11-features-f107ce.mp3"
audio_bytes: 577037
audio_mime: "audio/mpeg"
---

La liberación accidental por parte de Microsoft de su herramienta interna StagingTool ha entregado a los usuarios avanzados de Windows una llave directa a características ocultas de Windows 11, exponiendo tanto la opacidad del desarrollo de la compañía como un punto ciego de seguridad más amplio.

La herramienta surgió en una búsqueda de "bug bash" en el Centro de Comentarios el miércoles, solo para ser retirada horas más tarde después de que los miembros de la comunidad comenzaran a compartirla. StagingTool es una aplicación de línea de comandos que alterna identificadores de características, lo que permite a cualquiera evitar las pruebas A/B de Microsoft y habilitar funcionalidades no lanzadas en versiones de vista previa para Insiders. La filtración refleja la herramienta de terceros ViveTool de larga duración, pero utiliza el propio sistema de banderas de Microsoft. El momento es notable: Microsoft ha insinuado una próxima actualización de septiembre que agregará soporte nativo para archivos RAR y 7-Zip, y la comunidad ahora tiene un atajo para probar esas y otras "Momentos" no nombradas antes de que sean anunciadas públicamente.

La presencia de un interruptor oficial subraya una tensión de larga duración entre la estrategia de implementación controlada de Microsoft y el apetito de la comunidad de entusiastas por el acceso temprano. Al exponer los identificadores de banderas en GitHub, Microsoft entregó involuntariamente un camino documentado limpio a características que estaban destinadas a ser ocultas hasta que la compañía las considerara listas. Herramientas de terceros como ViveTool ya han demostrado cuán frágil puede ser esa barrera, pero el estado "oficial" de StagingTool hace que sea más difícil para Microsoft afirmar que la comunidad simplemente está pirateando un comportamiento no documentado.

## Una vulnerabilidad en Recall que permite a cualquier usuario sifonar tus capturas de pantalla

Cuando Microsoft reconstruyó la línea de tiempo de Recall con enclaves VBS, cifrado AES-256-GCM y autenticación de Windows Hello, la intención estaba clara: mantener capturas de pantalla capturadas, texto OCR y metadatos sellados dentro de una bóveda. En la práctica, el proceso de frontend de la bóveda, AIXHost.exe, se ejecuta sin protección de Proceso Ligero, AppContainer o aplicación de integridad de código. Esa omisión significa que cualquier proceso de usuario estándar puede inyectar código en AIXHost.exe y secuestrar las mismas API COM que utiliza la interfaz de usuario legítima.

TotalRecall Reloaded explota esta brecha con una carga útil de dos archivos: un inyector (totalrecall.exe) y una DLL. El inyector captura la lista de procesos, asigna memoria en AIXHost.exe, escribe la ruta de la DLL y crea un hilo remoto que llama a LoadLibraryW: inyección clásica de DLL, sin exploit del kernel, sin derechos de administrador. Debido a que el DACL de Windows predeterminado otorga acceso completo a procesos del mismo usuario, el ataque funciona en un nivel obligatorio medio con BUILTIN\Administrators configurado para denegar solo. La carga útil luego inicializa un apartamento COM, oculta su identidad y camina por la misma ruta de descifrado que sigue la interfaz de usuario legítima, extrayendo capturas de pantalla descifradas y datos OCR como objetos COM en vivo.

Desde el punto de vista de la seguridad, la falla es inquietante. El enclave todavía requiere un gesto de Windows Hello, por lo que la herramienta no evita la autenticación; simplemente se sube una vez que el usuario se autentica. Sin embargo, el hecho de que un usuario estándar pueda extraer silenciosamente semanas de actividad sin elevación significa que cualquier cuenta comprometida, ya sea a través de phishing o un interno malicioso, puede cosechar un tesoro de datos visuales potencialmente sensibles. Las empresas que dependen de Recall de Windows 11 para el cumplimiento o el registro forense ahora enfrentan una superficie de ataque que evita las defensas tradicionales de escalada de privilegios.

## La barra de tareas finalmente obtiene las opciones que los usuarios han exigido

Cinco años después de que se lanzara Windows 11, Microsoft está probando una barra de tareas más pequeña y un menú Inicio más personalizable. Los cambios abordan una queja de larga duración de que la barra de tareas predeterminada se siente voluminosa y que el menú Inicio ofrece una personalización limitada. Las compilaciones tempranas muestran una fila de iconos condensada y la capacidad de fijar o deshacer elementos con una granularidad más fina, lo que acerca la interfaz de usuario a la flexibilidad que los usuarios disfrutaban en Windows 10.

Si bien el ajuste puede parecer cosmético, tiene implicaciones prácticas para los usuarios avanzados que manejan docenas de ventanas en varios monitores. Una barra de tareas más delgada libera espacio en pantalla, especialmente en computadoras portátiles de alta DPI, y los controles de menú Inicio agregados reducen la necesidad de alcanzar la Configuración o los lanzadores de terceros. El movimiento también señala que Microsoft está escuchando el ciclo de comentarios de la comunidad, que ha sido amplificado por herramientas como StagingTool que exponen experimentos de interfaz de usuario ocultos.

## Qué observar: actualización de septiembre, herramientas de comunidad y respuesta de Microsoft

La próxima actualización importante de Windows 11, programada para septiembre, promete un manejo nativo de RAR y 7-Zip, características que tradicionalmente han requerido instaladores de terceros. Con StagingTool ya en el mundo, los entusiastas probablemente probarán esa funcionalidad semanas antes del lanzamiento oficial, potencialmente descubriendo errores o regresiones de seguridad antes de tiempo. Monitorear los repositorios de GitHub de la comunidad para obtener nuevas presentaciones de identificadores de características dará una vista previa de lo que Microsoft planea enviar.

La postura oficial de Microsoft, como se señaló en un post anterior del Programa Insider, reconoce que los "Insiders técnicos" descubren banderas deshabilitadas y las habilitan manualmente. La filtración de StagingTool hace que ese proceso sea más directo y pone presión en la compañía para que ajuste sus canales de distribución internos. Los eventos futuros de "bug bash" pueden ver una verificación más estricta de los enlaces internos, y podemos ver que Microsoft responde con su propia utilidad de cambio de características sancionada o salvaguardias de prueba A/B más estrictas. Para las empresas, la combinación de una ruta de extracción de Recall y una herramienta de cambio de características compartida públicamente subraya la necesidad de un monitoreo riguroso de los puntos finales y la aplicación de políticas a medida que Windows 11 continúa evolucionando.

## La tensión más amplia entre apertura y control

Las dos historias, la filtración de StagingTool y la inyección de Recall, destacan una paradoja en la filosofía de desarrollo de Microsoft. Por un lado, la compañía abraza un modelo de "innovación continua" que envía cambios incrementales detrás de banderas de características. Por otro lado, los propios mecanismos que permiten la iteración rápida se convierten en vectores de ataque cuando se exponen. Los usuarios avanzados disfrutan de la capacidad de mirar detrás de la cortina, pero esa curiosidad puede debilitar involuntariamente la postura de seguridad de la plataforma.

Si Microsoft quiere preservar los beneficios de la agilidad de las banderas de características sin entregar las llaves, necesitará endurecer los procesos que exponen esas banderas. Eso podría significar agregar protecciones PPL o AppContainer a hosts de interfaz de usuario como AIXHost.exe, o cifrar asignaciones de identificadores de características de una manera que solo herramientas internas firmadas puedan leer. Hasta entonces, la comunidad continuará caminando por la línea entre la experimentación productiva y la exposición explotable, y cada herramienta filtrada o vulnerabilidad descubierta cambiará el equilibrio.