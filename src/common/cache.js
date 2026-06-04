// @ts-check

import { clampValue } from "./ops.js";

const MIN = 60;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

/**
 * Duraciones comunes en segundos.
 */
const DURATIONS = {
  ONE_MINUTE: MIN,
  FIVE_MINUTES: 5 * MIN,
  TEN_MINUTES: 10 * MIN,
  FIFTEEN_MINUTES: 15 * MIN,
  THIRTY_MINUTES: 30 * MIN,

  TWO_HOURS: 2 * HOUR,
  FOUR_HOURS: 4 * HOUR,
  SIX_HOURS: 6 * HOUR,
  EIGHT_HOURS: 8 * HOUR,
  TWELVE_HOURS: 12 * HOUR,

  ONE_DAY: DAY,
  TWO_DAY: 2 * DAY,
  SIX_DAY: 6 * DAY,
  TEN_DAY: 10 * DAY,
};

/**
 * Valores comunes de TTL de caché en segundos.
 */
const CACHE_TTL = {
  STATS_CARD: {
    DEFAULT: DURATIONS.ONE_DAY,
    MIN: DURATIONS.TWELVE_HOURS,
    MAX: DURATIONS.TWO_DAY,
  },
  TOP_LANGS_CARD: {
    DEFAULT: DURATIONS.SIX_DAY,
    MIN: DURATIONS.TWO_DAY,
    MAX: DURATIONS.TEN_DAY,
  },
  PIN_CARD: {
    DEFAULT: DURATIONS.TEN_DAY,
    MIN: DURATIONS.ONE_DAY,
    MAX: DURATIONS.TEN_DAY,
  },
  GIST_CARD: {
    DEFAULT: DURATIONS.TWO_DAY,
    MIN: DURATIONS.ONE_DAY,
    MAX: DURATIONS.TEN_DAY,
  },
  WAKATIME_CARD: {
    DEFAULT: DURATIONS.ONE_DAY,
    MIN: DURATIONS.TWELVE_HOURS,
    MAX: DURATIONS.TWO_DAY,
  },
  ERROR: DURATIONS.TEN_MINUTES,
};

/**
 * Resuelve los segundos de caché en función de los valores solicitados, predeterminados, mínimos y máximos.
 *
 * @param {Object} args El objeto de parámetros.
 * @param {number} args.requested Los segundos de caché solicitados.
 * @param {number} args.def Los segundos de caché predeterminados.
 * @param {number} args.min Los segundos de caché mínimos.
 * @param {number} args.max Los segundos de caché máximos.
 * @returns {number} Los segundos de caché resueltos.
 */
const resolveCacheSeconds = ({ requested, def, min, max }) => {
  let cacheSeconds = clampValue(isNaN(requested) ? def : requested, min, max);

  if (process.env.CACHE_SECONDS) {
    const envCacheSeconds = parseInt(process.env.CACHE_SECONDS, 10);
    if (!isNaN(envCacheSeconds)) {
      cacheSeconds = envCacheSeconds;
    }
  }

  return cacheSeconds;
};

/**
 * Deshabilita el almacenamiento en caché estableciendo encabezados apropiados en el objeto de respuesta.
 *
 * @param {any} res El objeto de respuesta.
 */
const disableCaching = (res) => {
  // Deshabilita el almacenamiento en caché para navegadores, cachés compartidas/CDN y GitHub Camo.
  res.setHeader(
    "Cache-Control",
    "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
};

/**
 * Establece los encabezados Cache-Control en el objeto de respuesta.
 *
 * @param {any} res El objeto de respuesta.
 * @param {number} cacheSeconds Los segundos de caché a establecer en los encabezados.
 */
const setCacheHeaders = (res, cacheSeconds) => {
  if (cacheSeconds < 1 || process.env.NODE_ENV === "development") {
    disableCaching(res);
    return;
  }

  res.setHeader(
    "Cache-Control",
    `max-age=${cacheSeconds}, ` +
      `s-maxage=${cacheSeconds}, ` +
      `stale-while-revalidate=${DURATIONS.ONE_DAY}`,
  );
};

/**
 * Establece los encabezados Cache-Control para respuestas de error en el objeto de respuesta.
 *
 * @param {any} res El objeto de respuesta.
 */
const setErrorCacheHeaders = (res) => {
  const envCacheSeconds = process.env.CACHE_SECONDS
    ? parseInt(process.env.CACHE_SECONDS, 10)
    : NaN;
  if (
    (!isNaN(envCacheSeconds) && envCacheSeconds < 1) ||
    process.env.NODE_ENV === "development"
  ) {
    disableCaching(res);
    return;
  }

  // Utiliza un período de caché más bajo para errores.
  res.setHeader(
    "Cache-Control",
    `max-age=${CACHE_TTL.ERROR}, ` +
      `s-maxage=${CACHE_TTL.ERROR}, ` +
      `stale-while-revalidate=${DURATIONS.ONE_DAY}`,
  );
};

export {
  resolveCacheSeconds,
  setCacheHeaders,
  setErrorCacheHeaders,
  DURATIONS,
  CACHE_TTL,
};
