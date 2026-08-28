import { test, expect, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { MenuPage } from '../pages/MenuPage';


// ==========================================================
// RUTA PRINCIPAL DE EVIDENCIAS DE LA CLASE 06
// ==========================================================

const rutaEvidencias = path.join(
  process.cwd(),
  'evidencias',
  'clase06'
);


// ==========================================================
// CREAR ESTRUCTURA DE CARPETAS
// ==========================================================

function prepararCarpetasEvidencias() {
  const carpetas = [
    'resultado-general',
    'test01',
    'test02',
    'test03',
    'test04',
    'test05',
    'test06',
    'test07',
    'test08'
  ];

  for (const carpeta of carpetas) {
    fs.mkdirSync(
      path.join(rutaEvidencias, carpeta),
      {
        recursive: true
      }
    );
  }
}


// Crear las carpetas automáticamente
prepararCarpetasEvidencias();


// ==========================================================
// FUNCIÓN PARA GUARDAR CAPTURAS
// ==========================================================

async function guardarEvidencia(
  page: Page,
  carpeta: string,
  nombreArchivo: string
) {
  const rutaImagen = path.join(
    rutaEvidencias,
    carpeta,
    nombreArchivo
  );

  await page.screenshot({
    path: rutaImagen,
    fullPage: true
  });
}


// ==========================================================
// CLASE 06 - PAGE OBJECT MODEL
// ==========================================================

test.describe(
  'Clase 06 - Page Object Model en Sauce Demo',
  () => {

    // ======================================================
    // TEST 01
    // Login exitoso
    // ======================================================

    test(
      'Login exitoso con POM',
      async ({ page }) => {

        const loginPage =
          new LoginPage(page);

        const inventoryPage =
          new InventoryPage(page);

        await loginPage.navigate();

        await loginPage.login(
          'standard_user',
          'secret_sauce'
        );

        await inventoryPage
          .expectToBeOnInventoryPage();

        // Evidencia
        await guardarEvidencia(
          page,
          'test01',
          '01-login-exitoso.png'
        );

        console.log(
          'Login con POM exitoso'
        );
      }
    );


    // ======================================================
    // TEST 02
    // Login fallido
    // ======================================================

    test(
      'Login fallido con POM',
      async ({ page }) => {

        const loginPage =
          new LoginPage(page);

        await loginPage.navigate();

        await loginPage.login(
          'wrong_user',
          'wrong_pass'
        );

        await loginPage.expectLoginError(
          'Username and password do not match'
        );

        // Evidencia
        await guardarEvidencia(
          page,
          'test02',
          '02-login-fallido.png'
        );

        console.log(
          'Error de login capturado con POM'
        );
      }
    );


    // ======================================================
    // TEST 03
    // Agregar 2 productos y verificar carrito
    // ======================================================

    test(
      'Flujo completo: login -> agregar 2 productos -> verificar carrito',
      async ({ page }) => {

        const loginPage =
          new LoginPage(page);

        const inventoryPage =
          new InventoryPage(page);

        const cartPage =
          new CartPage(page);

        // Login
        await loginPage.navigate();

        await loginPage.login(
          'standard_user',
          'secret_sauce'
        );

        await inventoryPage
          .expectToBeOnInventoryPage();

        // Agregar productos
        await inventoryPage
          .addProductByName(
            'Sauce Labs Backpack'
          );

        await inventoryPage
          .addProductByName(
            'Sauce Labs Bike Light'
          );

        // Verificar badge
        await expect(
          inventoryPage.cartBadge
        ).toHaveText('2');

        // Ir al carrito
        await inventoryPage.goToCart();

        // Verificar 2 productos
        await cartPage
          .expectItemCount(2);

        // Evidencia
        await guardarEvidencia(
          page,
          'test03',
          '03-carrito-2-productos.png'
        );

        console.log(
          'Flujo completo con POM: 2 productos en carrito'
        );
      }
    );


    // ======================================================
    // TEST 04
    // Verificar 6 productos
    // ======================================================

    test(
      'Verificar que el inventario tiene 6 productos',
      async ({ page }) => {

        const loginPage =
          new LoginPage(page);

        const inventoryPage =
          new InventoryPage(page);

        await loginPage.navigate();

        await loginPage.login(
          'standard_user',
          'secret_sauce'
        );

        await inventoryPage
          .expectToBeOnInventoryPage();

        const count =
          await inventoryPage
            .getProductCount();

        expect(count).toBe(6);

        // Evidencia
        await guardarEvidencia(
          page,
          'test04',
          '04-inventario-6-productos.png'
        );

        console.log(
          'El inventario contiene 6 productos'
        );
      }
    );


    // ======================================================
    // TEST 05
    // Ordenar de mayor a menor precio
    // ======================================================

    test(
      'Ordenar productos de mayor a menor precio',
      async ({ page }) => {

        const loginPage =
          new LoginPage(page);

        const inventoryPage =
          new InventoryPage(page);

        await loginPage.navigate();

        await loginPage.login(
          'standard_user',
          'secret_sauce'
        );

        await inventoryPage
          .expectToBeOnInventoryPage();

        // Ordenar de mayor a menor
        await inventoryPage
          .sortBy('hilo');

        const precios =
          page.locator(
            '.inventory_item_price'
          );

        const todosLosPrecios =
          await precios.allTextContents();

        const numericos =
          todosLosPrecios.map(
            precio =>
              parseFloat(
                precio.replace('$', '')
              )
          );

        // Verificar orden descendente
        for (
          let i = 0;
          i < numericos.length - 1;
          i++
        ) {
          expect(
            numericos[i]
          ).toBeGreaterThanOrEqual(
            numericos[i + 1]
          );
        }

        // Evidencia
        await guardarEvidencia(
          page,
          'test05',
          '05-orden-mayor-menor.png'
        );

        console.log(
          'Productos ordenados correctamente de mayor a menor precio'
        );
      }
    );


    // ======================================================
    // TEST 06 - RETO 1
    // Checkout completo
    // ======================================================

    test(
      'Completar una compra de principio a fin con POM',
      async ({ page }) => {

        const loginPage =
          new LoginPage(page);

        const inventoryPage =
          new InventoryPage(page);

        const cartPage =
          new CartPage(page);

        const checkoutPage =
          new CheckoutPage(page);

        // Login
        await loginPage.navigate();

        await loginPage.login(
          'standard_user',
          'secret_sauce'
        );

        await inventoryPage
          .expectToBeOnInventoryPage();

        // Agregar producto
        await inventoryPage
          .addProductByName(
            'Sauce Labs Backpack'
          );

        // Badge = 1
        await expect(
          inventoryPage.cartBadge
        ).toHaveText('1');

        // Ir al carrito
        await inventoryPage.goToCart();

        // Verificar carrito
        await cartPage
          .expectItemCount(1);

        // Checkout
        await cartPage
          .proceedToCheckout();

        // Datos comprador
        await checkoutPage
          .fillCustomerInformation(
            'Guillermo',
            'Gomez',
            '01001'
          );

        // Finalizar
        await checkoutPage
          .finishPurchase();

        // Evidencia
        await guardarEvidencia(
          page,
          'test06',
          '06-checkout-completado.png'
        );

        console.log(
          'Compra completada correctamente con POM'
        );
      }
    );


    // ======================================================
    // TEST 07 - RETO 2
    // Logout
    // ======================================================

    test(
      'Cerrar sesión desde el menú hamburguesa con POM',
      async ({ page }) => {

        const loginPage =
          new LoginPage(page);

        const inventoryPage =
          new InventoryPage(page);

        const menuPage =
          new MenuPage(page);

        // Login
        await loginPage.navigate();

        await loginPage.login(
          'standard_user',
          'secret_sauce'
        );

        await inventoryPage
          .expectToBeOnInventoryPage();

        // Logout
        await menuPage.logout();

        // Evidencia
        await guardarEvidencia(
          page,
          'test07',
          '07-logout-exitoso.png'
        );

        console.log(
          'Logout realizado correctamente con POM'
        );
      }
    );


    // ======================================================
    // TEST 08 - RETO 3
    // Remover producto
    // ======================================================

    test(
      'Quitar producto y verificar que el badge desaparece al llegar a 0',
      async ({ page }) => {

        const loginPage =
          new LoginPage(page);

        const inventoryPage =
          new InventoryPage(page);

        // Login
        await loginPage.navigate();

        await loginPage.login(
          'standard_user',
          'secret_sauce'
        );

        await inventoryPage
          .expectToBeOnInventoryPage();

        // Agregar producto
        await inventoryPage
          .addProductByName(
            'Sauce Labs Backpack'
          );

        // Verificar badge = 1
        await expect(
          inventoryPage.cartBadge
        ).toHaveText('1');

        // Quitar producto
        await inventoryPage
          .removeProductByName(
            'Sauce Labs Backpack'
          );

        // Badge debe desaparecer
        await expect(
          inventoryPage.cartBadge
        ).toHaveCount(0);

        // Evidencia
        await guardarEvidencia(
          page,
          'test08',
          '08-producto-eliminado.png'
        );

        console.log(
          'Producto eliminado y badge desaparecido correctamente'
        );
      }
    );

  }
);