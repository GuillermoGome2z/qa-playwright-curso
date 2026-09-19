# SQA Plan mínimo - Sauce Demo

## Propósito
Verificar que las funciones críticas de Sauce Demo (login, inventario, carrito y checkout) funcionan correctamente antes de cada deploy.

## Alcance
Se prueban los flujos funcionales de login, catálogo/inventario, carrito de compras y checkout con distintos tipos de usuario (estándar, bloqueado, con lentitud artificial); NO se prueban rendimiento bajo carga, seguridad ni compatibilidad móvil.

## Herramientas
Playwright + TypeScript, ejecutado en Chromium, con reportes HTML y evidencias (screenshots, video, trace).

## Criterios de salida
Se considera listo cuando el 100% de los tests críticos (login, checkout y carrito) pasan en la suite automatizada.
