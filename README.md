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