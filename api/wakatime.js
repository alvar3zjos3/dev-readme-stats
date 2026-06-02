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
import {
  MissingParamError,
  retrieveSecondaryMessage,
} from "../src/common/error.js";
import { parseArray, parseBoolean } from "../src/common/ops.js";
import { encodeHTML } from "../src/common/html.js";
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

  // ✅ CORRECCIÓN: sanitizar username y custom_title antes de usarlos
  const safeUsername = username ? encodeHTML(String(username)) : undefined;
  const safeCustomTitle = custom_title
    ? encodeHTML(String(custom_title))
    : undefined;
  const safeLocale = locale ? encodeHTML(String(locale).toLowerCase()) : null;

  const safeTitleColor = title_color
    ? encodeHTML(String(title_color))
    : undefined;
  const safeTextColor = text_color ? encodeHTML(String(text_color)) : undefined;
  const safeBgColor = bg_color ? encodeHTML(String(bg_color)) : undefined;
  const safeBorderColor = border_color
    ? encodeHTML(String(border_color))
    : undefined;
  const safeIconColor = icon_color ? encodeHTML(String(icon_color)) : undefined;
  const safeTheme =
    theme && Object.keys(themes).includes(String(theme))
      ? String(theme)
      : "default";

  const renderOptions = {
    title_color: safeTitleColor,
    text_color: safeTextColor,
    bg_color: safeBgColor,
    border_color: safeBorderColor,
    theme: safeTheme,
  };

  const access = guardAccess({
    res,
    // ✅ usar safeUsername en lugar del username crudo
    id: safeUsername ?? "",
    type: "wakatime",
    colors: renderOptions,
  });
  if (!access.isPassed) {
    return access.result;
  }

  // ✅ usar safeLocale ya sanitizado
  if (safeLocale && !isLocaleAvailable(safeLocale)) {
    return res.send(
      renderError({
        message: "Something went wrong",
        secondaryMessage: "Language not found",
        renderOptions,
      }),
    );
  }

  try {
    // ✅ pasar safeUsername al fetcher, no el valor crudo
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
        // ✅ usar safeCustomTitle y safeLocale
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
    if (err instanceof Error) {
      return res.send(
        renderError({
          // ✅ sanitizar el mensaje de error antes de renderizarlo
          message: encodeHTML(err.message ?? ""),
          secondaryMessage: encodeHTML(retrieveSecondaryMessage(err) ?? ""),
          renderOptions: {
            ...renderOptions,
            show_repo_link: !(err instanceof MissingParamError),
          },
        }),
      );
    }
    return res.send(
      renderError({
        message: "An unknown error occurred",
        renderOptions,
      }),
    );
  }
};
