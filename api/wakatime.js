// @ts-check

import { renderWakatimeCard } from "../src/cards/wakatime.js";
import { renderError } from "../src/common/render.js";
import { fetchWakatimeStats } from "../src/fetchers/wakatime.js";
import { isLocaleAvailable } from "../src/translations.js";
import {
  CACHE_TTL,
  resolveCacheSeconds,
  setCacheHeaders,
  setErrorCacheHeaders,
} from "../src/common/cache.js";
import { guardAccess } from "../src/common/access.js";
import { MissingParamError } from "../src/common/error.js";
import { parseArray, parseBoolean } from "../src/common/ops.js";
import { encodeHTML } from "../src/common/html.js";
import { isValidHexColor } from "../src/common/color.js";
import { themes } from "../themes/index.js";

// @ts-ignore
export default async (req, res) => {
  const {
    username,
    title_color,
    icon_color,
    hide_border,
    card_width,
    line_height,
    text_color,
    bg_color,
    theme,
    cache_seconds,
    hide_title,
    hide_progress,
    custom_title,
    locale,
    layout,
    langs_count,
    hide,
    api_domain,
    border_radius,
    border_color,
    display_format,
    disable_animations,
  } = req.query;

  res.setHeader("Content-Type", "image/svg+xml");

  //CORRECCIÓN: sanitizar username y custom_title antes de usarlos
  const safeUsername = username ? encodeHTML(String(username)) : undefined;
  const safeCustomTitle = custom_title
    ? encodeHTML(String(custom_title))
    : undefined;
  const safeLocale = locale ? encodeHTML(String(locale).toLowerCase()) : null;

  /**
   * Accept only valid hex colors (with optional '#') or valid gradients:
   * "<angle>,<hex>,<hex>[,<hex>...]"
   * Returns normalized value or undefined.
   * @param {string | string[] | undefined} value - Color query param value.
   * @returns {string | undefined} Normalized color or undefined.
   */
  const normalizeColorParam = (value) => {
    if (!value) {
      return undefined;
    }
    const input = String(value).trim();
    if (!input) {
      return undefined;
    }

    const parts = input.split(",").map((p) => p.trim());
    if (parts.length > 1) {
      const [angle, ...colors] = parts;
      const normalizedColors = colors.map((c) => c.replace(/^#/, ""));
      if (
        angle &&
        normalizedColors.length >= 2 &&
        normalizedColors.every((c) => isValidHexColor(c))
      ) {
        return [angle, ...normalizedColors].join(",");
      }
      return undefined;
    }

    const normalizedHex = input.replace(/^#/, "");
    return isValidHexColor(normalizedHex) ? normalizedHex : undefined;
  };

  const safeTitleColor = normalizeColorParam(title_color);
  const safeTextColor = normalizeColorParam(text_color);
  const safeBgColor = normalizeColorParam(bg_color);
  const safeBorderColor = normalizeColorParam(border_color);
  const safeIconColor = normalizeColorParam(icon_color);
  const safeTheme =
    theme && Object.keys(themes).includes(String(theme))
      ? String(theme)
      : "dark";

  const renderOptions = {
    title_color: safeTitleColor,
    text_color: safeTextColor,
    bg_color: safeBgColor,
    border_color: safeBorderColor,
    theme: safeTheme,
  };

  const access = guardAccess({
    res,
    //usar safeUsername en lugar del username crudo
    id: safeUsername ?? "",
    type: "wakatime",
    colors: renderOptions,
  });
  if (!access.isPassed) {
    return access.result;
  }

  //usar safeLocale ya sanitizado
  if (safeLocale && !isLocaleAvailable(safeLocale)) {
    return res.send(
      renderError({
        message: "Algo salió mal",
        secondaryMessage: "Lenguaje no encontrado",
        renderOptions,
      }),
    );
  }

  try {
    //pasar safeUsername al fetcher, no el valor crudo
    const stats = await fetchWakatimeStats({
      username: safeUsername ?? "",
      api_domain,
    });
    const cacheSeconds = resolveCacheSeconds({
      requested: parseInt(cache_seconds, 10),
      def: CACHE_TTL.WAKATIME_CARD.DEFAULT,
      min: CACHE_TTL.WAKATIME_CARD.MIN,
      max: CACHE_TTL.WAKATIME_CARD.MAX,
    });

    setCacheHeaders(res, cacheSeconds);

    return res.send(
      renderWakatimeCard(stats, {
        //usar safeCustomTitle y safeLocale
        custom_title: safeCustomTitle,
        hide_title: parseBoolean(hide_title),
        hide_border: parseBoolean(hide_border),
        card_width: parseInt(card_width, 10),
        hide: parseArray(hide),
        line_height,
        icon_color: safeIconColor,
        hide_progress,
        border_radius,
        locale: safeLocale ?? undefined,
        layout,
        langs_count,
        display_format,
        disable_animations: parseBoolean(disable_animations),
        title_color: safeTitleColor,
        text_color: safeTextColor,
        bg_color: safeBgColor,
        border_color: safeBorderColor,
        // @ts-ignore
        theme: safeTheme,
      }),
    );
  } catch (err) {
    setErrorCacheHeaders(res);
    // Nunca reflejamos datos del error al cliente para evitar XSS
    return res.send(
      renderError({
        message: "Algo salió mal",
        secondaryMessage:
          err instanceof MissingParamError
            ? "Falta un parámetro requerido"
            : "Por favor, intenta más tarde",
        renderOptions,
      }),
    );
  }
};
