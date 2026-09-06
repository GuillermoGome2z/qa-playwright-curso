# QA Automation · Playwright

<div align="center">

Automatización de pruebas funcionales sobre DemoBlaze y Sauce Demo utilizando Playwright + TypeScript.

Universidad Mariano Gálvez de Guatemala<br>
Curso: Aseguramiento de la Calidad del Software<br>
Estudiante: Guillermo Jose Gomez Aguilera<br>
Carné: 1790-22-16429

</div>

<div align="center">

[![Playwright](https://img.shields.io/badge/Playwright-Automation-45BA4B?logo=playwright)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Enabled-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-v24.18.0-339933?logo=node.js)](https://nodejs.org/)
[![Tests](https://img.shields.io/badge/Tests-38%20passed-success)](#estado-de-los-laboratorios)
[![Defectos](https://img.shields.io/badge/Defectos%20documentados-1-orange)](#reporte-de-defecto--dr-001)
[![GitHub](https://img.shields.io/badge/GitHub-Repositorio-181717?logo=github)](https://github.com/)

</div>

---

## Sobre el proyecto

Este repositorio presenta el desarrollo de un conjunto de laboratorios de automatización de pruebas realizado durante el curso de Aseguramiento de la Calidad del Software. El proyecto se enfoca en la validación funcional de aplicaciones web (DemoBlaze y Sauce Demo) mediante herramientas modernas de testing automatizado.

A lo largo del trabajo se implementaron pruebas funcionales automatizadas y flujos end-to-end que cubren aspectos como navegación, validación de interfaces, selección de elementos, acciones de usuario, manejo de diálogos, el patrón Page Object Model (POM) y generación de evidencia profesional de pruebas (screenshots, videos y trazas).

Desde la Clase 07 el proyecto incorpora, además, la documentación formal de defectos siguiendo la cadena causal **Error → Defecto → Fallo**, y técnicas avanzadas de evidencia como `test.step()`, `testInfo.attach()` y comparación visual con `toHaveScreenshot()`.

---

## Estado de los laboratorios

La siguiente tabla resume el alcance de los laboratorios implementados y su estado final de ejecución.

| Laboratorio | Tema | Tests | Estado |
|---|---|---:|---|
| Clase 01 | Introducción a Playwright | 3 | ✅ Completado |
| Clase 02 | Navegación, esperas y capturas | 4 | ✅ Completado |
| Clase 03 | Locators en Playwright | 9 | ✅ Completado |
| Clase 04 | Actions y flujo funcional | 7 | ✅ Completado |
| Clase 06 | Page Object Model (POM) | 8 | ✅ Completado |
| Clase 07 | Roles QA + Error/Defecto/Fallo + Evidencias avanzadas | 7 | ✅ Completado |
| **Total** |  | **38** | **✅ Completado** |

---

## Navegación

- [Sobre el proyecto](#sobre-el-proyecto)
- [Tecnologías](#tecnologías-y-herramientas)
- [Laboratorio 01](#laboratorio-01--introducción-a-playwright)
- [Laboratorio 02](#laboratorio-02--navegación-esperas-y-capturas)
- [Laboratorio 03](#laboratorio-03--locators-en-playwright)
- [Laboratorio 04](#laboratorio-04--actions-y-flujo-funcional-en-playwright)
- [Laboratorio 06](#laboratorio-06--page-object-model-pom-en-sauce-demo)
- [Laboratorio 07](#laboratorio-07--roles-qa--error-defecto-y-fallo--evidencias-avanzadas)
- [Reporte de defecto DR-001](#reporte-de-defecto--dr-001)
- [Evidencias](#evidencias-destacadas)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Ejecución](#ejecución)
- [Documentación adicional](#documentación-adicional)

---

## Tecnologías y herramientas

El proyecto fue desarrollado con un conjunto de herramientas orientadas a la automatización de pruebas funcionales y a la documentación técnica del proceso.

| Tecnología | Uso |
|---|---|
| Playwright | Automatización de pruebas end-to-end |
| TypeScript | Desarrollo de los tests |
| Node.js | Entorno de ejecución |
| Chromium | Navegador utilizado para las pruebas |
| Playwright Trace Viewer | Depuración visual paso a paso (timeline, screenshots, red, consola) |
| ISO/IEC 25010 | Marco de referencia para atributos de calidad del software |
| Git | Control de versiones |
| GitHub | Repositorio y documentación |

---

## Laboratorio 01 · Introducción a Playwright

> Objetivo: validar la carga inicial de la aplicación y la visibilidad de los elementos principales del menú.

### Desarrollo del laboratorio

En este laboratorio se realizaron las primeras pruebas automatizadas sobre la interfaz de DemoBlaze, con el fin de verificar la carga correcta de la página principal y la disponibilidad de los elementos básicos de navegación.

### Pruebas implementadas

| # | Prueba | Estado |
|---|---|---|
| 1 | Página carga correctamente | ✅ |
| 2 | Menú de categorías visible | ✅ |
| 3 | Navbar contiene enlaces principales | ✅ |

### Ejecutar laboratorio

```bash
npx playwright test tests/clase01.spec.ts
```

### Evidencias

<details>
<summary><strong>📸 Test 1 · Página cargada correctamente</strong></summary>

<br>

![Página cargada correctamente](./evidencias/clase01/test01/01-pagina-cargada.png)

</details>

<details>
<summary><strong>📸 Test 2 · Menú de categorías visible</strong></summary>

<br>

![Menú de categorías visible](./evidencias/clase01/test02/02-menu-categorias.png)

</details>

<details>
<summary><strong>📸 Test 3 · Navbar con enlaces principales</strong></summary>

<br>

![Navbar con enlaces principales](./evidencias/clase01/test03/03-nav-enlaces.png)

</details>

<details>
<summary><strong>✅ Resultado general · 3 pruebas aprobadas</strong></summary>

<br>

![Pruebas de Clase 01 aprobadas](./evidencias/clase01/resultado-general/tests-pasando.png)

</details>

<details>
<summary><strong>📊 Reporte HTML de Playwright</strong></summary>

<br>

![Reporte Playwright Clase 01](./evidencias/clase01/resultado-general/reporte-playwright.png)

</details>

---

## Laboratorio 02 · Navegación, esperas y capturas

> Objetivo: comprobar la navegación entre páginas, la carga de contenido y la generación de capturas de evidencia.

### Desarrollo del laboratorio

Este laboratorio permitió validar la interacción del usuario con distintos elementos de la aplicación, incluyendo el recorrido hacia el carrito, la apertura del detalle de un producto y la captura visual de componentes clave de la interfaz.

### Pruebas implementadas

| # | Prueba | Estado |
|---|---|---|
| 1 | Navegar al carrito y regresar | ✅ |
| 2 | Abrir detalle de un producto | ✅ |
| 3 | Capturar navbar y footer | ✅ |
| 4 | Verificar tiempo de carga | ✅ |

### Ejecutar laboratorio

```bash
npx playwright test tests/clase02.spec.ts
```

### Evidencias

<details>
<summary><strong>📸 Test 1 · Navegar al carrito y regresar</strong></summary>

<br>

![Página principal](./evidencias/clase02/test01/01-pagina-inicio.png)

![Carrito vacío](./evidencias/clase02/test01/02-carrito-vacio.png)

</details>

<details>
<summary><strong>📸 Test 2 · Abrir detalle de un producto</strong></summary>

<br>

![Detalle de producto](./evidencias/clase02/test02/03-detalle-producto.png)

</details>

<details>
<summary><strong>📸 Test 3 · Navbar y footer</strong></summary>

<br>

![Navbar](./evidencias/clase02/test03/04-navbar.png)

![Footer](./evidencias/clase02/test03/05-footer.png)

</details>

<details>
<summary><strong>📸 Test 4 · Tiempo de carga</strong></summary>

<br>

![Tiempo de carga](./evidencias/clase02/test04/06-tiempo-carga.png)

</details>

<details>
<summary><strong>✅ Resultado general · 4 pruebas aprobadas</strong></summary>

<br>

![Pruebas de Clase 02 aprobadas](./evidencias/clase02/resultado-general/06-tests-clase02-pasando.png)

</details>

---

## Laboratorio 03 · Locators en Playwright

> Objetivo: practicar diferentes técnicas de localización de elementos en la interfaz de DemoBlaze.

### Desarrollo del laboratorio

En este laboratorio se exploraron distintos tipos de locators y estrategias de selección de elementos, con el propósito de fortalecer la precisión y estabilidad de las pruebas automatizadas.

### Pruebas implementadas

| # | Prueba | Estado |
|---|---|---|
| 1 | Locator por texto | ✅ |
| 2 | Locator por CSS | ✅ |
| 3 | Locator por ID | ✅ |
| 4 | Locator por atributo | ✅ |
| 5 | Locators encadenados | ✅ |
| 6 | Negación de elementos | ✅ |
| 7 | Reto 1: Place Order con getByRole | ✅ |
| 8 | Reto 2: producto con filter | ✅ |
| 9 | Reto 3: selector por atributo parcial | ✅ |

### Ejecutar laboratorio

```bash
npx playwright test tests/clase03.spec.ts
```

### Evidencias

<details>
<summary><strong>📸 Test 1 · Locator por texto</strong></summary>

<br>

![Locator por texto](./evidencias/clase03/test01/01-menu-navegacion.png)

</details>

<details>
<summary><strong>📸 Test 2 · Locator por CSS</strong></summary>

<br>

![Locator por CSS](./evidencias/clase03/test02/02-productos-principal.png)

</details>

<details>
<summary><strong>📸 Test 3 · Locator por ID</strong></summary>

<br>

![Locator por ID](./evidencias/clase03/test03/03-modal-login.png)

</details>

<details>
<summary><strong>📸 Test 4 · Locator por atributo</strong></summary>

<br>

![Locator por atributo](./evidencias/clase03/test04/04-imagen-producto.png)

</details>

<details>
<summary><strong>📸 Test 5 · Locators encadenados</strong></summary>

<br>

![Locators encadenados](./evidencias/clase03/test05/05-precio-tarjeta.png)

</details>

<details>
<summary><strong>📸 Test 6 · Negación de elementos</strong></summary>

<br>

![Negación de elementos](./evidencias/clase03/test06/06-negacion-elemento.png)

</details>

<details>
<summary><strong>📸 Test 7 · Reto 1 - Place Order con getByRole()</strong></summary>

<br>

![Reto 1 - Place Order con getByRole()](./evidencias/clase03/test07-reto1/07-reto1-place-order.png)

</details>

<details>
<summary><strong>📸 Test 8 · Reto 2 - filter()</strong></summary>

<br>

![Reto 2 - filter()](./evidencias/clase03/test08-reto2/08-reto2-producto-samsung.png)

</details>

<details>
<summary><strong>📸 Test 9 · Reto 3 - atributo parcial</strong></summary>

<br>

![Reto 3 - atributo parcial](./evidencias/clase03/test09-reto3/09-reto3-categorias.png)

</details>

<details>
<summary><strong>✅ Resultado general · 9 pruebas aprobadas</strong></summary>

<br>

![Pruebas de Clase 03 aprobadas](./evidencias/clase03/resultado-general/07-tests-clase03-9-passed.png)

</details>

<details>
<summary><strong>📊 Reporte HTML de Playwright</strong></summary>

<br>

![Reporte Playwright Clase 03](./evidencias/clase03/resultado-general/08-reporte-clase03.png)

</details>

---

## Laboratorio 04 · Actions y flujo funcional en Playwright

> Objetivo: validar flujos funcionales reales de usuario con registro, login, carrito y formularios interactivos.

### Desarrollo del laboratorio

Este laboratorio integró acciones de usuario reales sobre la aplicación, incluyendo registro, autenticación, navegación al carrito y el uso de formularios interactivos para validar comportamientos funcionales completos.

### Pruebas implementadas

| # | Prueba | Estado |
|---|---|---|
| 1 | Registrar un nuevo usuario | ✅ |
| 2 | Login con usuario registrado | ✅ |
| 3 | Flujo login → carrito | ✅ |
| 4 | Login con credenciales incorrectas | ✅ |
| 5 | Reto 1: formulario Place Order | ✅ |
| 6 | Reto 2: cerrar modal con Close y .last() | ✅ |
| 7 | Reto 3: clear() y inputValue() | ✅ |

### Ejecutar laboratorio

```bash
npx playwright test tests/clase04.spec.ts
```

### Evidencias

<details>
<summary><strong>📸 Test 1 · Registrar un nuevo usuario</strong></summary>

<br>

![Registro de usuario](./evidencias/clase04/test01-registro/registro-llenado.png)

</details>

<details>
<summary><strong>📸 Test 2 · Login con usuario registrado</strong></summary>

<br>

![Login exitoso](./evidencias/clase04/test02-login/login-exitoso.png)

</details>

<details>
<summary><strong>📸 Test 3 · Login → agregar producto → verificar carrito</strong></summary>

<br>

![Carrito con producto](./evidencias/clase04/test03-carrito/carrito-con-producto.png)

</details>

<details>
<summary><strong>📸 Test 4 · Login con credenciales incorrectas</strong></summary>

<br>

![Login incorrecto](./evidencias/clase04/test04-login-incorrecto/login-incorrecto.png)

</details>

<details>
<summary><strong>📸 Test 5 · Reto 1 - formulario Place Order con fill()</strong></summary>

<br>

![Place Order con fill()](./evidencias/clase04/test05-reto1/reto1-place-order.png)

</details>

<details>
<summary><strong>📸 Test 6 · Reto 2 - cerrar modal con Close y .last()</strong></summary>

<br>

![Modal cerrado](./evidencias/clase04/test06-reto2/reto2-modal-cerrado.png)

</details>

<details>
<summary><strong>📸 Test 7 · Reto 3 - clear() + inputValue()</strong></summary>

<br>

![Clear y inputValue](./evidencias/clase04/test07-reto3/reto3-clear.png)

</details>

<details>
<summary><strong>✅ Resultado general · 7 pruebas aprobadas</strong></summary>

<br>

![Clase 04 - 7 pruebas aprobadas](./evidencias/clase04/resultado-general/08-clase04-7-tests-passed.png)

</details>

<details>
<summary><strong>📊 Reporte HTML de Playwright · Clase 04</strong></summary>

<br>

![Reporte HTML Playwright Clase 04](./evidencias/clase04/resultado-general/09-reporte-clase04.png)

</details>

---

## Laboratorio 06 · Page Object Model (POM) en Sauce Demo

> Objetivo: implementar el patrón Page Object Model (POM) en Playwright para organizar las pruebas de forma mantenible y escalable, extendiendo la automatización a nuevos flujos de Sauce Demo.

### Desarrollo del laboratorio

En este laboratorio se reorganizaron las pruebas automatizadas mediante el patrón Page Object Model (POM), separando los selectores y las acciones de cada página de la lógica principal de los tests.

Se implementaron los Page Objects base `LoginPage`, `InventoryPage` y `CartPage`. Como parte de los retos de la Clase 06 se agregaron `CheckoutPage` y `MenuPage`, además del método `removeProductByName()` dentro de `InventoryPage`.

Con esta estructura se automatizaron flujos de autenticación, inventario, carrito, ordenamiento de productos, checkout completo, cierre de sesión y eliminación de productos.

### Pruebas implementadas

| # | Prueba | Estado |
|---|---|---|
| 1 | Login exitoso con POM | ✅ |
| 2 | Login fallido con POM | ✅ |
| 3 | Agregar 2 productos y verificar carrito | ✅ |
| 4 | Verificar que el inventario tiene 6 productos | ✅ |
| 5 | Ordenar productos de mayor a menor precio | ✅ |
| 6 | Reto 1: completar una compra de principio a fin | ✅ |
| 7 | Reto 2: cerrar sesión desde el menú hamburguesa | ✅ |
| 8 | Reto 3: quitar producto y verificar que el badge desaparece al llegar a 0 | ✅ |

### Page Objects implementados

```text
pages/
├── LoginPage.ts
├── InventoryPage.ts
├── CartPage.ts
├── CheckoutPage.ts
└── MenuPage.ts
```

### Ejecutar laboratorio

```bash
npx playwright test tests/clase06.spec.ts
```

Para visualizar la ejecución en el navegador:

```bash
npx playwright test tests/clase06.spec.ts --headed
```

### Evidencias

<details>
<summary><strong>📸 Test 1 · Login exitoso con POM</strong></summary>

<br>

![Login exitoso con POM](./evidencias/clase06/test01/01-login-exitoso.png)

</details>

<details>
<summary><strong>📸 Test 2 · Login fallido con POM</strong></summary>

<br>

![Login fallido con POM](./evidencias/clase06/test02/02-login-fallido.png)

</details>

<details>
<summary><strong>📸 Test 3 · Agregar 2 productos y verificar carrito</strong></summary>

<br>

![Carrito con 2 productos](./evidencias/clase06/test03/03-carrito-2-productos.png)

</details>

<details>
<summary><strong>📸 Test 4 · Inventario con 6 productos</strong></summary>

<br>

![Inventario con 6 productos](./evidencias/clase06/test04/04-inventario-6-productos.png)

</details>

<details>
<summary><strong>📸 Test 5 · Ordenar productos de mayor a menor precio</strong></summary>

<br>

![Productos ordenados de mayor a menor](./evidencias/clase06/test05/05-orden-mayor-menor.png)

</details>

<details>
<summary><strong>📸 Test 6 · Reto 1 - Checkout completo</strong></summary>

<br>

![Checkout completado](./evidencias/clase06/test06/06-checkout-completado.png)

</details>

<details>
<summary><strong>📸 Test 7 · Reto 2 - Logout desde menú hamburguesa</strong></summary>

<br>

![Logout exitoso](./evidencias/clase06/test07/07-logout-exitoso.png)

</details>

<details>
<summary><strong>📸 Test 8 · Reto 3 - Eliminar producto y verificar badge</strong></summary>

<br>

![Producto eliminado](./evidencias/clase06/test08/08-producto-eliminado.png)

</details>

<details>
<summary><strong>✅ Resultado general · 8 pruebas aprobadas</strong></summary>

<br>

![Clase 06 - 8 pruebas aprobadas](./evidencias/clase06/resultado-general/01-clase06-8-tests-passed.png)

</details>

<details>
<summary><strong>📊 Reporte HTML de Playwright · Clase 06</strong></summary>

<br>

![Reporte HTML Playwright Clase 06](./evidencias/clase06/resultado-general/10-reporte-clase06.png)

</details>

---

## Laboratorio 07 · Roles QA + Error, Defecto y Fallo + Evidencias avanzadas

> Objetivo: distinguir error, defecto y fallo; comprender los atributos de calidad ISO/IEC 25010; y generar evidencia profesional de pruebas con screenshots, videos y trazas (traces).

### Conceptos aplicados

| Concepto | Aplicación en este laboratorio |
|---|---|
| **Error** | Se introdujo deliberadamente una aserción incorrecta (`toHaveText('2')`) para simular la causa raíz. |
| **Defecto** | La línea de código quedó en el test, incorrecta pero sin haberse ejecutado todavía. |
| **Fallo** | Al ejecutar el test, la aserción falla y Playwright captura la evidencia automáticamente. |
| **ISO/IEC 25010** | Los tests cubren principalmente *Adecuación funcional*, y apoyan *Usabilidad* y *Fiabilidad* mediante evidencia reproducible. |

El ciclo completo de este razonamiento —y su evidencia— está documentado en **[reportes/DR-001.md](#reporte-de-defecto--dr-001)**.

### Desarrollo del laboratorio

Reutilizando los Page Objects `LoginPage` e `InventoryPage` de la Clase 06, se construyeron 4 tests en `tests/clase07.spec.ts` enfocados en documentar visualmente cada flujo: capturas antes/después del login, el recorrido completo de compra, el momento exacto de un defecto esperado (usuario bloqueado) y una comparación de estados antes/después de una acción.

Como tarea de la clase, se agregaron 3 tests reto en `tests/tarea07.spec.ts` con técnicas de evidencia **no vistas en el laboratorio**: pasos nombrados con `test.step()`, adjuntos de datos con `testInfo.attach()`, y comparación visual contra una imagen baseline con `toHaveScreenshot()`.

Adicionalmente, se activó la configuración completa de evidencias en `playwright.config.ts` (`screenshot: 'on'`, `video: 'on'`, `trace: 'on'`) y el reporter `html`, necesario para inspeccionar todo con `npx playwright show-report`.

### Pruebas implementadas — `tests/clase07.spec.ts`

| # | Prueba | Evidencia generada | Estado |
|---|---|---|---|
| 1 | Login exitoso - evidencia completa | Screenshot antes y después del login | ✅ |
| 2 | Documentar el flujo de compra completo | Screenshots de inventario, producto agregado y carrito | ✅ |
| 3 | Capturar el momento exacto de un defecto esperado | Screenshot del elemento de error (usuario bloqueado) | ✅ |
| 4 | Comparar estados antes y después de una acción | Screenshots del badge del carrito antes/después | ✅ |

### Tests reto — `tests/tarea07.spec.ts` (evidencias avanzadas)

| # | Reto | Técnica | Qué demuestra | Estado |
|---|---|---|---|---|
| 1 | Login estructurado en pasos | `test.step()` | Cada paso (navegar, login, verificar) aparece por separado en el reporte y el trace | ✅ |
| 2 | Adjuntar datos capturados | `testInfo.attach()` | Adjunta un `.txt` con cantidad de productos, URL y fecha directo al reporte HTML | ✅ |
| 3 | Comparación visual del inventario | `toHaveScreenshot()` | Compara pixel a pixel contra un baseline versionado en el repo | ✅ |

> El baseline del Reto 3 vive en [`tests/tarea07.spec.ts-snapshots/inventario-baseline-chromium-win32.png`](./tests/tarea07.spec.ts-snapshots/inventario-baseline-chromium-win32.png) y debe comitearse junto con el test — es la referencia contra la que se compararán las corridas futuras.

### Ejecutar laboratorio

```bash
# Tests del laboratorio (Clase 07)
npx playwright test tests/clase07.spec.ts

# Tests reto (Tarea 07)
npx playwright test tests/tarea07.spec.ts

# Primera vez que corres el Reto 3 en otra máquina: genera el baseline
npx playwright test tests/tarea07.spec.ts --update-snapshots
```

### Analizar el reporte y el Trace Viewer

```bash
npx playwright show-report
```

Desde el reporte HTML se puede: ver el estado (pass/fail) de cada test, revisar los screenshots automáticos, reproducir el video de la ejecución y abrir el **Trace Viewer** (enlace "Trace" en cada test) para ver, paso a paso, el timeline de acciones, screenshots intermedios, requests de red y logs de consola — la evidencia más completa que genera Playwright.

### Evidencias

<details>
<summary><strong>📸 Test 1 · Login antes / después</strong></summary>

<br>

![Antes del login](./evidencias/clase07/clase07-antes-login.png)

![Después del login](./evidencias/clase07/clase07-despues-login.png)

</details>

<details>
<summary><strong>📸 Test 2 · Flujo de compra completo</strong></summary>

<br>

![Inventario](./evidencias/clase07/t02-inventario.png)

![Producto agregado](./evidencias/clase07/t02-producto-agregado.png)

![Carrito](./evidencias/clase07/t02-carrito.png)

</details>

<details>
<summary><strong>📸 Test 3 · Defecto esperado (usuario bloqueado)</strong></summary>

<br>

![Error usuario bloqueado](./evidencias/clase07/t03-error-usuario-bloqueado.png)

</details>

<details>
<summary><strong>📸 Test 4 · Estado antes / después del badge</strong></summary>

<br>

![Estado antes](./evidencias/clase07/t04-estado-antes.png)

![Estado después](./evidencias/clase07/t04-estado-despues.png)

</details>

<details>
<summary><strong>🖼️ Reto 3 · Baseline visual del inventario (toHaveScreenshot)</strong></summary>

<br>

![Baseline inventario](./tests/tarea07.spec.ts-snapshots/inventario-baseline-chromium-win32.png)

</details>

---

## Reporte de defecto · DR-001

Como parte del laboratorio se simuló un defecto real siguiendo el ciclo completo de detección → evidencia → documentación: se forzó un valor incorrecto en una aserción, se ejecutó la suite, se capturó la evidencia del fallo (screenshot, video y trace) y finalmente se revirtió el cambio, confirmando que era un defecto simulado y no un bug real del sitio.

| Campo | Valor |
|---|---|
| **Título** | El badge del carrito no incrementa a "2" tras agregar un solo producto |
| **Severidad / Prioridad** | Media / Media |
| **Resultado esperado** | `"2"` (valor forzado a propósito en el test) |
| **Resultado obtenido** | `"1"` (comportamiento real y correcto del sitio) |
| **Evidencia** | [`evidencias/clase07/DR-001-fallo-badge.png`](./evidencias/clase07/DR-001-fallo-badge.png) + video y trace generados automáticamente |
| **Estado** | Cerrado — cambio revertido, test vuelve a pasar |

📄 Reporte completo: **[reportes/DR-001.md](./reportes/DR-001.md)**

<details>
<summary><strong>📸 Evidencia del fallo simulado</strong></summary>

<br>

![Fallo simulado del badge](./evidencias/clase07/DR-001-fallo-badge.png)

</details>

---

## Evidencias destacadas

La organización de las capturas se realizó de forma estructurada por clase y por prueba, con el propósito de conservar de manera ordenada las evidencias generadas durante la ejecución de cada laboratorio.

- [Evidencias Clase 01](./evidencias/clase01)
- [Evidencias Clase 02](./evidencias/clase02)
- [Evidencias Clase 03](./evidencias/clase03)
- [Evidencias Clase 04](./evidencias/clase04)
- [Evidencias Clase 06](./evidencias/clase06)
- [Evidencias Clase 07](./evidencias/clase07)
- [Baseline visual — Tarea 07](./tests/tarea07.spec.ts-snapshots)
- [Reportes de defectos](./reportes)

---

## Estructura del proyecto

```text
QA-PLAYWRIGHT-CURSO
├── casos-de-prueba/
│   └── TC-001.md
├── evidencias/
│   ├── clase01/
│   ├── clase02/
│   ├── clase03/
│   ├── clase04/
│   ├── clase06/
│   └── clase07/
│       └── DR-001-fallo-badge.png
├── pages/
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── MenuPage.ts
├── reportes/
│   └── DR-001.md
├── tareas/
│   └── tarea-04.md
├── tests/
│   ├── clase01.spec.ts
│   ├── clase02.spec.ts
│   ├── clase03.spec.ts
│   ├── clase04.spec.ts
│   ├── clase06.spec.ts
│   ├── clase07.spec.ts
│   ├── tarea07.spec.ts
│   └── tarea07.spec.ts-snapshots/
│       └── inventario-baseline-chromium-win32.png
├── package.json
├── playwright.config.ts
├── README.md
└── tsconfig.json
```

---

## Ejecución

### Instalación

```bash
npm install
npx playwright install chromium
```

### Ejecutar todas las pruebas

```bash
npx playwright test
```

### Abrir reporte HTML

```bash
npx playwright show-report
```

---

## Documentación adicional

- [Caso de prueba TC-001](./casos-de-prueba/TC-001.md)
- [Tarea 04](./tareas/tarea-04.md)
- [Reporte de defecto DR-001](./reportes/DR-001.md)

---

## Conclusión

Este proyecto evidencia la aplicación práctica de pruebas automatizadas con Playwright en un entorno académico, fortaleciendo la trazabilidad, la documentación y la validación funcional de aplicaciones web reales como DemoBlaze y Sauce Demo.

A partir de la Clase 07, el proyecto suma una dimensión de **calidad profesional del proceso de pruebas**: evidencia completa y reproducible (screenshots, videos, trazas), técnicas avanzadas de reporte (`test.step()`, `testInfo.attach()`, `toHaveScreenshot()`) y documentación formal de defectos bajo la cadena causal Error → Defecto → Fallo — llevando el repositorio de "tests que pasan" a "tests que además comunican y documentan calidad".
