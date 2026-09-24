// tests/tarea09.spec.ts
// Tarea de la Clase 09 - Tests reto: fixtures avanzados
// Técnicas nuevas (no vistas en tests/clase09.spec.ts):
//   Reto 1 -> fixture con teardown real (código DESPUÉS de use())
//   Reto 2 -> fixture con { scope: 'worker' }
//   Reto 3 -> test.use({ viewport }) + parametrización

import { test as base, expect } from '@playwright/test';
import { loginAs } from '../helpers/auth';

// ============================================================================
// RETO 1: Fixture con teardown real
// ============================================================================
// Setup: arranca el cronómetro. Teardown: corre al terminar el test (incluso
// si el test falla) e imprime cuánto tardó.
type Cronometro = { inicio: number };

const testConTeardown = base.extend<{ cronometro: Cronometro }>({
  cronometro: async ({}, use, testInfo) => {
    const inicio = Date.now();
    console.log(`[setup] cronómetro iniciado para "${testInfo.title}"`);

    await use({ inicio });

    const duracion = Date.now() - inicio;
    console.log(`[teardown] "${testInfo.title}" tardó ${duracion}ms (estado: ${testInfo.status})`);
  },
});

testConTeardown.describe('Reto 1 - Fixture con teardown real', () => {
  testConTeardown('El teardown del cronómetro corre al terminar el test', async ({ page, cronometro }) => {
    await loginAs(page, 'standard_user');
    await expect(page).toHaveURL(/inventory/);
    await page.screenshot({ path: './evidencias/clase09/tarea09-reto1/reto1-inventario-con-cronometro.png' });

    expect(Date.now() - cronometro.inicio).toBeGreaterThan(0);
  });
});

// ============================================================================
// RETO 2: Fixture de alcance worker
// ============================================================================
// A diferencia de un fixture normal (scope: 'test', se crea y destruye por
// cada test), uno con scope 'worker' se crea una sola vez por worker y su
// estado persiste entre los tests que ese worker ejecuta. El modo 'serial'
// garantiza que ambos tests corran en el mismo worker.
type ContadorWorker = { valor: number };

const testConWorker = base.extend<{}, { contadorWorker: ContadorWorker }>({
  contadorWorker: [
    async ({}, use) => {
      const contador = { valor: 0 };
      console.log('[worker setup] contador creado en 0');
      await use(contador);
      console.log(`[worker teardown] valor final del contador: ${contador.valor}`);
    },
    { scope: 'worker' },
  ],
});

testConWorker.describe('Reto 2 - Fixture de alcance worker', () => {
  testConWorker.describe.configure({ mode: 'serial' });

  testConWorker('Test A: el contador sube de 0 a 1', async ({ contadorWorker }) => {
    contadorWorker.valor++;
    console.log(`Contador tras Test A: ${contadorWorker.valor}`);
    expect(contadorWorker.valor).toBe(1);
  });

  testConWorker('Test B: el mismo worker conserva el estado y sube a 2', async ({ contadorWorker }) => {
    contadorWorker.valor++;
    console.log(`Contador tras Test B: ${contadorWorker.valor}`);
    expect(contadorWorker.valor).toBe(2);
  });
});

// ============================================================================
// RETO 3: test.use() + parametrización
// ============================================================================
const viewports = [
  { nombre: 'movil', width: 375, height: 667 },
  { nombre: 'escritorio', width: 1280, height: 720 },
];

for (const vp of viewports) {
  base.describe(`Reto 3 - Viewport ${vp.nombre} (${vp.width}x${vp.height})`, () => {
    base.use({ viewport: { width: vp.width, height: vp.height } });

    base(`El inventario se muestra correctamente en ${vp.nombre}`, async ({ page }) => {
      await loginAs(page, 'standard_user');
      await expect(page).toHaveURL(/inventory/);

      expect(page.viewportSize()).toEqual({ width: vp.width, height: vp.height });
      await expect(page.locator('.inventory_item')).toHaveCount(6);

      await page.screenshot({ path: `./evidencias/clase09/tarea09-reto3/reto3-inventario-${vp.nombre}.png` });
      console.log(`Inventario verificado en viewport ${vp.nombre} (${vp.width}x${vp.height})`);
    });
  });
}
