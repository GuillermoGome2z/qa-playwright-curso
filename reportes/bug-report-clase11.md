  # Bug Report - BR-CLASE11-001

  **Título:** En /broken-images, 2 de las 3 imágenes no cargan (404)
  **Fecha:** 2026-10-10
  **Reportado por:** Guillermo Gómez
  **Ambiente:** Windows 11, Firefox (Playwright), https://practice.expandtesting.com

  ## Descripción
  La página /broken-images debería mostrar 3 imágenes de ejemplo ("Image 1", "Image 2", "Image 3"), pero 2 de ellas no cargan: el navegador no renderiza ningún contenido para "Image 1" ni "Image 2" (ancho natural = 0 px). Solo "Image 3" carga correctamente, mostrando un ícono de avatar genérico.

  ## Severidad: Baja
  No impide usar la página ni el resto del sitio; es contenido de ejemplo en una página de práctica, sin efecto en ningún flujo funcional.

  ## Prioridad: P4
  No bloquea nada ni afecta a usuarios reales del sitio (es una página de demostración para practicar automatización). Va al backlog.

  ## Frecuencia: Siempre
  Se reproduce en cada ejecución del test (ver tests/clase11.spec.ts, test "Imágenes rotas: todas las imágenes de la página deben cargar").

  ## Pasos para reproducir
  1. Navegar a https://practice.expandtesting.com/broken-images
  2. Observar las 3 imágenes mostradas en la sección principal

  ## Resultado esperado
  Las 3 imágenes cargan correctamente (ancho natural > 0 px en las tres).

  ## Resultado obtenido
  Solo 1 de las 3 imágenes carga. Las otras 2 (correspondientes a asdf.jpg y hjkl.jpg) responden 404 y no muestran contenido.

  ## Evidencia
  - Test automatizado: `tests/clase11.spec.ts` (test etiquetado `@bug`, documentado con `test.fail()`)
  - Captura, video y traza generados en `test-results/` al ejecutar:
    `npx playwright test tests/clase11.spec.ts -g "rotas" --project=firefox`
  - Reporte HTML: `npx playwright show-report`
  - Error observado: `expect(received).toBeGreaterThan(expected)` — `Expected: > 0`, `Received: 0`

  ## Notas adicionales
  Defecto conocido mantenido en verde con `test.fail(true, 'BUG-001: asdf.jpg y hjkl.jpg responden 404')` en el test correspondiente, para que la suite siga pasando mientras el defecto siga abierto y se ponga en rojo automáticamente el día que se corrija (o se agreguen las imágenes faltantes).

## Seguimiento en GitHub
[Issue #1 — Imágenes rotas](https://github.com/GuillermoGome2z/qa-playwright-curso/issues/1)