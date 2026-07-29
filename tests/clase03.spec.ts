import { test, expect } from '@playwright/test';

test.describe('Clase 03 - Locators en DemoBlaze', () => {

  // =========================================================
  // TEST 1: Locator por texto
  // =========================================================
  test('Locator por texto: verificar elementos del menú', async ({ page }) => {
    await page.goto('/');

    const nav = page.locator('#navbarExample');

    await expect(nav.getByText('Home')).toBeVisible();
    await expect(nav.getByText('Contact')).toBeVisible();
    await expect(nav.getByText('About us')).toBeVisible();

    await expect(
      nav.getByText('Cart', { exact: true })
    ).toBeVisible();
  });


  // =========================================================
  // TEST 2: Locator por CSS
  // =========================================================
  test('Locator por CSS: productos en la página principal', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.card-title');

    const tarjetas = page.locator('.card');
    const cantidad = await tarjetas.count();

    expect(cantidad).toBeGreaterThan(0);

    const primerProducto = page.locator('.card-title a').first();
    const nombreProducto = await primerProducto.textContent();

    expect(nombreProducto).not.toBeNull();
  });


  // =========================================================
  // TEST 3: Locator por ID
  // =========================================================
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
  });


  // =========================================================
  // TEST 4: Locator por atributo
  // =========================================================
  test('Locator por atributo: imagen del primer producto', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.card-title');

    await page.locator('.card-title a').first().click();

    await page.waitForLoadState('domcontentloaded');

    const imagenProducto = page.locator('.product-image img');

    await expect(imagenProducto).toBeVisible();

    const srcImagen = await imagenProducto.getAttribute('src');

    expect(srcImagen).not.toBeNull();
  });


  // =========================================================
  // TEST 5: Locators encadenados
  // =========================================================
  test('Locators encadenados: precio dentro de una tarjeta', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.card-title');

    const primeraTarjeta = page.locator('.card').first();

    const precio = primeraTarjeta.locator('h5');

    await expect(precio).toBeVisible();
  });


  // =========================================================
  // TEST 6: Negación
  // =========================================================
  test('Verificar que NO existe un elemento (negación)', async ({ page }) => {
    await page.goto('/');

    const mensajeVacio = page.getByText('No products found');

    await expect(mensajeVacio).not.toBeVisible();
  });


  // =========================================================
  // RETO 1: Locator por rol
  // =========================================================
  test('Reto 1: verificar botón Place Order con getByRole', async ({ page }) => {

    // Abrir directamente el carrito
    await page.goto('/cart.html');

    // Buscar el botón por su rol y nombre
    const botonPlaceOrder = page.getByRole('button', {
      name: 'Place Order'
    });

    // Verificar que esté visible
    await expect(botonPlaceOrder).toBeVisible();
  });


  // =========================================================
  // RETO 2: Locator con filter()
  // =========================================================
  test('Reto 2: encontrar producto con filter y leer su precio', async ({ page }) => {

    await page.goto('/');

    // Esperar a que carguen los productos
    await page.waitForSelector('.card');

    // Buscar la tarjeta que contiene Samsung galaxy s6
    const producto = page
      .locator('.card')
      .filter({ hasText: 'Samsung galaxy s6' })
      .first();

    await expect(producto).toBeVisible();

    // Buscar el precio solamente dentro de esa tarjeta
    const precio = producto.locator('h5');

    await expect(precio).toBeVisible();

    // Leer el precio
    const precioTexto = await precio.textContent();

    expect(precioTexto).not.toBeNull();

    console.log('Precio de Samsung galaxy s6:', precioTexto);
  });


  // =========================================================
  // RETO 3: Locator por atributo parcial
  // =========================================================
  test('Reto 3: verificar categorías con selector por atributo', async ({ page }) => {

    await page.goto('/');

    // Las categorías utilizan el atributo onclick con byCat(...)
    const categorias = page.locator('a[onclick^="byCat("]');

    // Deben existir exactamente 3 categorías
    await expect(categorias).toHaveCount(3);

    // Verificar sus nombres
    await expect(categorias.nth(0)).toHaveText('Phones');
    await expect(categorias.nth(1)).toHaveText('Laptops');
    await expect(categorias.nth(2)).toHaveText('Monitors');
  });

});