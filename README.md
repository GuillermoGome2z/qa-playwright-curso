# Proyecto de pruebas automatizadas con Playwright

## Datos del estudiante

- **Nombre:** Guillermo Jose Gomez Aguilera
- **Carné:** 1790-22-16429
- **Curso:** Aseguramiento de la Calidad del Software
- **Versión de Node.js:** v24.18.0

## Descripción del proyecto

Este proyecto fue desarrollado utilizando Playwright con TypeScript para realizar pruebas automatizadas sobre la aplicación web Demoblaze.

El objetivo del laboratorio es verificar que la página cargue correctamente y que sus elementos principales sean visibles y funcionales.

## Herramientas utilizadas

- Visual Studio Code
- Node.js v24.18.0
- npm
- TypeScript
- Playwright
- Chromium
- Git
- GitHub

## Pruebas realizadas

El proyecto contiene tres pruebas automatizadas:

1. Verificar que la página de Demoblaze cargue correctamente.
2. Verificar que el menú de categorías sea visible.
3. Verificar que la barra de navegación contenga los enlaces principales.

## Instalación

Para instalar las dependencias del proyecto:

```bash
npm install
```

Para instalar Chromium:

```bash
npx playwright install chromium
```

## Ejecución de las pruebas

Para ejecutar todos los tests:

```bash
npx playwright test
```

Para abrir el reporte HTML:

```bash
npx playwright show-report
```

## Evidencia de ejecución

La siguiente imagen muestra los tres tests ejecutándose correctamente:

![Tres tests aprobados](./evidencias/tests-pasando.png)

### Reporte de Playwright

![Reporte de Playwright](./evidencias/reporte-playwright.png)

## Resultado

Los tres tests fueron ejecutados correctamente utilizando Playwright y Chromium.

# Laboratorio 02: Navegación, esperas y capturas

## Descripción

En este laboratorio se realizaron pruebas automatizadas sobre la aplicación web DemoBlaze utilizando Playwright y TypeScript.

Las pruebas permiten navegar entre diferentes páginas, esperar la carga de elementos, capturar evidencias y medir el tiempo de carga de la página principal.

## Pruebas realizadas

1. Navegar desde la página principal hacia el carrito y regresar.
2. Seleccionar la categoría Phones y abrir el detalle de un producto.
3. Capturar por separado la barra de navegación y el pie de página.
4. Verificar que la página principal cargue en menos de 10 segundos.

## Evidencias generadas

Durante la ejecución se generaron cinco capturas de pantalla:

- `01-pagina-inicio.png`
- `02-carrito-vacio.png`
- `03-detalle-producto.png`
- `04-navbar.png`
- `05-footer.png`

## Preguntas de reflexión

### 1. ¿Cuántas capturas se generaron?

Se generaron cinco capturas. Dos corresponden a la navegación entre la página principal y el carrito, una corresponde al detalle de un producto y dos capturan por separado el navbar y el footer.

### 2. ¿Qué diferencia existe entre `fullPage: true` y una captura normal?

La opción `fullPage: true` captura toda la página web, incluyendo el contenido que se encuentra fuera del área visible y que normalmente requiere desplazamiento.

Una captura normal de la página registra únicamente el área visible del navegador. Cuando se utiliza `locator.screenshot()`, Playwright captura únicamente el elemento seleccionado, como el navbar o el footer.

### 3. ¿Por qué es importante capturar evidencias en las pruebas de software?

Las evidencias permiten demostrar que las pruebas fueron ejecutadas y documentar el estado de la aplicación durante la evaluación. También ayudan a identificar errores, comparar resultados y facilitar la revisión del trabajo realizado.

## Reflexión sobre auto-wait y sleep()

Playwright implementa `auto-wait` porque las páginas web no siempre cargan todos sus elementos inmediatamente. Antes de realizar una acción, Playwright espera automáticamente que el elemento esté visible, estable, habilitado y disponible para recibir la interacción.

En cambio, `sleep()` utiliza un tiempo fijo. Si se establece una espera demasiado corta, el elemento puede no estar listo y la prueba puede fallar. Si se establece una espera demasiado larga, la prueba perderá tiempo aunque el elemento ya se encuentre disponible.

La principal ventaja del `auto-wait` es que permite crear pruebas más estables, rápidas y confiables. Playwright espera solamente el tiempo necesario y reduce los fallos causados por diferencias en la velocidad de la red, el navegador o la computadora.