// helpers/auth.ts
import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

/**
 * Hace login en SauceDemo con el usuario indicado.
 * Usa siempre la contraseña por defecto 'secret_sauce' (la única válida en SauceDemo).
 */
export async function loginAs(page: Page, username: string, password = 'secret_sauce') {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(username, password);
}
