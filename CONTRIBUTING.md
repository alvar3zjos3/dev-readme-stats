# Contribuyendo a [dev-readme-stats](https://github.com/alvar3zjos3/dev-readme-stats)

¡Amamos tu aporte! Queremos hacer que contribuir a este proyecto sea tan fácil y transparente como posible, ya sea:

-   Reportando [un problema](https://github.com/https://github.com/alvar3zjos3/dev-readme-stats/issues/new?assignees=&labels=bug&template=bug_report.yml).
-   [Discutiendo](https://github.com/https://github.com/alvar3zjos3/dev-readme-stats/discussions) el estado actual del código.
-   Enviando [una corrección](https://github.com/https://github.com/alvar3zjos3/dev-readme-stats/compare).
-   Proponiendo [nuevas funciones](https://github.com/https://github.com/alvar3zjos3/dev-readme-stats/issues/new?assignees=&labels=enhancement&template=feature_request.yml).
-   Volviéndose un mantenedor.

## Todos los Cambios Ocurren a Través de Pull Requests

Los pull requests son la mejor manera de proponer cambios. Activamente damos la bienvenida a tus pull requests:

1.  Haz fork del repositorio y crea tu rama desde `master`.
2.  Si has agregado código que debe ser probado, agrega algunas pruebas de ejemplo.
3.  Si has cambiado APIs, actualiza la documentación.
4.  ¡Envía ese pull request!

## Desarrollo Local

Para ejecutar & probar github-readme-stats, necesitas seguir unos pocos pasos simples:-
_(asegúrate de que ya tengas una cuenta [Vercel](https://vercel.com/))_

1.  Instala [Vercel CLI](https://vercel.com/download).
2.  Haz fork del repositorio y clona el código a tu máquina local.
3.  Ejecuta `npm install` en la raíz del repositorio.
4.  Ejecuta el comando `vercel` en la raíz y sigue los pasos allí.
5.  Ejecuta el comando `vercel dev` para iniciar un servidor de desarrollo en <http://localhost:3000>.
6.  Crea un archivo `.env` en la raíz y agrega la siguiente línea `NODE_ENV=development`, esto deshabilitará la caché para el desarrollo local.
7.  Las tarjetas estarán disponibles desde este punto final local (es decir, `http://localhost:3000/api?username=alvar3zjos3`).

> [!NOTE]
> Puedes depurar el código del paquete en [Vscode](https://code.visualstudio.com/) usando la opción de depuración [Node.js: Attach to process](https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_setting-up-an-attach-configuration). También puedes depurar cualquier prueba usando la [extensión VSCode Jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest). Para más información, ve https://github.com/jest-community/vscode-jest/issues/912.

## Contribución de Temas

Actualmente hemos pausado la adición de nuevos temas para disminuir los esfuerzos de mantenimiento. Todos los pull requests relacionados con nuevos temas serán cerrados.

> [!NOTE]
> Si estás considerando contribuir tu tema solo porque lo usas personalmente, entonces en lugar de agregarlo a nuestra colección de temas, puedes usar las opciones de [personalización](./readme.md#customization) de la tarjeta.

## Contribución de Traducciones

Dev Readme Stats soporta múltiples idiomas, si nos falta tu idioma, ¡puedes contribuir! Puedes verificar los idiomas actualmente soportados [aquí](./readme.md#available-locales).

Para contribuir con tu idioma necesitas editar el archivo [src/translations.js](./src/translations.js) y agregar nueva propiedad a cada objeto donde la clave es el código de lenguaje en [estándar ISO 639-1](https://www.andiamo.co.uk/resources/iso-language-codes/) y el valor es la cadena traducida.

## Cualquier contribución que hagas estará bajo la Licencia MIT de Software

En resumen, cuando envías cambios, se entiende que tus aportes están bajo la misma [Licencia MIT](https://choosealicense.com/licenses/mit/) que cubre el proyecto. No dudes en contactar a los mantenedores si eso es una preocupación.

## Reporta problemas/bugs usando GitHub's [issues](https://github.com/https://github.com/alvar3zjos3/dev-readme-stats/issues)

Usamos issues de GitHub para rastrear bugs públicos. Reporta un bug abriendo [un nuevo issue](https://github.com/https://github.com/alvar3zjos3/dev-readme-stats/issues/new/choose); ¡es tan fácil!

## Preguntas Frecuentes (FAQs)

**P:** ¿Cómo ocultar Jupyter Notebook?

> **R:** &hide=jupyter%20notebook

**P:** No pude averiguar cómo desplegar en mi propia instancia de Vercel

> **R:**
>
> -   docs: <https://github.com/alvar3zjos3/dev-readme-stats?tab=readme-ov-file#auto-alojado-vercelotro>

**P:** ¿Cómo contar estadísticas privadas?

> **R:** Solo podemos contar commits públicos & no podemos acceder a ninguna otra información privada de ningún usuario, por lo que no es posible. La única manera de contar tus estadísticas personales privadas es desplegar en tu propia instancia y usar tu propio PAT (Personal Access Token)

### Reportes de Bugs

**Grandes Reportes de Bugs** tienden a tener:

-   Un resumen rápido y/o antecedentes
-   Pasos para reproducir
    -   ¡Sé específico!
    -   Comparte la captura, si es posible.
    -   Enlace en vivo de GitHub Readme Stats
-   Lo que realmente sucede
-   Lo que esperabas que sucediera
-   Notas (posiblemente incluyendo por qué crees que esto podría estar ocurriendo o cosas que probaste que no funcionaron)

La gente _ama_ los informes detallados de bugs. No estoy ni bromeando.

### Solicitud de Funcionalidad

**Grandes Solicitudes de Funcionalidades** tienden a tener:

-   Un resumen rápido de la idea
-   Qué y por qué quieres agregar la funcionalidad específica
-   Contexto adicional como imágenes, enlaces a recursos para implementar la función, etc.
