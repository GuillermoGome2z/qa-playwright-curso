// tests/tarea08.spec.ts
// Tarea de la Clase 08 - Tests reto: hooks y suites avanzados
// Técnicas nuevas (no vistas en tests/clase08.spec.ts):
//   Reto 1 -> test.describe.configure({ mode: 'serial' }) + page compartida creada en beforeAll
//   Reto 2 -> test.slow()
//   Reto 3 -> test.skip() dinámico

import { test, expect } from '@playwright/test';
import { Page } from '@playwright/test';
import { loginAs } from '../helpers/auth';

// ============================================================================
// RETO 1: Suite serial con página compartida
// ============================================================================
// El modo 'serial' por sí solo NO comparte la page entre tests (cada test
// sigue recibiendo su propia page por defecto). Para reutilizarla de verdad
// hay que crearla una sola vez en beforeAll y guardarla en una variable
// externa a los tests.
test.describe('Reto 1 - Suite serial con página compartida', () => {
  test.describe.configure({ mode: 'serial' });

  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('Paso 1: login con standard_user', async () => {
    await loginAs(page, 'standard_user');
    await expect(page).toHaveURL(/inventory/);
  });

  test('Paso 2: agregar un producto (reutiliza la sesión del paso anterior)', async () => {
    // No hay login aquí: seguimos usando la misma page ya logueada
    await page.locator('.btn_inventory').first().click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('Paso 3: verificar el carrito (reutiliza el estado acumulado)', async () => {
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/cart/);
    await expect(page.locator('.cart_item')).toHaveCount(1);
    await page.screenshot({ path: './evidencias/clase08/tarea08-reto1/reto1-carrito-con-estado-compartido.png' });
  });
});

// ============================================================================
// RETO 2: test.slow()
// ============================================================================
test.describe('Reto 2 - test.slow()', () => {
  test('Usuario con lentitud artificial - timeout triplicado con test.slow()', async ({ page }) => {
    // performance_glitch_user tiene ~5s de delay en el login. En vez de
    // confiar en el margen del timeout global (30000ms), marcamos el test
    // como slow: Playwright triplica su timeout (30000ms -> 90000ms).
    test.slow();

    const inicio = Date.now();
    await loginAs(page, 'performance_glitch_user');
    const tiempoLogin = Date.now() - inicio;

    console.log(`Tiempo de login (glitch user, con test.slow()): ${tiempoLogin}ms`);
    await expect(page).toHaveURL(/inventory/);
    await page.screenshot({ path: './evidencias/clase08/tarea08-reto2/reto2-glitch-user-slow.png' });
  });
});

// ============================================================================
// RETO 3: test.skip() dinámico
// ============================================================================
test.describe('Reto 3 - test.skip() dinámico', () => {
  test('Verificar precio de un producto que podría no existir en el catálogo', async ({ page }) => {
    await loginAs(page, 'standard_user');

    // Esperar a que el inventario termine de renderizar antes de contar
    // productos: .count() no espera automáticamente (a diferencia de
    // expect()), así que sin esta línea la condición podría evaluarse
    // contra una lista todavía vacía justo después del login.
    await expect(page.locator('.inventory_item').first()).toBeVisible();

    // "Sauce Labs Hoodie" no forma parte del catálogo de 6 productos de
    // SauceDemo. La condición se evalúa en tiempo de ejecución (no se
    // asume de antemano si el producto está o no) y, si no existe, se
    // documenta la razón del skip en vez de fallar el test.
    const producto = page.locator('.inventory_item', { hasText: 'Sauce Labs Hoodie' });
    const existe = (await producto.count()) > 0;

    // Evidencia del inventario real en el momento en que se evalúa la condición
    await page.screenshot({ path: './evidencias/clase08/tarea08-reto3/reto3-inventario-antes-del-skip.png', fullPage: true });

    test.skip(
      !existe,
      'El producto "Sauce Labs Hoodie" no está en el catálogo estándar de SauceDemo (solo 6 productos) - condición evaluada en tiempo de ejecución'
    );

    await expect(producto.locator('.inventory_item_price')).toHaveText('$49.99');
  });
});
