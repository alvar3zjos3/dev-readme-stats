// @ts-check

import { SECONDARY_ERROR_MESSAGES, TRY_AGAIN_LATER } from "./error.js";
import { getCardColors } from "./color.js";
import { encodeHTML } from "./html.js";
import { clampValue } from "./ops.js";

/**
 * Utilidad de diseño automático, nos permite diseñar cosas verticalmente u horizontalmente con
 * espaciado adecuado.
 *
 * @param {object} props Propiedades de la función.
 * @param {string[]} props.items Arreglo de elementos a diseñar.
 * @param {number} props.gap Espacio entre elementos.
 * @param {"column" | "row"=} props.direction Dirección para diseñar elementos.
 * @param {number[]=} props.sizes Arreglo de tamaños para cada elemento.
 * @returns {string[]} Arreglo de elementos con diseño adecuado.
 */
const flexLayout = ({ items, gap, direction, sizes = [] }) => {
  let lastSize = 0;
  // filtro() para filtrar cadenas vacías
  return items.filter(Boolean).map((item, i) => {
    const size = sizes[i] || 0;
    let transform = `translate(${lastSize}, 0)`;
    if (direction === "column") {
      transform = `translate(0, ${lastSize})`;
    }
    lastSize += size + gap;
    return `<g transform="${transform}">${item}</g>`;
  });
};

/**
 * Crea un nodo para mostrar el lenguaje de programación principal del repositorio/gist.
 *
 * @param {string} langName Nombre del lenguaje.
 * @param {string} langColor Color del lenguaje.
 * @returns {string} Objeto SVG de visualización de lenguaje.
 */
const createLanguageNode = (langName, langColor) => {
  return `
    <g data-testid="primary-lang">
      <circle data-testid="lang-color" cx="0" cy="-5" r="6" fill="${langColor}" />
      <text data-testid="lang-name" class="gray" x="15">${langName}</text>
    </g>
    `;
};

/**
 * Crea un nodo para indicar progreso en porcentaje a lo largo de una línea horizontal.
 *
 * @param {Object} params Objeto que contiene los parámetros de createProgressNode.
 * @param {number} params.x Posición en el eje X.
 * @param {number} params.y Posición en el eje Y.
 * @param {number} params.width Ancho de la barra de progreso.
 * @param {string} params.color Color de progreso.
 * @param {number} params.progress Valor de progreso.
 * @param {string} params.progressBarBackgroundColor Color de fondo de la barra de progreso.
 * @param {number} params.delay Retraso antes de que comience la animación.
 * @returns {string} Nodo de progreso.
 */
const createProgressNode = ({
  x,
  y,
  width,
  color,
  progress,
  progressBarBackgroundColor,
  delay,
}) => {
  const progressPercentage = clampValue(progress, 2, 100);

  return `
    <svg width="${width}" x="${x}" y="${y}">
      <rect rx="5" ry="5" x="0" y="0" width="${width}" height="8" fill="${progressBarBackgroundColor}"></rect>
      <svg data-testid="lang-progress" width="${progressPercentage}%">
        <rect
            height="8"
            fill="${color}"
            rx="5" ry="5" x="0" y="0"
            class="lang-progress"
            style="animation-delay: ${delay}ms;"
        />
      </svg>
    </svg>
  `;
};

/**
 * Crea un icono con etiqueta para mostrar estadísticas de repositorio/gist como bifurcaciones, estrellas, etc.
 *
 * @param {string} icon El icono a mostrar.
 * @param {number|string} label La etiqueta a mostrar.
 * @param {string} testid El testid a asignar a la etiqueta.
 * @param {number} iconSize El tamaño del icono.
 * @returns {string} Icono con objeto SVG de etiqueta.
 */
const iconWithLabel = (icon, label, testid, iconSize) => {
  if (typeof label === "number" && label <= 0) {
    return "";
  }
  const iconSvg = `
      <svg
        class="icon"
        y="-12"
        viewBox="0 0 16 16"
        version="1.1"
        width="${iconSize}"
        height="${iconSize}"
      >
        ${icon}
      </svg>
    `;
  const text = `<text data-testid="${testid}" class="gray">${label}</text>`;
  return flexLayout({ items: [iconSvg, text], gap: 20 }).join("");
};

// Parámetros de script.
const ERROR_CARD_LENGTH = 576.5;

const UPSTREAM_API_ERRORS = [
  TRY_AGAIN_LATER,
  SECONDARY_ERROR_MESSAGES.MAX_RETRY,
];

/**
 * Renderiza el mensaje de error en la tarjeta.
 *
 * @param {object} args Argumentos de función.
 * @param {string} args.message Mensaje de error principal.
 * @param {string} [args.secondaryMessage=""] El mensaje de error secundario.
 * @param {object} [args.renderOptions={}] Opciones de renderizado.
 * @param {string=} args.renderOptions.title_color Color del título de la tarjeta.
 * @param {string=} args.renderOptions.text_color Color del texto de la tarjeta.
 * @param {string=} args.renderOptions.bg_color Color de fondo de la tarjeta.
 * @param {string=} args.renderOptions.border_color Color del borde de la tarjeta.
 * @param {Parameters<typeof getCardColors>[0]["theme"]=} args.renderOptions.theme Tema de la tarjeta.
 * @param {boolean=} args.renderOptions.show_repo_link Si mostrar enlace del repositorio o no.
 * @returns {string} El marcado SVG.
 */
const renderError = ({
  message,
  secondaryMessage = "",
  renderOptions = {},
}) => {
  const {
    title_color,
    text_color,
    bg_color,
    border_color,
    theme = "default",
    show_repo_link = true,
  } = renderOptions;

  // devuelve colores basados en tema con sobrescrituras adecuadas y predeterminados
  const { titleColor, textColor, bgColor, borderColor } = getCardColors({
    title_color,
    text_color,
    icon_color: "",
    bg_color,
    border_color,
    ring_color: "",
    theme,
  });

  const safeTitleColor = encodeHTML(String(titleColor));
  const safeTextColor = encodeHTML(String(textColor));
  const safeBgColor = encodeHTML(String(bgColor));
  const safeBorderColor = encodeHTML(String(borderColor));

  return `
    <svg width="${ERROR_CARD_LENGTH}"  height="120" viewBox="0 0 ${ERROR_CARD_LENGTH} 120" fill="${safeBgColor}" xmlns="http://www.w3.org/2000/svg">
    <style>
    .text { font: 600 16px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${safeTitleColor} }
    .small { font: 600 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${safeTextColor} }
    .gray { fill: #858585 }
    </style>
    <rect x="0.5" y="0.5" width="${
      ERROR_CARD_LENGTH - 1
    }" height="99%" rx="4.5" fill="${safeBgColor}" stroke="${safeBorderColor}"/>
    <text x="25" y="45" class="text">¡Algo salió mal!${
      UPSTREAM_API_ERRORS.includes(secondaryMessage) || !show_repo_link
        ? ""
        : " presente el problema en https://github.com/alvar3zjos3/dev-readme-stats"
    }</text>
    <text data-testid="message" x="25" y="55" class="text small">
      <tspan x="25" dy="18">${encodeHTML(message)}</tspan>
      <tspan x="25" dy="18" class="gray">${secondaryMessage ? encodeHTML(String(secondaryMessage)) : ""}</tspan>
    </text>
    </svg>
  `;
};

/**
 * Obtiene la longitud del texto.
 *
 * @see https://stackoverflow.com/a/48172630/10629172
 * @param {string} str Cadena a medir.
 * @param {number} fontSize Tamaño de fuente.
 * @returns {number} Longitud del texto.
 */
const measureText = (str, fontSize = 10) => {
  // prettier-ignore
  const widths = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0.2796875, 0.2765625,
    0.3546875, 0.5546875, 0.5546875, 0.8890625, 0.665625, 0.190625,
    0.3328125, 0.3328125, 0.3890625, 0.5828125, 0.2765625, 0.3328125,
    0.2765625, 0.3015625, 0.5546875, 0.5546875, 0.5546875, 0.5546875,
    0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875,
    0.2765625, 0.2765625, 0.584375, 0.5828125, 0.584375, 0.5546875,
    1.0140625, 0.665625, 0.665625, 0.721875, 0.721875, 0.665625,
    0.609375, 0.7765625, 0.721875, 0.2765625, 0.5, 0.665625,
    0.5546875, 0.8328125, 0.721875, 0.7765625, 0.665625, 0.7765625,
    0.721875, 0.665625, 0.609375, 0.721875, 0.665625, 0.94375,
    0.665625, 0.665625, 0.609375, 0.2765625, 0.3546875, 0.2765625,
    0.4765625, 0.5546875, 0.3328125, 0.5546875, 0.5546875, 0.5,
    0.5546875, 0.5546875, 0.2765625, 0.5546875, 0.5546875, 0.221875,
    0.240625, 0.5, 0.221875, 0.8328125, 0.5546875, 0.5546875,
    0.5546875, 0.5546875, 0.3328125, 0.5, 0.2765625, 0.5546875,
    0.5, 0.721875, 0.5, 0.5, 0.5, 0.3546875, 0.259375, 0.353125, 0.5890625,
  ];

  const avg = 0.5279276315789471;
  return (
    str
      .split("")
      .map((c) =>
        c.charCodeAt(0) < widths.length ? widths[c.charCodeAt(0)] : avg,
      )
      .reduce((cur, acc) => acc + cur) * fontSize
  );
};

export {
  ERROR_CARD_LENGTH,
  renderError,
  createLanguageNode,
  createProgressNode,
  iconWithLabel,
  flexLayout,
  measureText,
};
