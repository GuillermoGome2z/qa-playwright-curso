import { test, expect } from '@playwright/test';

const BASE_URL = 'https://practice.expandtesting.com';
const TYPOS_URL = `${BASE_URL}/typos`;

test.describe('Tarea 11 - Técnicas para documentar defectos', () => {
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === testInfo.expectedStatus) {
      return;
    }

    const error = testInfo.error?.message ?? 'El test terminó con un estado inesperado.';
    const url = testInfo.title.includes('página')
      ? `${BASE_URL}/broken-images`
      : TYPOS_URL;
    const borrador = [
      `# Borrador de reporte: ${testInfo.title}`,
      '',
      `- **Ambiente:** ${testInfo.project.name}`,
      `- **URL:** ${url}`,
      `- **Resultado obtenido:** ${error}`,
      '',
      'El test no terminó con el estado esperado. Revisar el reporte HTML, la captura y la traza adjuntas.',
    ].join('\n');

    await testInfo.attach('borrador-reporte.md', {
      body: borrador,
      contentType: 'text/markdown',
    });
  });

  test('Reto 1: medir la frecuencia del defecto intermitente', async ({ page }, testInfo) => {
    const recargas = 12;
    const textoConError = "Sometimes you'll see a typo, other times you won,t.";
    let apariciones = 0;

    for (let intento = 0; intento < recargas; intento++) {
      await page.goto(TYPOS_URL);
      const texto = await page.locator('#core p').nth(1).textContent();

      if (texto?.includes(textoConError)) {
        apariciones++;
      }
    }

    const frecuencia = `El texto con el defecto apareció ${apariciones} de ${recargas} veces (${((apariciones / recargas) * 100).toFixed(2)}%).`;
    testInfo.annotations.push({
      type: 'bug',
      description: `Defecto intermitente en /typos. ${frecuencia}`,
    });
    await testInfo.attach('frecuencia-defecto-typos.txt', {
      body: frecuencia,
      contentType: 'text/plain',
    });
    await page.screenshot({
      path: `./evidencias/clase11/tarea11-reto1-typos-${testInfo.project.name}.png`,
      fullPage: true,
    });

    expect(apariciones).toBeGreaterThanOrEqual(0);
  });

  test('Reto 2: texto sin errores mientras el defecto siga abierto', {
    annotation: {
      type: 'issue',
      description: 'Defecto de texto intermitente en /typos: corregir "won,t" por "won\'t".',
    },
  }, async ({ page }) => {
    test.fixme(true, 'Defecto intermitente documentado: el texto puede contener "won,t".');

    await page.goto(TYPOS_URL);
    await expect(page.locator('#core p').nth(1)).toHaveText(
      "Sometimes you'll see a typo, other times you won't.",
    );
  });

  test('Reto 3: la página de defectos está disponible', async ({ page }, testInfo) => {
    await page.goto(`${BASE_URL}/broken-images`);
    await expect(page).toHaveTitle(/Broken Images/);
    await expect(page.locator('main')).toBeVisible();
    await page.screenshot({
      path: `./evidencias/clase11/tarea11-reto3-broken-images-${testInfo.project.name}.png`,
      fullPage: true,
    });

    await testInfo.attach('url', {
      body: `${BASE_URL}/broken-images`,
      contentType: 'text/plain',
    });
  });
});
