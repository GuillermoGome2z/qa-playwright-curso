import { test, expect } from '@playwright/test';
import fs from 'node:fs';

// Crear la carpeta de evidencias si todavía no existe
test.beforeAll(() => {
  fs.mkdirSync('./evidencias', { recursive: true });
});

test.describe('Clase 02 - Navegación y esperas en DemoBlaze', () => {
  test('Navegar al carrito y regresar al inicio', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveURL(/demoblaze/);

    await page.screenshot({
      path: './evidencias/01-pagina-inicio.png',
      fullPage: true,
    });

    await page.getByRole('link', { name: 'Cart' }).click();

    await page.waitForURL('**/cart.html');
    await expect(page).toHaveURL(/cart/);

    await page.screenshot({
      path: './evidencias/02-carrito-vacio.png',
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

    // Esperar a que aparezcan los productos
    await page.waitForSelector('.card-title a');

    const productos = page.locator('.card-title a');

    expect(await productos.count()).toBeGreaterThan(0);

    await productos.first().click();

    await page.waitForURL(/prod\.html/);
    await page.waitForLoadState('domcontentloaded');

    await page.screenshot({
      path: './evidencias/03-detalle-producto.png',
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
      path: './evidencias/04-navbar.png',
    });

    /*
     * DemoBlaze identifica su pie de página con #footc.
     * Se desplaza hasta el elemento antes de tomar la captura.
     */
    const footer = page.locator('#footc');

    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();

    await footer.screenshot({
      path: './evidencias/05-footer.png',
    });
  });

  test('Verificar tiempo de carga de la página', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/');
    await page.waitForLoadState('load');

    const loadTime = Date.now() - startTime;

    console.log(`Tiempo de carga: ${loadTime}ms`);

    // La página debería cargar en menos de 10 segundos
    expect(loadTime).toBeLessThan(10000);
  });
});