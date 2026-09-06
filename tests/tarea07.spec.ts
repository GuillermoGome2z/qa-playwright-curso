// tests/tarea07.spec.ts
// Tarea de la Clase 07 - Tests reto: evidencias avanzadas
// Técnicas nuevas (no vistas en tests/clase07.spec.ts):
//   Reto 1 -> test.step()
//   Reto 2 -> testInfo.attach()
//   Reto 3 -> toHaveScreenshot()

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Tarea 07 - Evidencias avanzadas', () => {

    test('Reto 1 - Login estructurado en pasos con test.step()', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await test.step('Navegar al sitio de login', async () => {
            await loginPage.navigate();
            await expect(page).toHaveURL(/saucedemo\.com/);
        });

        await test.step('Iniciar sesión con usuario válido', async () => {
            await loginPage.login('standard_user', 'secret_sauce');
        });

        await test.step('Verificar que se llegó al inventario', async () => {
            await inventoryPage.expectToBeOnInventoryPage();
        });
    });

    test('Reto 2 - Adjuntar datos capturados con testInfo.attach()', async ({ page }, testInfo) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.expectToBeOnInventoryPage();

        // Datos capturados durante la ejecución
        const cantidadProductos = await inventoryPage.getProductCount();
        const url = page.url();
        const fecha = new Date().toISOString();

        const contenido =
            `Reporte de captura - Tarea 07\n` +
            `------------------------------\n` +
            `Cantidad de productos en inventario: ${cantidadProductos}\n` +
            `URL visitada: ${url}\n` +
            `Fecha y hora de captura: ${fecha}\n`;

        // Adjunta el archivo de texto directamente al reporte HTML
        await testInfo.attach('datos-inventario.txt', {
            body: contenido,
            contentType: 'text/plain',
        });

        expect(cantidadProductos).toBeGreaterThan(0);
        console.log('Datos adjuntados al reporte HTML');
    });

    test('Reto 3 - Comparación visual del inventario con toHaveScreenshot()', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.expectToBeOnInventoryPage();

        // Primera corrida: genera el baseline en tests/tarea07.spec.ts-snapshots/
        // Corridas siguientes: compara pixel a pixel contra ese baseline
        await expect(page).toHaveScreenshot('inventario-baseline.png', {
            fullPage: true,
        });
    });

});
