// tests/clase10-regression.spec.ts
import { test, expect, Page, TestInfo } from '@playwright/test';
import { loginAs } from '../helpers/auth';

// Evidencia por test y por project (chromium, firefox, webkit, mobile-chrome, mobile-safari)
async function evidencia(page: Page, testInfo: TestInfo, nombre: string) {
  await page.screenshot({ path: `./evidencias/clase10/regression/${nombre}-${testInfo.project.name}.png` });
}

test.describe('Regression Tests - Sauce Demo', () => {

  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'standard_user');
    await expect(page).toHaveURL(/inventory/);
  });

  test('Ordenamiento A-Z funciona', { tag: '@regression' }, async ({ page }, testInfo) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('az');
    const textos = await page.locator('.inventory_item_name').allTextContents();
    expect(textos).toEqual([...textos].sort((a, b) => a.localeCompare(b)));
    await evidencia(page, testInfo, '01-orden-a-z');
  });

  test('Ordenamiento Z-A funciona', { tag: '@regression' }, async ({ page }, testInfo) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('za');
    const textos = await page.locator('.inventory_item_name').allTextContents();
    const esperado = [...textos].sort((a, b) => a.localeCompare(b)).reverse();
    expect(textos).toEqual(esperado);
    await evidencia(page, testInfo, '02-orden-z-a');
  });

  test('Precio de menor a mayor funciona', { tag: '@regression' }, async ({ page }, testInfo) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
    const precios = await page.locator('.inventory_item_price').allTextContents();
    const numericos = precios.map(p => parseFloat(p.replace('$', '')));
    for (let i = 0; i < numericos.length - 1; i++) {
      expect(numericos[i]).toBeLessThanOrEqual(numericos[i + 1]);
    }
    await evidencia(page, testInfo, '03-precio-menor-mayor');
  });

  test('El boton "Remove" aparece despues de agregar al carrito',
    { tag: '@regression' }, async ({ page }, testInfo) => {
      const primerBoton = page.locator('.btn_inventory').first();
      await expect(primerBoton).toHaveText('Add to cart');
      await primerBoton.click();
      await expect(primerBoton).toHaveText('Remove');
      await evidencia(page, testInfo, '04-boton-remove');
      await primerBoton.click();
      await expect(primerBoton).toHaveText('Add to cart');
    });

  test('Navegar al detalle del producto y regresar',
    { tag: '@regression' }, async ({ page }, testInfo) => {
      const primerNombre = await page.locator('.inventory_item_name').first().textContent();
      await page.locator('.inventory_item_name').first().click();
      await expect(page).toHaveURL(/inventory-item/);
      await expect(page.locator('.inventory_details_name'))
        .toContainText(primerNombre!);
      await evidencia(page, testInfo, '05-detalle-producto');
      await page.locator('[data-test="back-to-products"]').click();
      await expect(page).toHaveURL(/inventory/);
    });

});
