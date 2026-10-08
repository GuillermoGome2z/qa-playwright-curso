// tests/tarea10.spec.ts
// Tarea de la Clase 10 - Tests reto: tags, soft assertions y cross-browser
// Técnicas nuevas (no vistas en tests/clase10-smoke.spec.ts ni clase10-regression.spec.ts):
//   Reto 1 -> tags múltiples ({ tag: ['@regression', '@ui'] }) + --grep-invert
//   Reto 2 -> expect.soft() + testInfo.errors
//   Reto 3 -> fixture browserName para ajustar una aserción según el motor

import { test, expect } from '@playwright/test';
import { loginAs } from '../helpers/auth';

// ============================================================================
// RETO 1: Tags múltiples + --grep-invert
// ============================================================================
// Cada test lleva más de un tag, así se pueden armar subconjuntos combinando
// --grep (incluir) y --grep-invert (excluir). Ejemplos:
//   npx playwright test tests/tarea10.spec.ts --grep "@regression"
//     -> 4 tests (los 3 de este reto + el del Reto 2)
//   npx playwright test tests/tarea10.spec.ts --grep "@regression" --grep-invert "@ui"
//     -> 2 tests: excluye los 2 de interfaz
//   npx playwright test tests/tarea10.spec.ts --grep-invert "@carrito"
//     -> 4 tests: todo el archivo menos el que toca el carrito
test.describe('Reto 1 - Tags múltiples + --grep-invert', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'standard_user');
    await expect(page).toHaveURL(/inventory/);
  });

  test('El logo y el título del inventario se muestran', { tag: ['@regression', '@ui'] }, async ({ page }, testInfo) => {
    await expect(page.locator('.app_logo')).toHaveText('Swag Labs');
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    await page.screenshot({ path: `./evidencias/clase10/tarea10-reto1/reto1-ui-${testInfo.project.name}.png` });
  });

  test('El badge del carrito cuenta los productos agregados', { tag: ['@regression', '@ui', '@carrito'] }, async ({ page }) => {
    await page.locator('.btn_inventory').nth(0).click();
    await page.locator('.btn_inventory').nth(1).click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  });

  test('Ordenar por precio de mayor a menor deja el más caro primero', { tag: ['@regression', '@funcional'] }, async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
    await expect(page.locator('.inventory_item_price').first()).toHaveText('$49.99');
  });
});

// ============================================================================
// RETO 2: expect.soft()
// ============================================================================
// Un expect() normal detiene el test en el primer fallo. Con expect.soft()
// el test sigue ejecutándose y todos los fallos se acumulan en
// testInfo.errors, que Playwright reporta juntos al final. Útil para validar
// varios atributos de un mismo producto en una sola corrida.
test.describe('Reto 2 - expect.soft()', () => {
  test('Verificar todos los atributos de "Sauce Labs Backpack"', { tag: '@regression' }, async ({ page }, testInfo) => {
    await loginAs(page, 'standard_user');
    await expect(page).toHaveURL(/inventory/);

    const producto = page.locator('.inventory_item', { hasText: 'Sauce Labs Backpack' });

    await expect.soft(producto.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
    await expect.soft(producto.locator('.inventory_item_price')).toHaveText('$29.99');
    await expect.soft(producto.locator('.inventory_item_desc')).toContainText('carry.allTheThings()');
    await expect.soft(producto.locator('img')).toBeVisible();
    await expect.soft(producto.locator('img')).toHaveAttribute('alt', 'Sauce Labs Backpack');
    await expect.soft(producto.locator('.btn_inventory')).toHaveText('Add to cart');

    await page.screenshot({ path: `./evidencias/clase10/tarea10-reto2/reto2-backpack-${testInfo.project.name}.png` });

    // Si alguna aserción soft falló, aquí aparecen todas juntas
    console.log(`Aserciones soft fallidas: ${testInfo.errors.length}`);
    for (const error of testInfo.errors) {
      console.log(` - ${error.message?.split('\n')[0]}`);
    }
  });
});

// ============================================================================
// RETO 3: fixture browserName
// ============================================================================
// En lugar de saltarse el test con test.skip() en algún navegador, se usa el
// fixture browserName para saber qué motor está corriendo y ajustar el valor
// esperado. El user agent que reporta el navegador es distinto en cada motor:
//   chromium (Desktop Chrome, Pixel 5)   -> incluye "Chrome/"
//   firefox  (Desktop Firefox)           -> incluye "Firefox/"
//   webkit   (Desktop Safari, iPhone 12) -> incluye "AppleWebKit" pero NO "Chrome"
test.describe('Reto 3 - fixture browserName', () => {
  test('El user agent corresponde al motor que ejecuta el test', { tag: '@crossbrowser' }, async ({ page, browserName }, testInfo) => {
    await loginAs(page, 'standard_user');
    await expect(page).toHaveURL(/inventory/);

    const userAgent = await page.evaluate(() => navigator.userAgent);
    console.log(`[${testInfo.project.name}] motor: ${browserName} | UA: ${userAgent}`);

    if (browserName === 'chromium') {
      expect(userAgent).toContain('Chrome/');
    } else if (browserName === 'firefox') {
      expect(userAgent).toContain('Firefox/');
    } else {
      expect(userAgent).toContain('AppleWebKit');
      expect(userAgent).not.toContain('Chrome');
    }

    // La funcionalidad es la misma en los 3 motores
    await expect(page.locator('.inventory_item')).toHaveCount(6);
    await page.screenshot({ path: `./evidencias/clase10/tarea10-reto3/reto3-${testInfo.project.name}.png` });
  });
});
