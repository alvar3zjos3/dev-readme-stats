// @ts-check

import { Card } from "../common/Card.js";
import { getCardColors } from "../common/color.js";
import { formatBytes } from "../common/fmt.js";
import { I18n } from "../common/I18n.js";
import { chunkArray, clampValue, lowercaseTrim } from "../common/ops.js";
import {
  createProgressNode,
  flexLayout,
  measureText,
} from "../common/render.js";
import { langCardLocales } from "../translations.js";

const DEFAULT_CARD_WIDTH = 300;
const MIN_CARD_WIDTH = 280;
const DEFAULT_LANG_COLOR = "#858585";
const CARD_PADDING = 25;
const COMPACT_LAYOUT_BASE_HEIGHT = 90;
const MAXIMUM_LANGS_COUNT = 20;

const NORMAL_LAYOUT_DEFAULT_LANGS_COUNT = 5;
const COMPACT_LAYOUT_DEFAULT_LANGS_COUNT = 6;
const DONUT_LAYOUT_DEFAULT_LANGS_COUNT = 5;
const PIE_LAYOUT_DEFAULT_LANGS_COUNT = 6;
const DONUT_VERTICAL_LAYOUT_DEFAULT_LANGS_COUNT = 6;

/**
 * @typedef {import("../fetchers/types").Lang} Lang
 */

/**
 * Recupera el lenguaje de programación cuyo nombre es el más largo.
 *
 * @param {Lang[]} arr Arreglo de lenguajes de programación.
 * @returns {{ name: string, size: number, color: string }} Objeto del lenguaje de programación más largo.
 */
const getLongestLang = (arr) =>
  arr.reduce(
    (savedLang, lang) =>
      lang.name.length > savedLang.name.length ? lang : savedLang,
    { name: "", size: 0, color: "" },
  );

/**
 * Convierte grados a radianes.
 *
 * @param {number} angleInDegrees Ángulo en grados.
 * @returns {number} Ángulo en radianes.
 */
const degreesToRadians = (angleInDegrees) => angleInDegrees * (Math.PI / 180.0);

/**
 * Convierte radianes a grados.
 *
 * @param {number} angleInRadians Ángulo en radianes.
 * @returns {number} Ángulo en grados.
 */
const radiansToDegrees = (angleInRadians) => angleInRadians / (Math.PI / 180.0);

/**
 * Convierte coordenadas polares a coordenadas cartesianas.
 *
 * @param {number} centerX Coordenada x del centro.
 * @param {number} centerY Coordenada y del centro.
 * @param {number} radius Radio del círculo.
 * @param {number} angleInDegrees Ángulo en grados.
 * @returns {{x: number, y: number}} Coordenadas cartesianas.
 */
const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const rads = degreesToRadians(angleInDegrees);
  return {
    x: centerX + radius * Math.cos(rads),
    y: centerY + radius * Math.sin(rads),
  };
};

/**
 * Convierte coordenadas cartesianas a coordenadas polares.
 *
 * @param {number} centerX Coordenada x del centro.
 * @param {number} centerY Coordenada y del centro.
 * @param {number} x Coordenada x del punto.
 * @param {number} y Coordenada y del punto.
 * @returns {{radius: number, angleInDegrees: number}} Coordenadas polares.
 */
const cartesianToPolar = (centerX, centerY, x, y) => {
  const radius = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
  let angleInDegrees = radiansToDegrees(Math.atan2(y - centerY, x - centerX));
  if (angleInDegrees < 0) {
    angleInDegrees += 360;
  }
  return { radius, angleInDegrees };
};

/**
 * Calcula la longitud del círculo.
 *
 * @param {number} radius Radio del círculo.
 * @returns {number} La longitud del círculo.
 */
const getCircleLength = (radius) => {
  return 2 * Math.PI * radius;
};

/**
 * Calcula la altura para el diseño compacto.
 *
 * @param {number} totalLangs Cantidad total de lenguajes.
 * @returns {number} Altura de la tarjeta.
 */
const calculateCompactLayoutHeight = (totalLangs) => {
  return COMPACT_LAYOUT_BASE_HEIGHT + Math.round(totalLangs / 2) * 25;
};

/**
 * Calcula la altura para el diseño normal.
 *
 * @param {number} totalLangs Cantidad total de lenguajes.
 * @returns {number} Altura de la tarjeta.
 */
const calculateNormalLayoutHeight = (totalLangs) => {
  return 45 + (totalLangs + 1) * 40;
};

/**
 * Calcula la altura para el diseño donut.
 *
 * @param {number} totalLangs Cantidad total de lenguajes.
 * @returns {number} Altura de la tarjeta.
 */
const calculateDonutLayoutHeight = (totalLangs) => {
  return 215 + Math.max(totalLangs - 5, 0) * 32;
};

/**
 * Calcula la altura para el diseño vertical donut.
 *
 * @param {number} totalLangs Cantidad total de lenguajes.
 * @returns {number} Altura de la tarjeta.
 */
const calculateDonutVerticalLayoutHeight = (totalLangs) => {
  return 300 + Math.round(totalLangs / 2) * 25;
};

/**
 * Calcula la altura para el diseño pie.
 *
 * @param {number} totalLangs Cantidad total de lenguajes.
 * @returns {number} Altura de la tarjeta.
 */
const calculatePieLayoutHeight = (totalLangs) => {
  return 300 + Math.round(totalLangs / 2) * 25;
};

/**
 * Calcula la traducción del centro necesaria para mantener el gráfico donut centrado.
 * @param {number} totalLangs Cantidad total de lenguajes.
 * @returns {number} Traducción del centro del donut.
 */
const donutCenterTranslation = (totalLangs) => {
  return -45 + Math.max(totalLangs - 5, 0) * 16;
};

/**
 * Recorta los lenguajes principales a lang_count mientras también oculta ciertos lenguajes.
 *
 * @param {Record<string, Lang>} topLangs Lenguajes principales.
 * @param {number} langs_count Cantidad de lenguajes a mostrar.
 * @param {string[]=} hide Lenguajes a ocultar.
 * @returns {{ langs: Lang[], totalLanguageSize: number }} Lenguajes principales recortados y tamaño total.
 */
const trimTopLanguages = (topLangs, langs_count, hide) => {
  let langs = Object.values(topLangs);
  let langsToHide = {};
  let langsCount = clampValue(langs_count, 1, MAXIMUM_LANGS_COUNT);

  // poblar mapa langsToHide para búsqueda rápida
  // mientras se filtra
  if (hide) {
    hide.forEach((langName) => {
      // @ts-ignore
      langsToHide[lowercaseTrim(langName)] = true;
    });
  }

  // filtrar lenguajes a ocultar
  langs = langs
    .sort((a, b) => b.size - a.size)
    .filter((lang) => {
      // @ts-ignore
      return !langsToHide[lowercaseTrim(lang.name)];
    })
    .slice(0, langsCount);

  const totalLanguageSize = langs.reduce((acc, curr) => acc + curr.size, 0);

  return { langs, totalLanguageSize };
};

/**
 * Obtiene el valor de visualización correspondiente al formato.
 *
 * @param {number} size Tamaño de bytes.
 * @param {number} percentages Valor de porcentaje.
 * @param {string} format Formato de las estadísticas.
 * @returns {string} Valor de visualización.
 */
const getDisplayValue = (size, percentages, format) => {
  return format === "bytes" ? formatBytes(size) : `${percentages.toFixed(2)}%`;
};

/**
 * Crea elemento de texto de barra de progreso para un lenguaje de programación.
 *
 * @param {object} props Propiedades de la función.
 * @param {number} props.width El ancho de la tarjeta
 * @param {string} props.color Color del lenguaje de programación.
 * @param {string} props.name Nombre del lenguaje de programación.
 * @param {number} props.size Tamaño del lenguaje de programación.
 * @param {number} props.totalSize Tamaño total de todos los lenguajes.
 * @param {string} props.statsFormat Formato de estadísticas.
 * @param {number} props.index Índice del lenguaje de programación.
 * @returns {string} Nodo SVG del lenguaje de programación.
 */
const createProgressTextNode = ({
  width,
  color,
  name,
  size,
  totalSize,
  statsFormat,
  index,
}) => {
  const staggerDelay = (index + 3) * 150;
  const paddingRight = 95;
  const progressTextX = width - paddingRight + 10;
  const progressWidth = width - paddingRight;

  const progress = (size / totalSize) * 100;
  const displayValue = getDisplayValue(size, progress, statsFormat);

  return `
    <g class="stagger" style="animation-delay: ${staggerDelay}ms">
      <text data-testid="lang-name" x="2" y="15" class="lang-name">${name}</text>
      <text x="${progressTextX}" y="34" class="lang-name">${displayValue}</text>
      ${createProgressNode({
        x: 0,
        y: 25,
        color,
        width: progressWidth,
        progress,
        progressBarBackgroundColor: "#ddd",
        delay: staggerDelay + 300,
      })}
    </g>
  `;
};

/**
 * Crea elemento de texto compacto para un lenguaje de programación.
 *
 * @param {object} props Propiedades de la función.
 * @param {Lang} props.lang Objeto del lenguaje de programación.
 * @param {number} props.totalSize Tamaño total de todos los lenguajes.
 * @param {boolean=} props.hideProgress Si ocultar porcentaje.
 * @param {string=} props.statsFormat Formato de estadísticas
 * @param {number} props.index Índice del lenguaje de programación.
 * @returns {string} Nodo SVG del lenguaje de programación con diseño compacto.
 */
const createCompactLangNode = ({
  lang,
  totalSize,
  hideProgress,
  statsFormat = "percentages",
  index,
}) => {
  const percentages = (lang.size / totalSize) * 100;
  const displayValue = getDisplayValue(lang.size, percentages, statsFormat);

  const staggerDelay = (index + 3) * 150;
  const color = lang.color || "#858585";

  return `
    <g class="stagger" style="animation-delay: ${staggerDelay}ms">
      <circle cx="5" cy="6" r="5" fill="${color}" />
      <text data-testid="lang-name" x="15" y="10" class='lang-name'>
        ${lang.name} ${hideProgress ? "" : displayValue}
      </text>
    </g>
  `;
};

/**
 * Crea elementos de texto de lenguajes compactos para todos los lenguajes de programación.
 *
 * @param {object} props Propiedades de la función.
 * @param {Lang[]} props.langs Arreglo de lenguajes de programación.
 * @param {number} props.totalSize Tamaño total de todos los lenguajes.
 * @param {boolean=} props.hideProgress Si ocultar porcentaje.
 * @param {string=} props.statsFormat Formato de estadísticas
 * @returns {string} Nodo SVG de lenguajes de programación.
 */
const createLanguageTextNode = ({
  langs,
  totalSize,
  hideProgress,
  statsFormat,
}) => {
  const longestLang = getLongestLang(langs);
  const chunked = chunkArray(langs, langs.length / 2);
  const layouts = chunked.map((array) => {
    // @ts-ignore
    const items = array.map((lang, index) =>
      createCompactLangNode({
        lang,
        totalSize,
        hideProgress,
        statsFormat,
        index,
      }),
    );
    return flexLayout({
      items,
      gap: 25,
      direction: "column",
    }).join("");
  });

  const percent = ((longestLang.size / totalSize) * 100).toFixed(2);
  const minGap = 150;
  const maxGap = 20 + measureText(`${longestLang.name} ${percent}%`, 11);
  return flexLayout({
    items: layouts,
    gap: maxGap < minGap ? minGap : maxGap,
  }).join("");
};

/**
 * Crea elementos de texto de lenguajes donut para todos los lenguajes de programación.
 *
 * @param {object} props Propiedades de la función.
 * @param {Lang[]} props.langs Arreglo de lenguajes de programación.
 * @param {number} props.totalSize Tamaño total de todos los lenguajes.
 * @param {string} props.statsFormat Formato de estadísticas
 * @returns {string} Nodo SVG de lenguaje de programación con diseño donut.
 */
const createDonutLanguagesNode = ({ langs, totalSize, statsFormat }) => {
  return flexLayout({
    items: langs.map((lang, index) => {
      return createCompactLangNode({
        lang,
        totalSize,
        hideProgress: false,
        statsFormat,
        index,
      });
    }),
    gap: 32,
    direction: "column",
  }).join("");
};

/**
 * Renderiza el diseño predeterminado de la tarjeta de lenguaje.
 *
 * @param {Lang[]} langs Arreglo de lenguajes de programación.
 * @param {number} width Ancho de la tarjeta.
 * @param {number} totalLanguageSize Tamaño total de todos los lenguajes.
 * @param {string} statsFormat Formato de estadísticas.
 * @returns {string} Objeto SVG de la tarjeta del diseño normal.
 */
const renderNormalLayout = (langs, width, totalLanguageSize, statsFormat) => {
  return flexLayout({
    items: langs.map((lang, index) => {
      return createProgressTextNode({
        width,
        name: lang.name,
        color: lang.color || DEFAULT_LANG_COLOR,
        size: lang.size,
        totalSize: totalLanguageSize,
        statsFormat,
        index,
      });
    }),
    gap: 40,
    direction: "column",
  }).join("");
};

/**
 * Renderiza el diseño compacto de la tarjeta de lenguaje.
 *
 * @param {Lang[]} langs Arreglo de lenguajes de programación.
 * @param {number} width Ancho de la tarjeta.
 * @param {number} totalLanguageSize Tamaño total de todos los lenguajes.
 * @param {boolean=} hideProgress Si ocultar barra de progreso.
 * @param {string} statsFormat Formato de estadísticas.
 * @returns {string} Objeto SVG de la tarjeta del diseño compacto.
 */
const renderCompactLayout = (
  langs,
  width,
  totalLanguageSize,
  hideProgress,
  statsFormat = "percentages",
) => {
  const paddingRight = 50;
  const offsetWidth = width - paddingRight;
  // progressOffset contiene el ancho del lenguaje anterior y se usa para compensar el siguiente lenguaje
  // para que podamos apilarlos uno tras otro, así: [--][----][---]
  let progressOffset = 0;
  const compactProgressBar = langs
    .map((lang) => {
      const percentage = parseFloat(
        ((lang.size / totalLanguageSize) * offsetWidth).toFixed(2),
      );

      const progress = percentage < 10 ? percentage + 10 : percentage;

      const output = `
        <rect
          mask="url(#rect-mask)"
          data-testid="lang-progress"
          x="${progressOffset}"
          y="0"
          width="${progress}"
          height="8"
          fill="${lang.color || "#858585"}"
        />
      `;
      progressOffset += percentage;
      return output;
    })
    .join("");

  return `
  ${
    hideProgress
      ? ""
      : `
      <mask id="rect-mask">
          <rect x="0" y="0" width="${offsetWidth}" height="8" fill="white" rx="5"/>
        </mask>
        ${compactProgressBar}
      `
  }
    <g transform="translate(0, ${hideProgress ? "0" : "25"})">
      ${createLanguageTextNode({
        langs,
        totalSize: totalLanguageSize,
        hideProgress,
        statsFormat,
      })}
    </g>
  `;
};

/**
 * Renderiza el diseño vertical donut para mostrar los lenguajes de programación más frecuentemente usados por el usuario.
 *
 * @param {Lang[]} langs Arreglo de lenguajes de programación.
 * @param {number} totalLanguageSize Tamaño total de todos los lenguajes.
 * @param {string} statsFormat Formato de estadísticas.
 * @returns {string} Objeto SVG de la tarjeta del diseño compacto.
 */
const renderDonutVerticalLayout = (langs, totalLanguageSize, statsFormat) => {
  // Radio del gráfico donut vertical y longitud total
  const radius = 80;
  const totalCircleLength = getCircleLength(radius);

  // Círculos SVG
  let circles = [];

  // Sangría inicial para partes del gráfico donut vertical
  let indent = 0;

  // Coeficiente de retraso inicial para partes del gráfico donut vertical
  let startDelayCoefficient = 1;

  // Generar cada parte del gráfico donut vertical
  for (const lang of langs) {
    const percentage = (lang.size / totalLanguageSize) * 100;
    const circleLength = totalCircleLength * (percentage / 100);
    const delay = startDelayCoefficient * 100;

    circles.push(`
      <g class="stagger" style="animation-delay: ${delay}ms">
        <circle
          cx="150"
          cy="100"
          r="${radius}"
          fill="transparent"
          stroke="${lang.color}"
          stroke-width="25"
          stroke-dasharray="${totalCircleLength}"
          stroke-dashoffset="${indent}"
          size="${percentage}"
          data-testid="lang-donut"
        />
      </g>
    `);

    // Actualizar la sangría para la siguiente parte
    indent += circleLength;
    // Actualizar el coeficiente de retraso inicial para la siguiente parte
    startDelayCoefficient += 1;
  }

  return `
    <svg data-testid="lang-items">
      <g transform="translate(0, 0)">
        <svg data-testid="donut">
          ${circles.join("")}
        </svg>
      </g>
      <g transform="translate(0, 220)">
        <svg data-testid="lang-names" x="${CARD_PADDING}">
          ${createLanguageTextNode({
            langs,
            totalSize: totalLanguageSize,
            hideProgress: false,
            statsFormat,
          })}
        </svg>
      </g>
    </svg>
  `;
};

/**
 * Renderiza el diseño pie para mostrar los lenguajes de programación más frecuentemente usados por el usuario.
 *
 * @param {Lang[]} langs Arreglo de lenguajes de programación.
 * @param {number} totalLanguageSize Tamaño total de todos los lenguajes.
 * @param {string} statsFormat Formato de estadísticas.
 * @returns {string} Objeto SVG de la tarjeta del diseño compacto.
 */
const renderPieLayout = (langs, totalLanguageSize, statsFormat) => {
  // Radio del gráfico pie y coordenadas del centro
  const radius = 90;
  const centerX = 150;
  const centerY = 100;

  // Ángulo inicial para las partes del gráfico pie
  let startAngle = 0;

  // Coeficiente de retraso inicial para las partes del gráfico pie
  let startDelayCoefficient = 1;

  // Rutas SVG
  const paths = [];

  // Generar cada parte del gráfico pie
  for (const lang of langs) {
    if (langs.length === 1) {
      paths.push(`
        <circle
          cx="${centerX}"
          cy="${centerY}"
          r="${radius}"
          stroke="none"
          fill="${lang.color}"
          data-testid="lang-pie"
          size="100"
        />
      `);
      break;
    }

    const langSizePart = lang.size / totalLanguageSize;
    const percentage = langSizePart * 100;
    // Calcular el ángulo para la parte actual
    const angle = langSizePart * 360;

    // Calcular el ángulo final
    const endAngle = startAngle + angle;

    // Calcular las coordenadas de los puntos inicial y final del arco
    const startPoint = polarToCartesian(centerX, centerY, radius, startAngle);
    const endPoint = polarToCartesian(centerX, centerY, radius, endAngle);

    // Determinar la bandera de arco grande basada en el ángulo
    const largeArcFlag = angle > 180 ? 1 : 0;

    // Calcular retraso
    const delay = startDelayCoefficient * 100;

    // Marcado de arco SVG
    paths.push(`
      <g class="stagger" style="animation-delay: ${delay}ms">
        <path
          data-testid="lang-pie"
          size="${percentage}"
          d="M ${centerX} ${centerY} L ${startPoint.x} ${startPoint.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endPoint.x} ${endPoint.y} Z"
          fill="${lang.color}"
        />
      </g>
    `);

    // Actualizar el ángulo inicial para la siguiente parte
    startAngle = endAngle;
    // Actualizar el coeficiente de retraso inicial para la siguiente parte
    startDelayCoefficient += 1;
  }

  return `
    <svg data-testid="lang-items">
      <g transform="translate(0, 0)">
        <svg data-testid="pie">
          ${paths.join("")}
        </svg>
      </g>
      <g transform="translate(0, 220)">
        <svg data-testid="lang-names" x="${CARD_PADDING}">
          ${createLanguageTextNode({
            langs,
            totalSize: totalLanguageSize,
            hideProgress: false,
            statsFormat,
          })}
        </svg>
      </g>
    </svg>
  `;
};

/**
 * Crea las rutas SVG para el gráfico donut de lenguaje.
 *
 * @param {number} cx Posición x del centro del donut.
 * @param {number} cy Posición y del centro del donut.
 * @param {number} radius Radio del arco del donut.
 * @param {number[]} percentages Arreglo con porcentajes de secciones del donut.
 * @returns {{d: string, percent: number}[]}  Arreglo de elementos de ruta svg
 */
const createDonutPaths = (cx, cy, radius, percentages) => {
  const paths = [];
  let startAngle = 0;
  let endAngle = 0;

  const totalPercent = percentages.reduce((acc, curr) => acc + curr, 0);
  for (let i = 0; i < percentages.length; i++) {
    const tmpPath = {};

    let percent = parseFloat(
      ((percentages[i] / totalPercent) * 100).toFixed(2),
    );

    endAngle = 3.6 * percent + startAngle;
    const startPoint = polarToCartesian(cx, cy, radius, endAngle - 90); // rotate donut 90 degrees counter-clockwise.
    const endPoint = polarToCartesian(cx, cy, radius, startAngle - 90); // rotate donut 90 degrees counter-clockwise.
    const largeArc = endAngle - startAngle <= 180 ? 0 : 1;

    tmpPath.percent = percent;
    tmpPath.d = `M ${startPoint.x} ${startPoint.y} A ${radius} ${radius} 0 ${largeArc} 0 ${endPoint.x} ${endPoint.y}`;

    paths.push(tmpPath);
    startAngle = endAngle;
  }

  return paths;
};

/**
 * Renderiza el diseño de la tarjeta de lenguaje donut.
 *
 * @param {Lang[]} langs Arreglo de lenguajes de programación.
 * @param {number} width Ancho de la tarjeta.
 * @param {number} totalLanguageSize Tamaño total de todos los lenguajes.
 * @param {string} statsFormat Formato de estadísticas.
 * @returns {string} Objeto SVG de la tarjeta del diseño donut.
 */
const renderDonutLayout = (langs, width, totalLanguageSize, statsFormat) => {
  const centerX = width / 3;
  const centerY = width / 3;
  const radius = centerX - 60;
  const strokeWidth = 12;

  const colors = langs.map((lang) => lang.color);
  const langsPercents = langs.map((lang) =>
    parseFloat(((lang.size / totalLanguageSize) * 100).toFixed(2)),
  );

  const langPaths = createDonutPaths(centerX, centerY, radius, langsPercents);

  const donutPaths =
    langs.length === 1
      ? `<circle cx="${centerX}" cy="${centerY}" r="${radius}" stroke="${colors[0]}" fill="none" stroke-width="${strokeWidth}" data-testid="lang-donut" size="100"/>`
      : langPaths
          .map((section, index) => {
            const staggerDelay = (index + 3) * 100;
            const delay = staggerDelay + 300;

            const output = `
       <g class="stagger" style="animation-delay: ${delay}ms">
        <path
          data-testid="lang-donut"
          size="${section.percent}"
          d="${section.d}"
          stroke="${colors[index]}"
          fill="none"
          stroke-width="${strokeWidth}">
        </path>
      </g>
      `;

            return output;
          })
          .join("");

  const donut = `<svg width="${width}" height="${width}">${donutPaths}</svg>`;

  return `
    <g transform="translate(0, 0)">
      <g transform="translate(0, 0)">
        ${createDonutLanguagesNode({ langs, totalSize: totalLanguageSize, statsFormat })}
      </g>

      <g transform="translate(125, ${donutCenterTranslation(langs.length)})">
        ${donut}
      </g>
    </g>
  `;
};

/**
 * @typedef {import("./types").TopLangOptions} TopLangOptions
 * @typedef {TopLangOptions["layout"]} Layout
 */

/**
 * Crea el nodo SVG sin datos de lenguajes.
 *
 * @param {object} props Objeto con propiedades de función.
 * @param {string} props.color Color del texto sin datos de lenguajes.
 * @param {string} props.text Texto traducido sin datos de lenguajes.
 * @param {Layout | undefined} props.layout Diseño de la tarjeta.
 * @returns {string} Cadena del nodo SVG sin datos de lenguajes.
 */
const noLanguagesDataNode = ({ color, text, layout }) => {
  return `
    <text x="${
      layout === "pie" || layout === "donut-vertical" ? CARD_PADDING : 0
    }" y="11" class="stat bold" fill="${color}">${text}</text>
  `;
};

/**
 * Obtiene el recuento predeterminado de lenguajes para el diseño de tarjeta proporcionado.
 *
 * @param {object} props Propiedades de función.
 * @param {Layout=} props.layout Cadena de diseño de entrada.
 * @param {boolean=} props.hide_progress Valor del parámetro hide_progress de entrada.
 * @returns {number} Recuento predeterminado de lenguajes para diseño de entrada.
 */
const getDefaultLanguagesCountByLayout = ({ layout, hide_progress }) => {
  if (layout === "compact" || hide_progress === true) {
    return COMPACT_LAYOUT_DEFAULT_LANGS_COUNT;
  } else if (layout === "donut") {
    return DONUT_LAYOUT_DEFAULT_LANGS_COUNT;
  } else if (layout === "donut-vertical") {
    return DONUT_VERTICAL_LAYOUT_DEFAULT_LANGS_COUNT;
  } else if (layout === "pie") {
    return PIE_LAYOUT_DEFAULT_LANGS_COUNT;
  } else {
    return NORMAL_LAYOUT_DEFAULT_LANGS_COUNT;
  }
};

/**
 * @typedef {import('../fetchers/types').TopLangData} TopLangData
 */

/**
 * Renderiza la tarjeta que muestra los lenguajes de programación más frecuentemente usados por el usuario.
 *
 * @param {TopLangData} topLangs Lenguajes de programación más frecuentemente usados por el usuario.
 * @param {Partial<TopLangOptions>} options Opciones de tarjeta.
 * @returns {string} Objeto SVG de la tarjeta de lenguaje.
 */
const renderTopLanguages = (topLangs, options = {}) => {
  const {
    hide_title = false,
    hide_border = false,
    card_width,
    title_color,
    text_color,
    bg_color,
    hide,
    hide_progress,
    theme = "default",
    layout = "compact",
    custom_title,
    locale,
    langs_count = getDefaultLanguagesCountByLayout({ layout, hide_progress }),
    border_radius,
    border_color,
    disable_animations,
    stats_format = "percentages",
  } = options;

  const i18n = new I18n({
    locale,
    translations: langCardLocales,
  });

  const { langs, totalLanguageSize } = trimTopLanguages(
    topLangs,
    langs_count,
    hide,
  );

  let width = card_width
    ? isNaN(card_width)
      ? DEFAULT_CARD_WIDTH
      : card_width < MIN_CARD_WIDTH
        ? MIN_CARD_WIDTH
        : card_width
    : DEFAULT_CARD_WIDTH;
  let height = calculateNormalLayoutHeight(langs.length);

  // devuelve colores basados en tema con sobrescrituras adecuadas y predeterminados
  const colors = getCardColors({
    title_color,
    text_color,
    bg_color,
    border_color,
    theme,
  });

  let finalLayout = "";
  if (langs.length === 0) {
    height = COMPACT_LAYOUT_BASE_HEIGHT;
    finalLayout = noLanguagesDataNode({
      color: colors.textColor,
      text: i18n.t("langcard.nodata"),
      layout,
    });
  } else if (layout === "pie") {
    height = calculatePieLayoutHeight(langs.length);
    finalLayout = renderPieLayout(langs, totalLanguageSize, stats_format);
  } else if (layout === "donut-vertical") {
    height = calculateDonutVerticalLayoutHeight(langs.length);
    finalLayout = renderDonutVerticalLayout(
      langs,
      totalLanguageSize,
      stats_format,
    );
  } else if (layout === "compact" || hide_progress == true) {
    height =
      calculateCompactLayoutHeight(langs.length) + (hide_progress ? -25 : 0);

    finalLayout = renderCompactLayout(
      langs,
      width,
      totalLanguageSize,
      hide_progress,
      stats_format,
    );
  } else if (layout === "donut") {
    height = calculateDonutLayoutHeight(langs.length);
    width = width + 50; // padding
    finalLayout = renderDonutLayout(
      langs,
      width,
      totalLanguageSize,
      stats_format,
    );
  } else {
    finalLayout = renderNormalLayout(
      langs,
      width,
      totalLanguageSize,
      stats_format,
    );
  }

  const card = new Card({
    customTitle: custom_title,
    defaultTitle: i18n.t("langcard.title"),
    width,
    height,
    border_radius,
    colors,
  });

  if (disable_animations) {
    card.disableAnimations();
  }

  card.setHideBorder(hide_border);
  card.setHideTitle(hide_title);
  card.setCSS(
    `
    @keyframes slideInAnimation {
      from {
        width: 0;
      }
      to {
        width: calc(100%-100px);
      }
    }
    @keyframes growWidthAnimation {
      from {
        width: 0;
      }
      to {
        width: 100%;
      }
    }
    .stat {
      font: 600 14px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif; fill: ${colors.textColor};
    }
    @supports(-moz-appearance: auto) {
      /* Selector detects Firefox */
      .stat { font-size:12px; }
    }
    .bold { font-weight: 700 }
    .lang-name {
      font: 400 11px "Segoe UI", Ubuntu, Sans-Serif;
      fill: ${colors.textColor};
    }
    .stagger {
      opacity: 0;
      animation: fadeInAnimation 0.3s ease-in-out forwards;
    }
    #rect-mask rect{
      animation: slideInAnimation 1s ease-in-out forwards;
    }
    .lang-progress{
      animation: growWidthAnimation 0.6s ease-in-out forwards;
    }
    `,
  );

  if (layout === "pie" || layout === "donut-vertical") {
    return card.render(finalLayout);
  }

  return card.render(`
    <svg data-testid="lang-items" x="${CARD_PADDING}">
      ${finalLayout}
    </svg>
  `);
};

export {
  getLongestLang,
  degreesToRadians,
  radiansToDegrees,
  polarToCartesian,
  cartesianToPolar,
  getCircleLength,
  calculateCompactLayoutHeight,
  calculateNormalLayoutHeight,
  calculateDonutLayoutHeight,
  calculateDonutVerticalLayoutHeight,
  calculatePieLayoutHeight,
  donutCenterTranslation,
  trimTopLanguages,
  renderTopLanguages,
  MIN_CARD_WIDTH,
  getDefaultLanguagesCountByLayout,
};
