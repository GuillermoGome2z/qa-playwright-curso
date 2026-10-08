// tests/clase10-smoke.spec.ts
import { test, expect, Page, TestInfo } from '@playwright/test';
import { loginAs } from '../helpers/auth';

// Evidencia por test y por project (chromium, firefox, webkit, mobile-chrome, mobile-safari)
async function evidencia(page: Page, testInfo: TestInfo, nombre: string) {
  await page.screenshot({ path: `./evidencias/clase10/smoke/${nombre}-${testInfo.project.name}.png` });
}

// { tag: '@smoke' } habilita: npx playwright test --grep "@smoke"
test.describe('Smoke Tests - Sauce Demo', () => {

  test('La pagina de login carga', { tag: '@smoke' }, async ({ page }, testInfo) => {
    await page.goto('https://www.saucedemo.com');
    await expect(page).toHaveTitle(/Swag Labs/);
    await expect(page.locator('#login-button')).toBeVisible();
    await evidencia(page, testInfo, '01-login-carga');
  });

  test('Login con usuario estandar funciona', { tag: '@smoke' }, async ({ page }, testInfo) => {
    await loginAs(page, 'standard_user');
    await expect(page).toHaveURL(/inventory/);
    await evidencia(page, testInfo, '02-login-estandar');
  });

  test('El inventario muestra productos', { tag: '@smoke' }, async ({ page }, testInfo) => {
    await loginAs(page, 'standard_user');
    const items = page.locator('.inventory_item');
    await expect(items).toHaveCount(6);
    await evidencia(page, testInfo, '03-inventario-productos');
  });

  test('El carrito es accesible', { tag: '@smoke' }, async ({ page }, testInfo) => {
    await loginAs(page, 'standard_user');
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/cart/);
    await evidencia(page, testInfo, '04-carrito-accesible');
  });

  test('El checkout inicia correctamente', { tag: '@smoke' }, async ({ page }, testInfo) => {
    await loginAs(page, 'standard_user');
    await page.locator('.btn_inventory').first().click();
    await page.locator('.shopping_cart_link').click();
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/checkout-step-one/);
    await evidencia(page, testInfo, '05-checkout-inicia');
  });

});
