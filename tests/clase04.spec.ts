import { test, expect, type Page } from '@playwright/test';
import fs from 'node:fs';

const evidenciaClase04 = (subdir: string, nombre: string) => {
  const ruta = `./evidencias/clase04/${subdir}`;
  fs.mkdirSync(ruta, { recursive: true });
  return `${ruta}/${nombre}`;
};

// Crear un usuario diferente en cada ejecución
const usuario = {
  username: `testuser_${Date.now().toString().slice(-6)}`,
  password: 'Password123'
};

async function loginConReintento(
  page: Page,
  username: string,
  password: string,
  intentos = 5
) {
  for (let i = 0; i < intentos; i++) {
    await page
      .locator('#navbarExample')
      .getByRole('link', {
        name: 'Log in',
        exact: true
      })
      .click();

    await page.waitForSelector('#logInModal', {
      state: 'visible'
    });

    await page
      .locator('#loginusername')
      .fill(username);

    await page
      .locator('#loginpassword')
      .fill(password);

    await page
      .locator('#logInModal')
      .getByRole('button', {
        name: 'Log in'
      })
      .click();

    try {
      await page.waitForSelector('#nameofuser', {
        state: 'visible',
        timeout: 4000
      });

      return;
    } catch {
      console.log(
        `Login intento ${i + 1}/${intentos} sin éxito todavía, reintentando...`
      );

      await page.waitForTimeout(1500);
    }
  }

  throw new Error(
    `No se pudo iniciar sesión con ${username} tras ${intentos} intentos`
  );
}

test.describe(
  'Clase 04 - Flujo completo de usuario en DemoBlaze',
  () => {
    test(
      'Registrar un nuevo usuario',
      async ({ page }) => {
        await page.goto('/');

        await page
          .locator('#navbarExample')
          .getByRole('link', {
            name: 'Sign up',
            exact: true
          })
          .click();

        await page.waitForSelector('#signInModal', {
          state: 'visible'
        });

        await page
          .locator('#sign-username')
          .fill(usuario.username);

        await page
          .locator('#sign-password')
          .fill(usuario.password);

        await page
          .locator('#signInModal')
          .screenshot({
            path: evidenciaClase04('test01-registro', 'registro-llenado.png')
          });

        const dialogPromise =
          new Promise<void>((resolve) => {
            page.once(
              'dialog',
              async (dialog) => {
                console.log(
                  `Alert dice: ${dialog.message()}`
                );

                await dialog.accept();

                resolve();
              }
            );
          });

        await page
          .locator('#signInModal')
          .getByRole('button', {
            name: 'Sign up'
          })
          .click();

        await dialogPromise;

        console.log(
          `Usuario ${usuario.username} registrado`
        );
      }
    );

    test(
      'Login con el usuario registrado',
      async ({ page }) => {
        page.on(
          'dialog',
          async (dialog) => {
            console.log(
              `Dialog: ${dialog.message()}`
            );

            await dialog.accept();
          }
        );

        await page.goto('/');

        await loginConReintento(
          page,
          usuario.username,
          usuario.password
        );

        const nombreUsuario =
          await page
            .locator('#nameofuser')
            .textContent();

        expect(nombreUsuario)
          .toContain(usuario.username);

        await page.screenshot({
          path: evidenciaClase04('test02-login', 'login-exitoso.png'),
          fullPage: true
        });

        console.log(
          `Login exitoso como: ${nombreUsuario}`
        );
      }
    );

    test(
      'Flujo completo: login -> agregar producto -> verificar carrito',
      async ({ page }) => {
        page.on(
          'dialog',
          async (dialog) => {
            await dialog.accept();
          }
        );

        await page.goto('/');

        await loginConReintento(
          page,
          usuario.username,
          usuario.password
        );

        await page.waitForSelector(
          '.card-title a'
        );

        const primerProducto =
          page
            .locator('.card-title a')
            .first();

        const nombreProducto =
          await primerProducto.textContent();

        await primerProducto.click();

        await page.waitForLoadState(
          'domcontentloaded'
        );

        await page
          .getByText('Add to cart')
          .click();

        await page.waitForTimeout(2000);

        await page
          .locator('#navbarExample')
          .getByRole('link', {
            name: 'Cart',
            exact: true
          })
          .click();

        await page.waitForURL(
          '**/cart.html'
        );

        await page.waitForTimeout(1500);

        const itemsCarrito =
          page.locator('#tbodyid tr');

        const cantidadItems =
          await itemsCarrito.count();

        expect(cantidadItems)
          .toBeGreaterThanOrEqual(1);

        console.log(
          `Flujo completo exitoso. Producto "${nombreProducto}" en carrito.`
        );

        console.log(
          `Items en carrito: ${cantidadItems}`
        );

        await page.screenshot({
          path: evidenciaClase04('test03-carrito', 'carrito-con-producto.png'),
          fullPage: true
        });
      }
    );

    test(
      'Intentar login con credenciales incorrectas',
      async ({ page }) => {
        await page.goto('/');

        await page
          .locator('#navbarExample')
          .getByRole('link', {
            name: 'Log in',
            exact: true
          })
          .click();

        await page.waitForSelector(
          '#logInModal',
          {
            state: 'visible'
          }
        );

        await page
          .locator('#loginusername')
          .fill('usuario_que_no_existe');

        await page
          .locator('#loginpassword')
          .fill('password_incorrecta');

        const dialogPromise =
          new Promise<string>((resolve) => {
            page.once(
              'dialog',
              async (dialog) => {
                const mensaje =
                  dialog.message();

                await dialog.accept();

                resolve(mensaje);
              }
            );
          });

        await page
          .locator('#logInModal')
          .getByRole('button', {
            name: 'Log in'
          })
          .click();

        const mensajeAlert =
          await dialogPromise;

        expect(mensajeAlert)
          .toBeTruthy();

        console.log(
          `Error mostrado: ${mensajeAlert}`
        );

        const usuarioLogueado =
          page.locator('#nameofuser');

        await expect(
          usuarioLogueado
        ).not.toBeVisible();

        await page.screenshot({
          path: evidenciaClase04('test04-login-incorrecto', 'login-incorrecto.png'),
          fullPage: true
        });
      }
    );

    test(
      'Reto 1 - Llenar formulario Place Order con fill()',
      async ({ page }) => {
        await page.goto('/');

        await page
          .locator('#navbarExample')
          .getByRole('link', {
            name: 'Cart',
            exact: true
          })
          .click();

        await page.waitForURL(
          '**/cart.html'
        );

        await page
          .getByRole('button', {
            name: 'Place Order'
          })
          .click();

        await page.waitForSelector(
          '#orderModal',
          {
            state: 'visible'
          }
        );

        await page
          .locator('#name')
          .fill('Usuario Prueba');

        await page
          .locator('#country')
          .fill('Guatemala');

        await page
          .locator('#city')
          .fill('Guatemala');

        await page
          .locator('#card')
          .fill('1234567890123456');

        const botonPurchase =
          page
            .locator('#orderModal')
            .getByRole('button', {
              name: 'Purchase'
            });

        await expect(
          botonPurchase
        ).toBeVisible();

        await expect(
          botonPurchase
        ).toBeEnabled();

        await page
          .locator('#orderModal')
          .screenshot({
            path: evidenciaClase04('test05-reto1', 'reto1-place-order.png')
          });

        console.log(
          'Reto 1 exitoso: formulario Place Order completado'
        );
      }
    );

    test(
      'Reto 2 - Cerrar modal de login con Close',
      async ({ page }) => {
        await page.goto('/');

        await page
          .locator('#navbarExample')
          .getByRole('link', {
            name: 'Log in',
            exact: true
          })
          .click();

        const modalLogin =
          page.locator('#logInModal');

        await expect(
          modalLogin
        ).toBeVisible();

        await modalLogin
          .getByRole('button', {
            name: 'Close'
          })
          .last()
          .click();

        await expect(
          modalLogin
        ).not.toBeVisible();

        await page.screenshot({
          path: evidenciaClase04('test06-reto2', 'reto2-modal-cerrado.png'),
          fullPage: true
        });

        console.log(
          'Reto 2 exitoso: modal de login cerrado'
        );
      }
    );

    test(
      'Reto 3 - Limpiar un campo con clear()',
      async ({ page }) => {
        await page.goto('/');

        await page
          .locator('#navbarExample')
          .getByRole('link', {
            name: 'Log in',
            exact: true
          })
          .click();

        await page.waitForSelector(
          '#logInModal',
          {
            state: 'visible'
          }
        );

        const campoUsuario =
          page.locator('#loginusername');

        await campoUsuario.fill(
          'usuario_prueba'
        );

        expect(
          await campoUsuario.inputValue()
        ).toBe('usuario_prueba');

        await campoUsuario.clear();

        expect(
          await campoUsuario.inputValue()
        ).toBe('');

        await page
          .locator('#logInModal')
          .screenshot({
            path: evidenciaClase04('test07-reto3', 'reto3-clear.png')
          });

        console.log(
          'Reto 3 exitoso: el campo quedó vacío después de clear()'
        );
      }
    );
  }
);

