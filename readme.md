<div align="center">
  <h1 style="font-size: 28px; margin: 10px 0;">Dev Readme Stats</h1>
  <p>Genera tarjetas dinámicas con métricas de commits, repositorios y lenguajes para integrarlas en archivos README!</p>
</div>

<p align="center">
  <a href="https://github.com/alvar3zjos3/dev-readme-stats/actions">
    <img alt="Tests Pasando" src="https://github.com/alvar3zjos3/dev-readme-stats/workflows/Test/badge.svg" />
  </a>
  <a href="https://github.com/alvar3zjos3/dev-readme-stats/graphs/contributors">
    <img alt="Colaboradores de GitHub" src="https://img.shields.io/github/contributors/alvar3zjos3/dev-readme-stats" />
  </a>
  <a href="https://codecov.io/gh/alvar3zjos3/dev-readme-stats">
    <img alt="Cobertura de Tests" src="https://codecov.io/gh/alvar3zjos3/dev-readme-stats/branch/master/graph/badge.svg" />
  </a>
  <a href="https://github.com/alvar3zjos3/dev-readme-stats/issues">
    <img alt="Issues" src="https://img.shields.io/github/issues/alvar3zjos3/dev-readme-stats?color=0088ff" />
  </a>
  <a href="https://github.com/alvar3zjos3/dev-readme-stats/pulls">
    <img alt="Pull Requests de GitHub" src="https://img.shields.io/github/issues-pr/alvar3zjos3/dev-readme-stats?color=0088ff" />
  </a>
  <a href="https://securityscorecards.dev/viewer/?uri=github.com/alvar3zjos3/dev-readme-stats">
    <img alt="OpenSSF Scorecard" src="https://api.securityscorecards.dev/projects/github.com/alvar3zjos3/dev-readme-stats/badge" />
  </a>
  <br />
  <br />
  <a href="https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss">
    <img src="./powered-by-vercel.svg"/>
  </a>
</p>

<p align="center">
  <a href="#todas-las-demos">Ver Demo</a>
  ·
  <a href="https://github.com/alvar3zjos3/dev-readme-stats/issues/new?assignees=&labels=bug&projects=&template=bug_report.yml">Reportar Bug</a>
  ·
  <a href="https://github.com/alvar3zjos3/dev-readme-stats/issues/new?assignees=&labels=enhancement&projects=&template=feature_request.yml">Solicitar Función</a>
  ·
  <a href="https://github.com/alvar3zjos3/dev-readme-stats/discussions/new?category=q-a">Hacer Pregunta</a>
</p>

<p align="center">¿Te gusta el proyecto? ¡Considera <a href="https://www.paypal.me/alvar3zjos3">donar</a> para ayudar a mejorarlo!</p>

<details>
<summary>Tabla de contenidos (Click para mostrar)</summary>

- [Tarjeta de Estadísticas de GitHub](#tarjeta-de-estadísticas-de-github)
    - [Ocultar estadísticas individuales](#ocultar-estadísticas-individuales)
    - [Mostrar estadísticas adicionales](#mostrar-estadísticas-adicionales)
    - [Mostrar iconos](#mostrar-iconos)
    - [Mostrar commits de un año específico](#mostrar-commits-de-un-año-específico)
    - [Temas](#temas)
    - [Personalización](#personalización)
- [Pins Extra de GitHub](#pins-extra-de-github)
    - [Uso](#uso)
    - [Opciones](#opciones)
    - [Demo](#demo)
- [Pins de Gists de GitHub](#pins-de-gists-de-github)
    - [Uso](#uso-1)
    - [Opciones](#opciones-1)
    - [Demo](#demo-1)
- [Tarjeta de Lenguajes Principales](#tarjeta-de-lenguajes-principales)
    - [Uso](#uso-2)
    - [Opciones](#opciones-2)
    - [Algoritmo de estadísticas de lenguajes](#algoritmo-de-estadísticas-de-lenguajes)
    - [Excluir repositorios individuales](#excluir-repositorios-individuales)
    - [Ocultar lenguajes individuales](#ocultar-lenguajes-individuales)
    - [Mostrar más lenguajes](#mostrar-más-lenguajes)
    - [Diseño compacto](#diseño-compacto)
    - [Diseño de gráfico de dona](#diseño-de-gráfico-de-dona)
    - [Diseño de gráfico de dona vertical](#diseño-de-gráfico-de-dona-vertical)
    - [Diseño de gráfico de tarta](#diseño-de-gráfico-de-tarta)
    - [Ocultar barras de progreso](#ocultar-barras-de-progreso)
    - [Cambiar formato de estadísticas](#cambiar-formato-de-estadísticas)
    - [Demo](#demo-2)
- [Tarjeta de Estadísticas WakaTime](#tarjeta-de-estadísticas-wakatime)
    - [Opciones](#opciones-3)
    - [Demo](#demo-3)
- [Todas las Demos](#todas-las-demos)
  - [Consejo Rápido (Alinear Tarjetas)](#consejo-rápido-alinear-tarjetas)
    - [Tarjetas de estadísticas y lenguajes](#tarjetas-de-estadísticas-y-lenguajes)
    - [Pinear repositorios](#pinear-repositorios)
- [Desplegar tu propia instancia (recomendado)](#desplegar-tu-propia-instancia-recomendado)
  - [GitHub Actions](#github-actions)
  - [Auto-alojado (Vercel/Otro)](#auto-alojado-vercelotro)
    - [Primer paso: obtener tu Token de Acceso Personal (PAT)](#primer-paso-obtener-tu-token-de-acceso-personal-pat)
    - [En Vercel](#en-vercel)
    - [En otras plataformas](#en-otras-plataformas)
    - [Variables de entorno disponibles](#variables-de-entorno-disponibles)
  - [Mantener tu fork actualizado](#mantener-tu-fork-actualizado)
</details>

# Avisos Importantes <!-- omit in toc -->

> [!IMPORTANT]
> La instancia pública de Vercel en `https://dev-readme-stats.vercel.app/api` funciona con el mejor esfuerzo posible y puede ser poco fiable debido a los límites de velocidad y picos de tráfico. Usamos caché para mejorar la estabilidad (ver [opciones comunes](#opciones-comunes)), pero para tarjetas fiables recomendamos [auto-alojamiento](#desplegar-tu-propia-instancia-recomendado) (Vercel u otro) o usar el [flujo de trabajo de GitHub Actions](#github-actions) para generar tarjetas en tu [repositorio de perfil](https://docs.github.com/es/account-and-profile/how-tos/profile-customization/managing-your-profile-readme).

<img alt="Badge de Uptime" src="https://img.shields.io/endpoint?url=https%3A%2F%2Fdev-readme-stats.vercel.app%2Fapi%2Fstatus%2Fup%3Ftype%3Dshields">

> [!IMPORTANT]
> Somos un equipo pequeño y para priorizar dependemos de los votos positivos :+1:. No dudes en votar a favor de los issues y pull requests que te interesen. Trabajaremos primero en los que más votos tengan.

# Tarjeta de Estadísticas de GitHub

Copia y pega esto en tu markdown, ¡y listo!

Cambia el valor de `?username=` por tu nombre de usuario de GitHub.

```md
[![Estadísticas GitHub de Alvarez](https://dev-readme-stats.vercel.app/api?username=alvar3zjos3)](https://github.com/alvar3zjos3/dev-readme-stats)
```

> [!WARNING]
> Por defecto, la tarjeta de estadísticas solo muestra estadísticas de repositorios públicos como estrellas, commits y pull requests. Para mostrar estadísticas privadas debes [desplegar tu propia instancia](#desplegar-tu-propia-instancia-recomendado) con tu propio token de la API de GitHub.

> [!NOTE]
> Los rangos disponibles son S (top 1%), A+ (12.5%), A (25%), A- (37.5%), B+ (50%), B (62.5%), B- (75%), C+ (87.5%) y C (todos). Este esquema de clasificación está basado en el [sistema de calificación académica japonés](https://wikipedia.org/wiki/Academic_grading_in_Japan). El percentil global se calcula como una suma ponderada de percentiles para cada estadística (número de commits, pull requests, revisiones, issues, estrellas y seguidores). El círculo alrededor del rango muestra 100 menos el percentil global.

### Ocultar estadísticas individuales

Puedes pasar el parámetro `&hide=` para ocultar estadísticas específicas con valores separados por comas.

> Opciones: `&hide=stars,commits,prs,issues,contribs`

```md
![Estadísticas GitHub de Alvarez](https://dev-readme-stats.vercel.app/api?username=alvar3zjos3&hide=contribs,prs)
```

### Mostrar estadísticas adicionales

Puedes pasar el parámetro `&show=` para mostrar estadísticas adicionales con valores separados por comas.

> Opciones: `&show=reviews,discussions_started,discussions_answered,prs_merged,prs_merged_percentage`

```md
![Estadísticas GitHub de Alvarez](https://dev-readme-stats.vercel.app/api?username=alvar3zjos3&show=reviews,discussions_started,discussions_answered,prs_merged,prs_merged_percentage)
```

### Mostrar iconos

Para activar los iconos, pasa `&show_icons=true` en el parámetro de consulta:

```md
![Estadísticas GitHub de Alvarez](https://dev-readme-stats.vercel.app/api?username=alvar3zjos3&show_icons=true)
```

### Mostrar commits de un año específico

Puedes especificar un año y obtener solo los commits realizados ese año pasando `&commits_year=AAAA`:

```md
![Estadísticas GitHub de Alvarez](https://dev-readme-stats.vercel.app/api?username=alvar3zjos3&commits_year=2024)
```

### Temas

Con los temas integrados puedes personalizar el aspecto de la tarjeta sin hacer ninguna [personalización manual](#personalización).

Usa el parámetro `&theme=NOMBRE_TEMA`:

```md
![Estadísticas GitHub de Alvarez](https://dev-readme-stats.vercel.app/api?username=alvar3zjos3&show_icons=true&theme=radical)
```

#### Todos los temas integrados

Dev Readme Stats viene con varios temas integrados (p. ej. `dark`, `radical`, `merko`, `gruvbox`, `tokyonight`, `onedark`, `cobalt`, `synthwave`, `highcontrast`, `dracula`).

Puedes ver una vista previa de [todos los temas disponibles](themes/README.md) o consultar el [archivo de configuración de temas](themes/index.js).

#### Tema Responsivo

[![Estadísticas GitHub de Alvarez - Oscuro](https://dev-readme-stats.vercel.app/api?username=alvar3zjos3\&show_icons=true\&theme=dark#gh-dark-mode-only)](https://github.com/alvar3zjos3/dev-readme-stats#gh-dark-mode-only)
[![Estadísticas GitHub de Alvarez - Claro](https://dev-readme-stats.vercel.app/api?username=alvar3zjos3\&show_icons=true\&theme=default#gh-light-mode-only)](https://github.com/alvar3zjos3/dev-readme-stats#gh-light-mode-only)

Como GitHub re-sube las tarjetas y las sirve desde su [CDN](https://docs.github.com/es/authentication/keeping-your-account-and-data-secure/about-anonymized-urls), no podemos inferir el tema del navegador en el lado del servidor. Sin embargo, hay cuatro métodos para crear temas dinámicos en el lado del cliente.

##### Usar el tema transparente

Hemos incluido un tema `transparent` con fondo transparente, optimizado para verse bien tanto en el tema oscuro como en el claro de GitHub:

```md
![Estadísticas GitHub de Alvarez](https://dev-readme-stats.vercel.app/api?username=alvar3zjos3&show_icons=true&theme=transparent)
```

<details>
<summary>Ver ejemplo</summary>

![Estadísticas GitHub de Alvarez](https://dev-readme-stats.vercel.app/api?username=alvar3zjos3\&show_icons=true\&theme=transparent)

</details>

##### Añadir canal alfa transparente al bg\_color del tema

Puedes usar el parámetro `bg_color` para hacer cualquier tema transparente estableciendo el color con un canal alfa transparente (p. ej. `bg_color=00000000`):

```md
![Estadísticas GitHub de Alvarez](https://dev-readme-stats.vercel.app/api?username=alvar3zjos3&show_icons=true&bg_color=00000000)
```

<details>
<summary>Ver ejemplo</summary>

![Estadísticas GitHub de Alvarez](https://dev-readme-stats.vercel.app/api?username=alvar3zjos3\&show_icons=true\&bg_color=00000000)

</details>

##### Usar la etiqueta de contexto de tema de GitHub

Puedes usar las [etiquetas de contexto de tema de GitHub](https://github.blog/changelog/2021-11-24-specify-theme-context-for-images-in-markdown/) añadiendo `#gh-dark-mode-only` o `#gh-light-mode-only` al final de la URL de la imagen:

```md
[![Estadísticas GitHub de Alvarez - Oscuro](https://dev-readme-stats.vercel.app/api?username=alvar3zjos3&show_icons=true&theme=dark#gh-dark-mode-only)](https://github.com/alvar3zjos3/dev-readme-stats#gh-dark-mode-only)
[![Estadísticas GitHub de Alvarez - Claro](https://dev-readme-stats.vercel.app/api?username=alvar3zjos3&show_icons=true&theme=default#gh-light-mode-only)](https://github.com/alvar3zjos3/dev-readme-stats#gh-light-mode-only)
```

<details>
<summary>Ver ejemplo</summary>

[![Estadísticas GitHub de Alvarez - Oscuro](https://dev-readme-stats.vercel.app/api?username=alvar3zjos3\&show_icons=true\&theme=dark#gh-dark-mode-only)](https://github.com/alvar3zjos3/dev-readme-stats#gh-dark-mode-only)
[![Estadísticas GitHub de Alvarez - Claro](https://dev-readme-stats.vercel.app/api?username=alvar3zjos3\&show_icons=true\&theme=default#gh-light-mode-only)](https://github.com/alvar3zjos3/dev-readme-stats#gh-light-mode-only)

</details>

##### Usar la nueva función de medios de GitHub

Puedes usar la [nueva función de medios de GitHub](https://github.blog/changelog/2022-05-19-specify-theme-context-for-images-in-markdown-beta/) en HTML con el elemento `<picture>` y la función `prefers-color-scheme`:

```html
<picture>
  <source
    srcset="https://dev-readme-stats.vercel.app/api?username=alvar3zjos3&show_icons=true&theme=dark"
    media="(prefers-color-scheme: dark)"
  />
  <source
    srcset="https://dev-readme-stats.vercel.app/api?username=alvar3zjos3&show_icons=true"
    media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
  />
  <img src="https://dev-readme-stats.vercel.app/api?username=alvar3zjos3&show_icons=true" />
</picture>
```

<details>
<summary>Ver ejemplo</summary>

<picture>
  <source
    srcset="https://dev-readme-stats.vercel.app/api?username=alvar3zjos3&show_icons=true&theme=dark"
    media="(prefers-color-scheme: dark)"
  />
  <source
    srcset="https://dev-readme-stats.vercel.app/api?username=alvar3zjos3&show_icons=true"
    media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
  />
  <img src="https://dev-readme-stats.vercel.app/api?username=alvar3zjos3&show_icons=true" />
</picture>

</details>

### Personalización

Puedes personalizar el aspecto de todas tus tarjetas con parámetros de URL.

#### Opciones Comunes

| Nombre | Descripción | Tipo | Valor por defecto |
| --- | --- | --- | --- |
| `title_color` | Color del título de la tarjeta. | string (color hex) | `2f80ed` |
| `text_color` | Color del texto del cuerpo. | string (color hex) | `434d58` |
| `icon_color` | Color de los iconos si están disponibles. | string (color hex) | `4c71f2` |
| `border_color` | Color del borde de la tarjeta. No aplica cuando `hide_border` está activado. | string (color hex) | `e4e2e2` |
| `bg_color` | Color de fondo de la tarjeta. | string (color hex o gradiente en forma de *ángulo,inicio,fin*) | `fffefe` |
| `hide_border` | Oculta el borde de la tarjeta. | boolean | `false` |
| `theme` | Nombre del tema, elige entre [todos los temas disponibles](themes/README.md). | enum | `default` |
| `cache_seconds` | Establece manualmente la cabecera de caché (mín: 21600, máx: 86400). | integer | `21600` |
| `locale` | Establece el idioma de la tarjeta. | enum | `en` |
| `border_radius` | Radio de las esquinas de la tarjeta. | number | `4.5` |

> [!WARNING]
> Usamos caché para reducir la carga en nuestros servidores. Los tiempos de caché por defecto son: tarjeta de estadísticas - 24 horas, tarjeta de lenguajes principales - 144 horas (6 días), tarjeta pin - 240 horas (10 días), tarjeta gist - 48 horas (2 días) y tarjeta wakatime - 24 horas. Si quieres que los datos se actualicen más frecuentemente puedes [desplegar tu propia instancia](#desplegar-tu-propia-instancia-recomendado) y establecer la variable de entorno `CACHE_SECONDS` con el valor que desees.

##### Degradado en bg\_color

Puedes proporcionar múltiples valores separados por comas en la opción `bg_color` para renderizar un degradado con el siguiente formato:

    &bg_color=GRADO,COLOR1,COLOR2,COLOR3...COLOR10

##### Idiomas disponibles

Lista de todos los idiomas disponibles:

<table>
<tr><td>

| Código | Idioma |
| --- | --- |
| `ar` | Árabe |
| `az` | Azerbaiyano |
| `bn` | Bengalí |
| `bg` | Búlgaro |
| `my` | Birmano |
| `ca` | Catalán |
| `cn` | Chino |
| `zh-tw` | Chino (Taiwán) |
| `cs` | Checo |
| `nl` | Holandés |
| `en` | Inglés |
| `fil` | Filipino |
| `fi` | Finlandés |
| `fr` | Francés |
| `de` | Alemán |
| `el` | Griego |

</td><td>

| Código | Idioma |
| --- | --- |
| `he` | Hebreo |
| `hi` | Hindi |
| `hu` | Húngaro |
| `id` | Indonesio |
| `it` | Italiano |
| `ja` | Japonés |
| `kr` | Coreano |
| `ml` | Malayalam |
| `np` | Nepalés |
| `no` | Noruego |
| `fa` | Persa (Farsi) |
| `pl` | Polaco |
| `pt-br` | Portugués (Brasil) |
| `pt-pt` | Portugués (Portugal) |
| `ro` | Rumano |

</td><td>

| Código | Idioma |
| --- | --- |
| `ru` | Ruso |
| `sa` | Sánscrito |
| `sr` | Serbio (Cirílico) |
| `sr-latn` | Serbio (Latino) |
| `sk` | Eslovaco |
| `es` | Español |
| `sw` | Suajili |
| `se` | Sueco |
| `ta` | Tamil |
| `th` | Tailandés |
| `tr` | Turco |
| `uk-ua` | Ucraniano |
| `ur` | Urdu |
| `uz` | Uzbeko |
| `vi` | Vietnamita |

</td></tr>
</table>

#### Opciones Exclusivas de la Tarjeta de Estadísticas

| Nombre | Descripción | Tipo | Valor por defecto |
| --- | --- | --- | --- |
| `hide` | Oculta los [elementos especificados](#ocultar-estadísticas-individuales) de las estadísticas. | string (valores separados por comas) | `null` |
| `hide_title` | Oculta el título de tu tarjeta de estadísticas. | boolean | `false` |
| `card_width` | Establece el ancho de la tarjeta manualmente. | number | `500px (aprox.)` |
| `hide_rank` | Oculta el rango y redimensiona automáticamente el ancho de la tarjeta. | boolean | `false` |
| `rank_icon` | Muestra un icono de rango alternativo (`github`, `percentile` o `default`). | enum | `default` |
| `show_icons` | Muestra iconos junto a todas las estadísticas. | boolean | `false` |
| `include_all_commits` | Cuenta el total de commits en lugar de solo los del año actual. | boolean | `false` |
| `line_height` | Establece el alto de línea entre el texto. | integer | `25` |
| `exclude_repo` | Excluye repositorios específicos. | string (valores separados por comas) | `null` |
| `custom_title` | Establece un título personalizado para la tarjeta. | string | `<usuario> GitHub Stats` |
| `text_bold` | Usa texto en negrita. | boolean | `true` |
| `disable_animations` | Desactiva todas las animaciones de la tarjeta. | boolean | `false` |
| `ring_color` | Color del círculo del rango. | string (color hex) | `2f80ed` |
| `number_format` | Cambia entre dos formatos: `short` (p. ej. `6.6k`) y `long` (p. ej. `6626`). | enum | `short` |
| `show` | Muestra [elementos adicionales](#mostrar-estadísticas-adicionales) en la tarjeta. | string (valores separados por comas) | `null` |
| `commits_year` | Filtra y cuenta solo los commits del año especificado. | integer _(AAAA)_ | `<año actual>` |

***

# Pins Extra de GitHub

Los pins extra de GitHub te permiten pinear más de 6 repositorios en tu perfil usando un README de perfil de GitHub.

### Uso

Copia y pega este código en tu readme y cambia los enlaces.

Endpoint: `api/pin?username=alvar3zjos3&repo=dev-readme-stats`

```md
[![Tarjeta Readme](https://dev-readme-stats.vercel.app/api/pin/?username=alvar3zjos3&repo=dev-readme-stats)](https://github.com/alvar3zjos3/dev-readme-stats)
```

### Opciones

| Nombre | Descripción | Tipo | Valor por defecto |
| --- | --- | --- | --- |
| `show_owner` | Muestra el nombre del propietario del repositorio. | boolean | `false` |
| `description_lines_count` | Establece manualmente el número de líneas para la descripción (entre 1 y 3). | number | `null` |

### Demo

![Tarjeta Readme](https://dev-readme-stats.vercel.app/api/pin/?username=alvar3zjos3\&repo=dev-readme-stats)

Usa la opción `show_owner` para incluir el nombre de usuario del propietario del repositorio

![Tarjeta Readme](https://dev-readme-stats.vercel.app/api/pin/?username=alvar3zjos3\&repo=dev-readme-stats\&show_owner=true)

# Pins de Gists de GitHub

Los pins de Gists de GitHub te permiten pinear gists en tu perfil de GitHub.

### Uso

Copia y pega este código en tu readme y cambia los enlaces.

Endpoint: `api/gist?id=bbfce31e0217a3689c8d961a356cb10d`

```md
[![Tarjeta Gist](https://dev-readme-stats.vercel.app/api/gist?id=bbfce31e0217a3689c8d961a356cb10d)](https://gist.github.com/alvar3zjos3/)
```

### Opciones

| Nombre | Descripción | Tipo | Valor por defecto |
| --- | --- | --- | --- |
| `show_owner` | Muestra el nombre del propietario del gist. | boolean | `false` |

### Demo

![Tarjeta Gist](https://dev-readme-stats.vercel.app/api/gist?id=bbfce31e0217a3689c8d961a356cb10d)

Usa la opción `show_owner` para incluir el nombre de usuario del propietario

![Tarjeta Gist](https://dev-readme-stats.vercel.app/api/gist?id=bbfce31e0217a3689c8d961a356cb10d\&show_owner=true)

# Tarjeta de Lenguajes Principales

La tarjeta de lenguajes principales muestra los lenguajes más utilizados por un usuario de GitHub.

> [!WARNING]
> Por defecto, la tarjeta de lenguajes solo muestra resultados de repositorios públicos. Para incluir lenguajes de repositorios privados, debes [desplegar tu propia instancia](#desplegar-tu-propia-instancia-recomendado) con tu propio token de la API de GitHub.

> [!NOTE]
> Los Lenguajes Principales no indican el nivel de habilidad del usuario; es una métrica de GitHub para determinar qué lenguajes tienen más código en GitHub.

> [!WARNING]
> Esta tarjeta muestra el uso de lenguajes solo dentro de tus propios repositorios no bifurcados, sin importar quién sea el autor de los commits. No incluye tus contribuciones a repositorios de otros usuarios u organizaciones.

> [!WARNING]
> Actualmente esta tarjeta solo muestra datos sobre los primeros 100 repositorios debido a las limitaciones de la API de GitHub.

### Uso

Copia y pega este código en tu readme y cambia los enlaces.

Endpoint: `api/top-langs?username=alvar3zjos3`

```md
[![Lenguajes Principales](https://dev-readme-stats.vercel.app/api/top-langs/?username=alvar3zjos3)](https://github.com/alvar3zjos3/dev-readme-stats)
```

### Opciones

| Nombre | Descripción | Tipo | Valor por defecto |
| --- | --- | --- | --- |
| `hide` | Oculta los [lenguajes especificados](#ocultar-lenguajes-individuales) de la tarjeta. | string (valores separados por comas) | `null` |
| `hide_title` | Oculta el título de tu tarjeta. | boolean | `false` |
| `layout` | Cambia entre cinco diseños: `normal`, `compact`, `donut`, `donut-vertical` y `pie`. | enum | `normal` |
| `card_width` | Establece el ancho de la tarjeta manualmente. | number | `300` |
| `langs_count` | Muestra más lenguajes en la tarjeta, entre 1 y 20. | integer | `5` para `normal` y `donut`, `6` para otros diseños |
| `exclude_repo` | Excluye repositorios específicos. | string (valores separados por comas) | `null` |
| `custom_title` | Establece un título personalizado para la tarjeta. | string | `Most Used Languages` |
| `disable_animations` | Desactiva todas las animaciones de la tarjeta. | boolean | `false` |
| `hide_progress` | Usa el diseño compacto, oculta los porcentajes y elimina las barras. | boolean | `false` |
| `size_weight` | Configura el algoritmo de estadísticas de lenguajes. | integer | `1` |
| `count_weight` | Configura el algoritmo de estadísticas de lenguajes. | integer | `0` |
| `stats_format` | Cambia entre dos formatos: `percentages` y `bytes`. | enum | `percentages` |

### Algoritmo de estadísticas de lenguajes

Usamos el siguiente algoritmo para calcular los porcentajes de lenguajes:

```js
ranking_index = (byte_count ^ size_weight) * (repo_count ^ count_weight)
```

*   `&size_weight=1&count_weight=0` - *(por defecto)* Ordena por recuento de bytes.
*   `&size_weight=0.5&count_weight=0.5` - *(recomendado)* Usa tanto el recuento de bytes como el de repositorios.
*   `&size_weight=0&count_weight=1` - Ordena por recuento de repositorios.

```md
![Lenguajes Principales](https://dev-readme-stats.vercel.app/api/top-langs/?username=alvar3zjos3&size_weight=0.5&count_weight=0.5)
```

### Excluir repositorios individuales

```md
![Lenguajes Principales](https://dev-readme-stats.vercel.app/api/top-langs/?username=alvar3zjos3&exclude_repo=dev-readme-stats,alvar3zjos3.github.io)
```

### Ocultar lenguajes individuales

```md
![Lenguajes Principales](https://dev-readme-stats.vercel.app/api/top-langs/?username=alvar3zjos3&hide=javascript,html)
```

### Mostrar más lenguajes

```md
![Lenguajes Principales](https://dev-readme-stats.vercel.app/api/top-langs/?username=alvar3zjos3&langs_count=8)
```

### Diseño compacto

```md
![Lenguajes Principales](https://dev-readme-stats.vercel.app/api/top-langs/?username=alvar3zjos3&layout=compact)
```

### Diseño de gráfico de dona

```md
[![Lenguajes Principales](https://dev-readme-stats.vercel.app/api/top-langs/?username=alvar3zjos3&layout=donut)](https://github.com/alvar3zjos3/dev-readme-stats)
```

### Diseño de gráfico de dona vertical

```md
[![Lenguajes Principales](https://dev-readme-stats.vercel.app/api/top-langs/?username=alvar3zjos3&layout=donut-vertical)](https://github.com/alvar3zjos3/dev-readme-stats)
```

### Diseño de gráfico de tarta

```md
[![Lenguajes Principales](https://dev-readme-stats.vercel.app/api/top-langs/?username=alvar3zjos3&layout=pie)](https://github.com/alvar3zjos3/dev-readme-stats)
```

### Ocultar barras de progreso

```md
![Lenguajes Principales](https://dev-readme-stats.vercel.app/api/top-langs/?username=alvar3zjos3&hide_progress=true)
```

### Cambiar formato de estadísticas

```md
![Lenguajes Principales](https://dev-readme-stats.vercel.app/api/top-langs/?username=alvar3zjos3&stats_format=bytes)
```

### Demo

![Lenguajes Principales](https://dev-readme-stats.vercel.app/api/top-langs?username=alvar3zjos3&locale=es&hide_title=false&layout=compact&card_width=320&langs_count=11&theme=tokyonight&hide_border=false&order=2)

*   Diseño compacto

![Lenguajes Principales](https://dev-readme-stats.vercel.app/api/top-langs/?username=alvar3zjos3\&layout=compact)

*   Diseño de gráfico de dona

[![Lenguajes Principales](https://dev-readme-stats.vercel.app/api/top-langs/?username=alvar3zjos3\&layout=donut)](https://github.com/alvar3zjos3/dev-readme-stats)

*   Diseño de gráfico de dona vertical

[![Lenguajes Principales](https://dev-readme-stats.vercel.app/api/top-langs/?username=alvar3zjos3\&layout=donut-vertical)](https://github.com/alvar3zjos3/dev-readme-stats)

*   Diseño de gráfico de tarta

[![Lenguajes Principales](https://dev-readme-stats.vercel.app/api/top-langs/?username=alvar3zjos3\&layout=pie)](https://github.com/alvar3zjos3/dev-readme-stats)

*   Barras de progreso ocultas

![Lenguajes Principales](https://dev-readme-stats.vercel.app/api/top-langs/?username=alvar3zjos3\&hide_progress=true)

*   Mostrar bytes en lugar de porcentaje

![Lenguajes Principales](https://dev-readme-stats.vercel.app/api/top-langs/?username=alvar3zjos3\&stats_format=bytes)

# Tarjeta de Estadísticas WakaTime

> [!WARNING]
> Ten en cuenta que actualmente solo mostramos datos de perfiles de WakaTime que sean públicos. Debes asegurarte de que **AMBAS** opciones `Display code time publicly` y `Display languages, editors, os, categories publicly` estén activadas.

> [!WARNING]
> Si acabas de crear una cuenta nueva de WakaTime, puede tardar hasta 24 horas en aparecer tus estadísticas en la tarjeta.

Cambia el valor de `?username=` por tu nombre de usuario de [WakaTime](https://wakatime.com).

```md
[![Estadísticas WakaTime de Alvarez](https://dev-readme-stats.vercel.app/api/wakatime?username=alvar3zjos3)](https://github.com/alvar3zjos3/dev-readme-stats)
```

### Opciones

| Nombre | Descripción | Tipo | Valor por defecto |
| --- | --- | --- | --- |
| `hide` | Oculta los lenguajes especificados de la tarjeta. | string (valores separados por comas) | `null` |
| `hide_title` | Oculta el título de tu tarjeta. | boolean | `false` |
| `card_width` | Establece el ancho de la tarjeta manualmente. | number | `495` |
| `line_height` | Establece el alto de línea entre el texto. | integer | `25` |
| `hide_progress` | Oculta la barra de progreso y el porcentaje. | boolean | `false` |
| `custom_title` | Establece un título personalizado para la tarjeta. | string | `WakaTime Stats` |
| `layout` | Cambia entre dos diseños: `default` y `compact`. | enum | `default` |
| `langs_count` | Limita el número de lenguajes en la tarjeta. | integer | `null` |
| `api_domain` | Establece un dominio de API personalizado para la tarjeta. | string | `wakatime.com` |
| `display_format` | Formato de visualización: `time` para tiempo o `percent` para porcentajes. | enum | `time` |
| `disable_animations` | Desactiva todas las animaciones de la tarjeta. | boolean | `false` |

### Demo

![Estadísticas WakaTime de Alvarez](https://dev-readme-stats.vercel.app/api/wakatime?username=alvar3zjos3)

![Estadísticas WakaTime de Alvarez](https://dev-readme-stats.vercel.app/api/wakatime?username=alvar3zjos3\&hide_progress=true)

*   Diseño compacto

![Estadísticas WakaTime de Alvarez](https://dev-readme-stats.vercel.app/api/wakatime?username=alvar3zjos3\&layout=compact)

***

# Todas las Demos

*   Por defecto

![Estadísticas GitHub de Alvarez](https://dev-readme-stats.vercel.app/api?username=alvar3zjos3&hide_title=false&hide_rank=false&show_icons=true&include_all_commits=true&count_private=true&disable_animations=false&theme=tokyonight&locale=es&hide_border=false&order=1)

*   Ocultar estadísticas específicas

![Estadísticas GitHub de Alvarez](https://dev-readme-stats.vercel.app/api?username=alvar3zjos3\&hide=contribs,issues)

*   Mostrar estadísticas adicionales

![Estadísticas GitHub de Alvarez](https://dev-readme-stats.vercel.app/api?username=alvar3zjos3\&show_icons=true\&show=reviews,discussions_started,discussions_answered,prs_merged,prs_merged_percentage)

*   Mostrar iconos

![Estadísticas GitHub de Alvarez](https://dev-readme-stats.vercel.app/api?username=alvar3zjos3\&hide=issues\&show_icons=true)

*   Mostrar logo de GitHub en lugar del nivel de rango

![Estadísticas GitHub de Alvarez](https://dev-readme-stats.vercel.app/api?username=alvar3zjos3\&rank_icon=github)

*   Mostrar percentil de rango del usuario

![Estadísticas GitHub de Alvarez](https://dev-readme-stats.vercel.app/api?username=alvar3zjos3\&rank_icon=percentile)

*   Personalizar color del borde

![Estadísticas GitHub de Alvarez](https://dev-readme-stats.vercel.app/api?username=alvar3zjos3\&border_color=2e4058)

*   Incluir todos los commits

![Estadísticas GitHub de Alvarez](https://dev-readme-stats.vercel.app/api?username=alvar3zjos3\&include_all_commits=true)

*   Temas

Elige entre cualquiera de los [temas por defecto](#temas)

![Estadísticas GitHub de Alvarez](https://dev-readme-stats.vercel.app/api?username=alvar3zjos3\&show_icons=true\&theme=radical)

*   Degradado

![Estadísticas GitHub de Alvarez](https://dev-readme-stats.vercel.app/api?username=alvar3zjos3\&bg_color=30,e96443,904e95\&title_color=fff\&text_color=fff)

*   Personalizar tarjeta de estadísticas

![Estadísticas GitHub de Alvarez](https://dev-readme-stats.vercel.app/api/?username=alvar3zjos3\&show_icons=true\&title_color=fff\&icon_color=79ff97\&text_color=9f9f9f\&bg_color=151515)

*   Establecer idioma de la tarjeta

![Estadísticas GitHub de Alvarez](https://dev-readme-stats.vercel.app/api/?username=alvar3zjos3\&locale=es)

*   Personalizar tarjeta de repositorio

![Tarjeta Personalizada](https://dev-readme-stats.vercel.app/api/pin?username=alvar3zjos3\&repo=dev-readme-stats\&title_color=fff\&icon_color=f9f9f9\&text_color=9f9f9f\&bg_color=151515)

*   Tarjeta de Gist

![Tarjeta Gist](https://dev-readme-stats.vercel.app/api/gist?id=bbfce31e0217a3689c8d961a356cb10d)

*   Personalizar tarjeta de Gist

![Tarjeta Gist](https://dev-readme-stats.vercel.app/api/gist?id=bbfce31e0217a3689c8d961a356cb10d&theme=calm)

*   Lenguajes principales

![Lenguajes Principales](https://dev-readme-stats.vercel.app/api/top-langs?username=alvar3zjos3&locale=es&hide_title=false&layout=compact&card_width=320&langs_count=11&theme=tokyonight&hide_border=false&order=2)

*   Tarjeta WakaTime

![Estadísticas WakaTime de Alvarez](https://dev-readme-stats.vercel.app/api/wakatime?username=alvar3zjos3)

***

## Consejo Rápido (Alinear Tarjetas)

Por defecto, GitHub no coloca las tarjetas lado a lado. Para hacerlo, puedes usar los siguientes enfoques:

### Tarjetas de estadísticas y lenguajes

```html
<a href="https://github.com/alvar3zjos3/dev-readme-stats">
  <img height=200 align="center" src="https://dev-readme-stats.vercel.app/api?username=alvar3zjos3&hide_title=false&hide_rank=false&show_icons=true&include_all_commits=true&count_private=true&disable_animations=false&theme=tokyonight&locale=es&hide_border=false&order=1" />
</a>
<a href="https://github.com/alvar3zjos3/dev-readme-stats">
  <img height=200 align="center" src="https://dev-readme-stats.vercel.app/api/top-langs?username=alvar3zjos3&locale=es&hide_title=false&layout=compact&card_width=320&langs_count=11&theme=tokyonight&hide_border=false&order=2" />
</a>
```

<details>
<summary>Ver ejemplo</summary>

<a href="https://github.com/alvar3zjos3/dev-readme-stats">
  <img height=200 align="center" src="https://dev-readme-stats.vercel.app/api?username=alvar3zjos3&hide_title=false&hide_rank=false&show_icons=true&include_all_commits=true&count_private=true&disable_animations=false&theme=tokyonight&locale=es&hide_border=false&order=1" />
</a>
<a href="https://github.com/alvar3zjos3/dev-readme-stats">
  <img height=200 align="center" src="https://dev-readme-stats.vercel.app/api/top-langs?username=alvar3zjos3&locale=es&hide_title=false&layout=compact&card_width=320&langs_count=11&theme=tokyonight&hide_border=false&order=2" />
</a>

</details>

### Pinear repositorios

```html
<a href="https://github.com/alvar3zjos3/dev-readme-stats">
  <img align="center" src="https://dev-readme-stats.vercel.app/api/pin/?username=alvar3zjos3&repo=dev-readme-stats" />
</a>
```

<details>
<summary>Ver ejemplo</summary>

<a href="https://github.com/alvar3zjos3/dev-readme-stats">
  <img align="center" src="https://dev-readme-stats.vercel.app/api/pin/?username=alvar3zjos3&repo=dev-readme-stats" />
</a>

</details>

# Desplegar tu propia instancia (recomendado)

Dado que el endpoint público [no es fiable](#avisos-importantes), recomendamos el auto-despliegue mediante GitHub Actions o tu propia instancia alojada. GitHub Actions es la configuración más sencilla con SVGs estáticos almacenados en tu repositorio, mientras que el auto-alojamiento requiere más trabajo pero puede servir estadísticas más recientes (con caché).

## GitHub Actions

GitHub Actions genera SVGs estáticos y evita las llamadas a la API por solicitud. Por defecto usa `GITHUB_TOKEN` (solo estadísticas públicas); para estadísticas privadas, establece un [PAT](https://docs.github.com/es/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) como secreto y pásalo a la acción.

Crea `/.github/workflows/grs.yml` en tu repositorio de perfil (`alvar3zjos3/alvar3zjos3`):

```yaml
name: Actualizar tarjetas del README

on:
  schedule:
    - cron: "0 3 * * *"
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Generar tarjeta de estadísticas
        uses: readme-tools/github-readme-stats-action@v1
        with:
          card: stats
          options: username=${{ github.repository_owner }}&show_icons=true
          path: profile/stats.svg
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Confirmar tarjetas
        run: |
          git config user.name "github-actions"
          git config user.email "github-actions@users.noreply.github.com"
          git add profile/*.svg
          git commit -m "Actualizar tarjetas del README" || exit 0
          git push
```

Luego inclúyelo en tu README de perfil:

```md
![Estadísticas](./profile/stats.svg)
```

## Auto-alojado (Vercel/Otro)

Ejecutar tu propia instancia evita los límites de velocidad públicos y te da control total sobre el caché, tokens y estadísticas privadas.

### Primer paso: obtener tu Token de Acceso Personal (PAT)

Para desplegar tu propia instancia de Dev Readme Stats, necesitarás crear un Token de Acceso Personal (PAT) de GitHub.

#### Token clásico

* Ve a [Cuenta -> Ajustes -> Developer Settings -> Personal access tokens -> Tokens (classic)](https://github.com/settings/tokens).
* Haz clic en `Generate new token -> Generate new token (classic)`.
* Permisos a seleccionar:
  * repo
  * read:user
* Haz clic en `Generate token` y cópialo.

#### Token de grano fino

* Ve a [Cuenta -> Ajustes -> Developer Settings -> Personal access tokens -> Fine-grained tokens](https://github.com/settings/tokens).
* Haz clic en `Generate new token`.
* Selecciona una fecha de vencimiento.
* Selecciona `All repositories`.
* Permisos a seleccionar en `Repository permission`:
  * Commit statuses: read-only
  * Contents: read-only
  * Issues: read-only
  * Metadata: read-only
  * Pull requests: read-only
* Haz clic en `Generate token` y cópialo.

### En Vercel

Dado que la API de GitHub solo permite 5k solicitudes por hora, la instancia pública podría alcanzar el límite de velocidad. Si la alojas en tu propio servidor de Vercel, no tendrás que preocuparte por ello. ¡Haz clic en el botón de despliegue para empezar!

[![Desplegar en Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/alvar3zjos3/dev-readme-stats)

<details>
 <summary><b>Guía paso a paso para configurar tu instancia de Vercel</b></summary>

1.  Ve a [vercel.com](https://vercel.com/).
2.  Haz clic en `Log in`.
3.  Inicia sesión con GitHub pulsando `Continue with GitHub`.
4.  Inicia sesión en GitHub y permite el acceso a todos los repositorios si se solicita.
5.  Haz un fork de este repositorio.
6.  Vuelve a tu [panel de Vercel](https://vercel.com/dashboard).
7.  Para importar un proyecto, haz clic en el botón `Add New...` y selecciona la opción `Project`.
8.  Haz clic en el botón `Continue with GitHub`, busca el repositorio Git requerido e impórtalo haciendo clic en `Import`.
9.  Crea un Token de Acceso Personal (PAT) como se describe en la [sección anterior](#primer-paso-obtener-tu-token-de-acceso-personal-pat).
10. Añade el PAT como variable de entorno con el nombre `PAT_1`.
11. Haz clic en desplegar, ¡y listo!

</details>

### En otras plataformas

<details>
<summary><b>Guía paso a paso para desplegar en otras plataformas</b></summary>

1.  Haz un fork o clona este repositorio según tus necesidades.
2.  Mueve `express` de las devDependencies a las dependencies en `package.json`.
3.  Ejecuta `npm i` si es necesario (configuración inicial).
4.  Ejecuta `node express.js` para iniciar el servidor, o establece el punto de entrada en `express.js` en `package.json`.
5.  ¡Listo! 🎉
</details>

### Variables de entorno disponibles

<table>
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Descripción</th>
      <th>Valores soportados</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>CACHE_SECONDS</code></td>
      <td>Establece la duración del caché en segundos para las tarjetas generadas.</td>
      <td>Cualquier entero positivo o <code>0</code> para desactivar el caché</td>
    </tr>
    <tr>
      <td><code>WHITELIST</code></td>
      <td>Lista de nombres de usuario de GitHub separados por comas que pueden acceder a tu instancia.</td>
      <td>Nombres de usuario de GitHub separados por comas</td>
    </tr>
    <tr>
      <td><code>GIST_WHITELIST</code></td>
      <td>Lista de IDs de GitHub Gist separados por comas que pueden accederse en tu instancia.</td>
      <td>IDs de GitHub Gist separados por comas</td>
    </tr>
    <tr>
      <td><code>EXCLUDE_REPO</code></td>
      <td>Lista de repositorios separados por comas que se excluirán de las tarjetas de estadísticas y lenguajes.</td>
      <td>Nombres de repositorios separados por comas</td>
    </tr>
    <tr>
      <td><code>FETCH_MULTI_PAGE_STARS</code></td>
      <td>Activa la obtención de todos los repositorios con estrellas para recuentos precisos.</td>
      <td><code>true</code> o <code>false</code></td>
    </tr>
  </tbody>
</table>

Consulta la [documentación de Vercel](https://vercel.com/docs/concepts/projects/environment-variables) para añadir estas variables de entorno a tu instancia.

> [!WARNING]
> Recuerda redesplegar tu instancia después de realizar cualquier cambio en las variables de entorno para que las actualizaciones surtan efecto.

## Mantener tu fork actualizado

Puedes mantener tu fork actualizado con el repositorio original usando el botón [Sync Fork de GitHub](https://docs.github.com/es/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork).

