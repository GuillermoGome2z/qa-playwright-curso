import { test, expect } from '@playwright/test';
import fs from 'node:fs';

const evidenciaClase02 = (subdir: string, nombre: string) => {
  const ruta = `./evidencias/clase02/${subdir}`;
  fs.mkdirSync(ruta, { recursive: true });
  return `${ruta}/${nombre}`;
};

test.describe('Clase 02 - Navegación y esperas en DemoBlaze', () => {
  test('Navegar al carrito y regresar al inicio', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveURL(/demoblaze/);

    await page.screenshot({
      path: evidenciaClase02('test01', '01-pagina-inicio.png'),
      fullPage: true,
    });

    await page.getByRole('link', { name: 'Cart' }).click();

    await page.waitForURL('**/cart.html');
    await expect(page).toHaveURL(/cart/);

    await page.screenshot({
      path: evidenciaClase02('test01', '02-carrito-vacio.png'),
      fullPage: true,
    });

    await page.goBack();

    await expect(page).toHaveURL(
      /demoblaze\.com\/(?:index\.html)?$/,
    );
  });

  test('Navegar a la categoría Phones y ver un producto', async ({
    page,
  }) => {
    await page.goto('/');

    await page.getByText('Phones', { exact: true }).click();

    await page.waitForSelector('.card-title a');

    const productos = page.locator('.card-title a');

    expect(await productos.count()).toBeGreaterThan(0);

    await productos.first().click();

    await page.waitForURL(/prod\.html/);
    await page.waitForLoadState('domcontentloaded');

    await page.screenshot({
      path: evidenciaClase02('test02', '03-detalle-producto.png'),
      fullPage: true,
    });

    await expect(
      page.getByText('Add to cart', { exact: true }),
    ).toBeVisible();
  });

  test('Capturar el navbar y el footer por separado', async ({ page }) => {
    await page.goto('/');

    const navbar = page.locator('#navbarExample');

    await expect(navbar).toBeVisible();

    await navbar.screenshot({
      path: evidenciaClase02('test03', '04-navbar.png'),
    });

    const footer = page.locator('#footc');

    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();

    await footer.screenshot({
      path: evidenciaClase02('test03', '05-footer.png'),
    });
  });

  test('Verificar tiempo de carga de la página', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/');
    await page.waitForLoadState('load');

    const loadTime = Date.now() - startTime;

    console.log(`Tiempo de carga: ${loadTime}ms`);

    expect(loadTime).toBeLessThan(10000);

    await page.screenshot({
      path: evidenciaClase02('test04', '06-tiempo-carga.png'),
      fullPage: true,
    });
  });
});