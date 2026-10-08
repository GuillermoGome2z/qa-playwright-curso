import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
  use: {
    // Se conserva el baseURL de DemoBlaze: las Clases 1-4 lo necesitan
    baseURL: 'https://www.demoblaze.com',
    // headless: false hacía que Firefox se colgara al hacer click en Login
    // (timeout de 30s); en headless los 5 projects pasan sin problema
    headless: true,
    screenshot: 'on', //'on' | 'off' | 'only-on-failure',
    video: 'on', //'on' | 'off' |'retain-on-failure',
    trace: 'on', //'on' | 'off' |'retain-on-failure',
  },

  // Clase 10 - Multi-browser: los 3 motores (Blink, Gecko, WebKit) + 2 móviles
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } },
    { name: 'mobile-safari', use: { ...devices['iPhone 12'] } },
  ],
  workers: 1, // un navegador a la vez: evita timeouts con 5 projects
});
