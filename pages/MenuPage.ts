import { Page, Locator, expect } from '@playwright/test';

export class MenuPage {
  readonly page: Page;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  async openMenu() {
    await this.menuButton.click();

    await expect(this.logoutLink).toBeVisible();
  }

  async logout() {
    await this.openMenu();

    await this.logoutLink.click();

    await expect(this.page).toHaveURL(
      /saucedemo\.com\/?$/
    );

    await expect(this.loginButton).toBeVisible();
  }
}