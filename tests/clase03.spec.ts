import { test, expect } from '@playwright/test';
import fs from 'node:fs';

const evidenciaClase03 = (subdir: string, nombre: string) => {
  const ruta = `./evidencias/clase03/${subdir}`;
  fs.mkdirSync(ruta, { recursive: true });
  return `${ruta}/${nombre}`;
};

test.describe('Clase 03 - Locators en DemoBlaze', () => {

  test('Locator por texto: verificar elementos del menú', async ({ page }) => {
    await page.goto('/');

    const nav = page.locator('#navbarExample');

    await expect(nav.getByText('Home')).toBeVisible();
    await expect(nav.getByText('Contact')).toBeVisible();
    await expect(nav.getByText('About us')).toBeVisible();

    await expect(
      nav.getByText('Cart', { exact: true })
    ).toBeVisible();

    await page.screenshot({
      path: evidenciaClase03('test01', '01-menu-navegacion.png'),
      fullPage: true,
    });
  });

  test('Locator por CSS: productos en la página principal', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.card-title');

    const tarjetas = page.locator('.card');
    const cantidad = await tarjetas.count();

    expect(cantidad).toBeGreaterThan(0);

    const primerProducto = page.locator('.card-title a').first();
    const nombreProducto = await primerProducto.textContent();

    expect(nombreProducto).not.toBeNull();

    await page.screenshot({
      path: evidenciaClase03('test02', '02-productos-principal.png'),
      fullPage: true,
    });
  });

  test('Locator por ID: campos del modal de login', async ({ page }) => {
    await page.goto('/');

    await page
      .locator('#navbarExample')
      .getByRole('link', { name: 'Log in', exact: true })
      .click();

    await page.waitForSelector('#logInModal', {
      state: 'visible'
    });

    await expect(page.locator('#loginusername')).toBeVisible();
    await expect(page.locator('#loginpassword')).toBeVisible();

    await page.screenshot({
      path: evidenciaClase03('test03', '03-modal-login.png'),
      fullPage: true,
    });
  });

  test('Locator por atributo: imagen del primer producto', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.card-title');

    await page.locator('.card-title a').first().click();

    await page.waitForLoadState('domcontentloaded');

    const imagenProducto = page.locator('.product-image img');

    await expect(imagenProducto).toBeVisible();

    const srcImagen = await imagenProducto.getAttribute('src');

    expect(srcImagen).not.toBeNull();

    await page.screenshot({
      path: evidenciaClase03('test04', '04-imagen-producto.png'),
      fullPage: true,
    });
  });

  test('Locators encadenados: precio dentro de una tarjeta', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.card-title');

    const primeraTarjeta = page.locator('.card').first();

    const precio = primeraTarjeta.locator('h5');

    await expect(precio).toBeVisible();

    await page.screenshot({
      path: evidenciaClase03('test05', '05-precio-tarjeta.png'),
      fullPage: true,
    });
  });

  test('Verificar que NO existe un elemento (negación)', async ({ page }) => {
    await page.goto('/');

    const mensajeVacio = page.getByText('No products found');

    await expect(mensajeVacio).not.toBeVisible();

    await page.screenshot({
      path: evidenciaClase03('test06', '06-negacion-elemento.png'),
      fullPage: true,
    });
  });

  test('Reto 1: verificar botón Place Order con getByRole', async ({ page }) => {
    await page.goto('/cart.html');

    const botonPlaceOrder = page.getByRole('button', {
      name: 'Place Order'
    });

    await expect(botonPlaceOrder).toBeVisible();

    await page.screenshot({
      path: evidenciaClase03('test07-reto1', '07-reto1-place-order.png'),
      fullPage: true,
    });
  });

  test('Reto 2: encontrar producto con filter y leer su precio', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.card');

    const producto = page
      .locator('.card')
      .filter({ hasText: 'Samsung galaxy s6' })
      .first();

    await expect(producto).toBeVisible();

    const precio = producto.locator('h5');

    await expect(precio).toBeVisible();

    const precioTexto = await precio.textContent();

    expect(precioTexto).not.toBeNull();

    console.log('Precio de Samsung galaxy s6:', precioTexto);

    await page.screenshot({
      path: evidenciaClase03('test08-reto2', '08-reto2-producto-samsung.png'),
      fullPage: true,
    });
  });

  test('Reto 3: verificar categorías con selector por atributo', async ({ page }) => {
    await page.goto('/');

    const categorias = page.locator('a[onclick^="byCat("]');

    await expect(categorias).toHaveCount(3);

    await expect(categorias.nth(0)).toHaveText('Phones');
    await expect(categorias.nth(1)).toHaveText('Laptops');
    await expect(categorias.nth(2)).toHaveText('Monitors');

    await page.screenshot({
      path: evidenciaClase03('test09-reto3', '09-reto3-categorias.png'),
      fullPage: true,
    });
  });

});