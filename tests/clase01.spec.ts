import { test, expect } from '@playwright/test';
import fs from 'node:fs';

const evidenciaClase01 = (subdir: string, nombre: string) => {
  const ruta = `./evidencias/clase01/${subdir}`;
  fs.mkdirSync(ruta, { recursive: true });
  return `${ruta}/${nombre}`;
};

test('La página carga', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/STORE/);
  await expect(page.locator('#navbarExample')).toBeVisible();

  await page.screenshot({
    path: evidenciaClase01('test01', '01-pagina-cargada.png'),
    fullPage: true,
  });
});

test('El menú de categorías es visible', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('#cat')).toBeVisible();

  await page.screenshot({
    path: evidenciaClase01('test02', '02-menu-categorias.png'),
    fullPage: true,
  });
});

test('La barra de navegación tiene los enlaces', async ({ page }) => {
  await page.goto('/');

  const nav = page.locator('#navbarExample');

  await expect(
    nav.getByRole('link', { name: 'Home' })
  ).toBeVisible();

  await expect(
    nav.getByRole('link', { name: 'Contact' })
  ).toBeVisible();

  await expect(
    nav.getByRole('link', { name: 'Cart' })
  ).toBeVisible();

  await page.screenshot({
    path: evidenciaClase01('test03', '03-nav-enlaces.png'),
    fullPage: true,
  });
});