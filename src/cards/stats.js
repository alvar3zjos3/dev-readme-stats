// @ts-check

import { Card } from "../common/Card.js";
import { getCardColors } from "../common/color.js";
import { CustomError } from "../common/error.js";
import { kFormatter } from "../common/fmt.js";
import { I18n } from "../common/I18n.js";
import { icons, rankIcon } from "../common/icons.js";
import { clampValue } from "../common/ops.js";
import { flexLayout, measureText } from "../common/render.js";
import { statCardLocales, wakatimeCardLocales } from "../translations.js";

const CARD_MIN_WIDTH = 287;
const CARD_DEFAULT_WIDTH = 287;
const RANK_CARD_MIN_WIDTH = 420;
const RANK_CARD_DEFAULT_WIDTH = 450;
const RANK_ONLY_CARD_MIN_WIDTH = 290;
const RANK_ONLY_CARD_DEFAULT_WIDTH = 290;

/**
 * Localizadores largos que necesitan más espacio para el texto. Manténgase ordenado alfabéticamente.
 *
 * @type {(keyof typeof wakatimeCardLocales["wakatimecard.title"])[]}
 */
const LONG_LOCALES = [
  "az",
  "bg",
  "cs",
  "de",
  "el",
  "es",
  "fil",
  "fi",
  "fr",
  "hu",
  "id",
  "ja",
  "ml",
  "my",
  "nl",
  "pl",
  "pt-br",
  "pt-pt",
  "ru",
  "sr",
  "sr-latn",
  "sw",
  "ta",
  "uk-ua",
  "uz",
  "zh-tw",
];

/**
 * Crea un elemento de texto de tarjeta de estadísticas.
 *
 * @param {object} params Objeto que contiene los parámetros de createTextNode.
 * @param {string} params.icon El icono a mostrar.
 * @param {string} params.label La etiqueta a mostrar.
 * @param {number} params.value El valor a mostrar.
 * @param {string} params.id El id de la estadística.
 * @param {string=} params.unitSymbol El símbolo de unidad de la estadística.
 * @param {number} params.index El índice de la estadística.
 * @param {boolean} params.showIcons Si mostrar iconos.
 * @param {number} params.shiftValuePos Cantidad de píxeles que el valor debe desplazarse hacia la derecha.
 * @param {boolean} params.bold Si debe engrosar la etiqueta.
 * @param {string} params.numberFormat El formato de números en la tarjeta.
 * @param {number=} params.numberPrecision La precisión de números en la tarjeta.
 * @returns {string} El objeto SVG del elemento de texto de la tarjeta de estadísticas.
 */
const createTextNode = ({
  icon,
  label,
  value,
  id,
  unitSymbol,
  index,
  showIcons,
  shiftValuePos,
  bold,
  numberFormat,
  numberPrecision,
}) => {
  const precision =
    typeof numberPrecision === "number" && !isNaN(numberPrecision)
      ? clampValue(numberPrecision, 0, 2)
      : undefined;
  const kValue =
    numberFormat.toLowerCase() === "long" || id === "prs_merged_percentage"
      ? value
      : kFormatter(value, precision);
  const staggerDelay = (index + 3) * 150;

  const labelOffset = showIcons ? `x="25"` : "";
  const iconSvg = showIcons
    ? `
    <svg data-testid="icon" class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16">
      ${icon}
    </svg>
  `
    : "";
  return `
    <g class="stagger" style="animation-delay: ${staggerDelay}ms" transform="translate(25, 0)">
      ${iconSvg}
      <text class="stat ${
        bold ? " bold" : "not_bold"
      }" ${labelOffset} y="12.5">${label}:</text>
      <text
        class="stat ${bold ? " bold" : "not_bold"}"
        x="${(showIcons ? 200 : 180) + shiftValuePos}"
        y="12.5"
        data-testid="${id}"
      >${kValue}${unitSymbol ? ` ${unitSymbol}` : ""}</text>
    </g>
  `;
};

/**
 * Calcula el progreso a lo largo del límite del círculo, es decir, su circunferencia.
 *
 * @param {number} value El valor de rango para calcular el progreso.
 * @returns {number} Valor de progreso.
 */
const calculateCircleProgress = (value) => {
  const radius = 40;
  const c = Math.PI * (radius * 2);

  if (value < 0) {
    value = 0;
  }
  if (value > 100) {
    value = 100;
  }

  return ((100 - value) / 100) * c;
};

/**
 * Recupera la animación para mostrar el progreso a lo largo de la circunferencia del círculo
 * desde el principio hasta el valor dado en dirección hacia el sentido de las agujas del reloj.
 *
 * @param {{progress: number}} progress El valor de progreso para animar.
 * @returns {string} CSS de animación de progreso.
 */
const getProgressAnimation = ({ progress }) => {
  return `
    @keyframes rankAnimation {
      from {
        stroke-dashoffset: ${calculateCircleProgress(0)};
      }
      to {
        stroke-dashoffset: ${calculateCircleProgress(progress)};
      }
    }
  `;
};

/**
 * Recupera los estilos CSS para una tarjeta.
 *
 * @param {Object} colors Los colores a usar para la tarjeta.
 * @param {string} colors.titleColor El color del título.
 * @param {string} colors.textColor El color del texto.
 * @param {string} colors.iconColor El color del icono.
 * @param {string} colors.ringColor El color del anillo.
 * @param {boolean} colors.show_icons Si mostrar iconos.
 * @param {number} colors.progress El valor de progreso para animar.
 * @returns {string} Estilos CSS de la tarjeta.
 */
const getStyles = ({
  // eslint-disable-next-line no-unused-vars
  titleColor,
  textColor,
  iconColor,
  ringColor,
  show_icons,
  progress,
}) => {
  return `
    .stat {
      font: 600 14px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif; fill: ${textColor};
    }
    @supports(-moz-appearance: auto) {
      /* El selector detecta Firefox */
      .stat { font-size:12px; }
    }
    .stagger {
      opacity: 0;
      animation: fadeInAnimation 0.3s ease-in-out forwards;
    }
    .rank-text {
      font: 800 24px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor};
      animation: scaleInAnimation 0.3s ease-in-out forwards;
    }
    .rank-percentile-header {
      font-size: 14px;
    }
    .rank-percentile-text {
      font-size: 16px;
    }
    
    .not_bold { font-weight: 400 }
    .bold { font-weight: 700 }
    .icon {
      fill: ${iconColor};
      display: ${show_icons ? "block" : "none"};
    }

    .rank-circle-rim {
      stroke: ${ringColor};
      fill: none;
      stroke-width: 6;
      opacity: 0.2;
    }
    .rank-circle {
      stroke: ${ringColor};
      stroke-dasharray: 250;
      fill: none;
      stroke-width: 6;
      stroke-linecap: round;
      opacity: 0.8;
      transform-origin: -10px 8px;
      transform: rotate(-90deg);
      animation: rankAnimation 1s forwards ease-in-out;
    }
    ${process.env.NODE_ENV === "test" ? "" : getProgressAnimation({ progress })}
  `;
};

/**
 * Devuelve la etiqueta para commits de acuerdo con las opciones seleccionadas
 *
 * @param {boolean} include_all_commits Opción para incluir todos los años
 * @param {number|undefined} commits_year Opción para incluir solo el año seleccionado
 * @param {I18n} i18n La instancia de I18n.
 * @returns {string} La etiqueta correspondiente a las opciones.
 */
const getTotalCommitsYearLabel = (include_all_commits, commits_year, i18n) =>
  include_all_commits
    ? ""
    : commits_year
      ? ` (${commits_year})`
      : ` (${i18n.t("wakatimecard.lastyear")})`;

/**
 * @typedef {import('../fetchers/types').StatsData} StatsData
 * @typedef {import('./types').StatCardOptions} StatCardOptions
 */

/**
 * Renderiza la tarjeta de estadísticas.
 *
 * @param {StatsData} stats Los datos de estadísticas.
 * @param {Partial<StatCardOptions>} options Las opciones de tarjeta.
 * @returns {string} El objeto SVG de la tarjeta de estadísticas.
 */
const renderStatsCard = (stats, options = {}) => {
  const {
    name,
    totalStars,
    totalCommits,
    totalIssues,
    totalPRs,
    totalPRsMerged,
    mergedPRsPercentage,
    totalReviews,
    totalDiscussionsStarted,
    totalDiscussionsAnswered,
    contributedTo,
    rank,
  } = stats;
  const {
    hide = [],
    show_icons = true,
    hide_title = false,
    hide_border = false,
    card_width,
    hide_rank = false,
    include_all_commits = true,
    commits_year,
    line_height = 25,
    title_color,
    ring_color,
    icon_color,
    text_color,
    text_bold = true,
    bg_color,
    theme = "default",
    custom_title,
    border_radius,
    border_color,
    number_format = "short",
    number_precision,
    locale,
    disable_animations = false,
    rank_icon = "default",
    show = [],
  } = options;

  const lheight = parseInt(String(line_height), 10);

  // devuelve colores basados en tema con sobrescrituras adecuadas y predeterminados
  const { titleColor, iconColor, textColor, bgColor, borderColor, ringColor } =
    getCardColors({
      title_color,
      text_color,
      icon_color,
      bg_color,
      border_color,
      ring_color,
      theme,
    });

  const apostrophe = /s$/i.test(name.trim()) ? "" : "s";
  const i18n = new I18n({
    locale,
    translations: {
      ...statCardLocales({ name, apostrophe }),
      ...wakatimeCardLocales,
    },
  });

  // Metadatos para crear nodos de texto con la función createTextNode
  const STATS = {};

  STATS.stars = {
    icon: icons.star,
    label: i18n.t("statcard.totalstars"),
    value: totalStars,
    id: "stars",
  };
  STATS.commits = {
    icon: icons.commits,
    label: `${i18n.t("statcard.commits")}${getTotalCommitsYearLabel(
      include_all_commits,
      commits_year,
      i18n,
    )}`,
    value: totalCommits,
    id: "commits",
  };
  STATS.prs = {
    icon: icons.prs,
    label: i18n.t("statcard.prs"),
    value: totalPRs,
    id: "prs",
  };

  if (show.includes("prs_merged")) {
    STATS.prs_merged = {
      icon: icons.prs_merged,
      label: i18n.t("statcard.prs-merged"),
      value: totalPRsMerged,
      id: "prs_merged",
    };
  }

  if (show.includes("prs_merged_percentage")) {
    STATS.prs_merged_percentage = {
      icon: icons.prs_merged_percentage,
      label: i18n.t("statcard.prs-merged-percentage"),
      value: mergedPRsPercentage.toFixed(
        typeof number_precision === "number" && !isNaN(number_precision)
          ? clampValue(number_precision, 0, 2)
          : 2,
      ),
      id: "prs_merged_percentage",
      unitSymbol: "%",
    };
  }

  if (show.includes("reviews")) {
    STATS.reviews = {
      icon: icons.reviews,
      label: i18n.t("statcard.reviews"),
      value: totalReviews,
      id: "reviews",
    };
  }

  STATS.issues = {
    icon: icons.issues,
    label: i18n.t("statcard.issues"),
    value: totalIssues,
    id: "issues",
  };

  if (show.includes("discussions_started")) {
    STATS.discussions_started = {
      icon: icons.discussions_started,
      label: i18n.t("statcard.discussions-started"),
      value: totalDiscussionsStarted,
      id: "discussions_started",
    };
  }
  if (show.includes("discussions_answered")) {
    STATS.discussions_answered = {
      icon: icons.discussions_answered,
      label: i18n.t("statcard.discussions-answered"),
      value: totalDiscussionsAnswered,
      id: "discussions_answered",
    };
  }

  STATS.contribs = {
    icon: icons.contribs,
    label: i18n.t("statcard.contribs"),
    value: contributedTo,
    id: "contribs",
  };

  // @ts-ignore
  const isLongLocale = locale ? LONG_LOCALES.includes(locale) : false;

  // filter out hidden stats defined by user & create the text nodes
  const statItems = Object.keys(STATS)
    .filter((key) => !hide.includes(key))
    .map((key, index) => {
      // @ts-ignore
      const stats = STATS[key];

      // create the text nodes, and pass index so that we can calculate the line spacing
      return createTextNode({
        icon: stats.icon,
        label: stats.label,
        value: stats.value,
        id: stats.id,
        unitSymbol: stats.unitSymbol,
        index,
        showIcons: show_icons,
        shiftValuePos: 79.01 + (isLongLocale ? 50 : 0),
        bold: text_bold,
        numberFormat: number_format,
        numberPrecision: number_precision,
      });
    });

  if (statItems.length === 0 && hide_rank) {
    throw new CustomError(
      "No se pudo renderizar la tarjeta de estadísticas.",
      "Se requiere estadísticas o rango.",
    );
  }

  // Calcula la altura de la tarjeta dependiendo de cuántos elementos hay
  // pero si el círculo de rango es visible fija la altura mínima a `150`
  let height = Math.max(
    45 + (statItems.length + 1) * lheight,
    hide_rank ? 0 : statItems.length ? 150 : 180,
  );

  // cuanto menor sea el percentil del usuario, mejor
  const progress = 100 - rank.percentile;
  const cssStyles = getStyles({
    titleColor,
    ringColor,
    textColor,
    iconColor,
    show_icons,
    progress,
  });

  const calculateTextWidth = () => {
    return measureText(
      custom_title
        ? custom_title
        : statItems.length
          ? i18n.t("statcard.title")
          : i18n.t("statcard.ranktitle"),
    );
  };

  /*
    Cuando hide_rank=true, el ancho mínimo de la tarjeta es 270 px + la longitud del título y relleno.
    Cuando hide_rank=false, el ancho mínimo de card_width es 340 px + ancho del icono (si show_icons=true).
    Los números se seleccionan mirando las dimensiones existentes en la producción.
  */
  const iconWidth = show_icons && statItems.length ? 16 + /* padding */ 1 : 0;
  const minCardWidth =
    (hide_rank
      ? clampValue(
          50 /* padding */ + calculateTextWidth() * 2,
          CARD_MIN_WIDTH,
          Infinity,
        )
      : statItems.length
        ? RANK_CARD_MIN_WIDTH
        : RANK_ONLY_CARD_MIN_WIDTH) + iconWidth;
  const defaultCardWidth =
    (hide_rank
      ? CARD_DEFAULT_WIDTH
      : statItems.length
        ? RANK_CARD_DEFAULT_WIDTH
        : RANK_ONLY_CARD_DEFAULT_WIDTH) + iconWidth;
  let width = card_width
    ? isNaN(card_width)
      ? defaultCardWidth
      : card_width
    : defaultCardWidth;
  if (width < minCardWidth) {
    width = minCardWidth;
  }

  const card = new Card({
    customTitle: custom_title,
    defaultTitle: statItems.length
      ? i18n.t("statcard.title")
      : i18n.t("statcard.ranktitle"),
    width,
    height,
    border_radius,
    colors: {
      titleColor,
      textColor,
      iconColor,
      bgColor,
      borderColor,
    },
  });

  card.setHideBorder(hide_border);
  card.setHideTitle(hide_title);
  card.setCSS(cssStyles);

  if (disable_animations) {
    card.disableAnimations();
  }

  /**
   * Calcula los valores correctos de traducción del círculo de rango de modo que el círculo de rango
   * continúe respetando el relleno siguiente:
   *
   * ancho > RANK_CARD_DEFAULT_WIDTH: Se usará el relleno derecho predeterminado de 70 px.
   * ancho < RANK_CARD_DEFAULT_WIDTH: El relleno izquierdo y derecho se ampliarán
   *   igualmente desde un mínimo determinado en RANK_CARD_MIN_WIDTH.
   *
   * @returns {number} - Valor de traducción del círculo de rango.
   */
  const calculateRankXTranslation = () => {
    if (statItems.length) {
      const minXTranslation = RANK_CARD_MIN_WIDTH + iconWidth - 70;
      if (width > RANK_CARD_DEFAULT_WIDTH) {
        const xMaxExpansion = minXTranslation + (450 - minCardWidth) / 2;
        return xMaxExpansion + width - RANK_CARD_DEFAULT_WIDTH;
      } else {
        return minXTranslation + (width - minCardWidth) / 2;
      }
    } else {
      return width / 2 + 20 - 10;
    }
  };

  // Elementos renderizados condicionalmente
  const rankCircle = hide_rank
    ? ""
    : `<g data-testid="rank-circle"
          transform="translate(${calculateRankXTranslation()}, ${
            height / 2 - 50
          })">
        <circle class="rank-circle-rim" cx="-10" cy="8" r="40" />
        <circle class="rank-circle" cx="-10" cy="8" r="40" />
        <g class="rank-text">
          ${rankIcon(rank_icon, rank?.level, rank?.percentile)}
        </g>
      </g>`;

  // Etiquetas de accesibilidad
  const labels = Object.keys(STATS)
    .filter((key) => !hide.includes(key))
    .map((key) => {
      // @ts-ignore
      const stats = STATS[key];
      if (key === "commits") {
        return `${i18n.t("statcard.commits")} ${getTotalCommitsYearLabel(
          include_all_commits,
          commits_year,
          i18n,
        )} : ${stats.value}`;
      }
      return `${stats.label}: ${stats.value}`;
    })
    .join(", ");

  card.setAccessibilityLabel({
    title: `${card.title}, Rank: ${rank.level}`,
    desc: labels,
  });

  return card.render(`
    ${rankCircle}
    <svg x="0" y="0">
      ${flexLayout({
        items: statItems,
        gap: lheight,
        direction: "column",
      }).join("")}
    </svg>
  `);
};

export { renderStatsCard };
export default renderStatsCard;
