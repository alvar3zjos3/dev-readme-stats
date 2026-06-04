// @ts-check

import toEmoji from "emoji-name-map";

/**
 * Devuelve un booleano si el valor es "true" o "false", de lo contrario devuelve el valor tal como está.
 *
 * @param {string | boolean} value El valor a analizar.
 * @returns {boolean | undefined } El valor analizado.
 */
const parseBoolean = (value) => {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    if (value.toLowerCase() === "true") {
      return true;
    } else if (value.toLowerCase() === "false") {
      return false;
    }
  }
  return undefined;
};

/**
 * Analiza una cadena en un arreglo de cadenas.
 *
 * @param {string} str La cadena a analizar.
 * @returns {string[]} El arreglo de cadenas.
 */
const parseArray = (str) => {
  if (!str) {
    return [];
  }
  return str.split(",");
};

/**
 * Fija el número dado entre el rango dado.
 *
 * @param {number} number El número a fijar.
 * @param {number} min El valor mínimo.
 * @param {number} max El valor máximo.
 * @returns {number} El número fijado.
 */
const clampValue = (number, min, max) => {
  // @ts-ignore
  if (Number.isNaN(parseInt(number, 10))) {
    return min;
  }
  return Math.max(min, Math.min(number, max));
};

/**
 * Convierte a minúsculas y recorta la cadena.
 *
 * @param {string} name Cadena a convertir a minúsculas y recortar.
 * @returns {string} Cadena convertida a minúsculas y recortada.
 */
const lowercaseTrim = (name) => name.toLowerCase().trim();

/**
 * Divide arreglo de lenguajes en dos columnas.
 *
 * @template T Objeto de idioma.
 * @param {Array<T>} arr Arreglo de lenguajes.
 * @param {number} perChunk Cantidad de lenguajes por columna.
 * @returns {Array<T>} Arreglo de lenguajes dividido en dos columnas.
 */
const chunkArray = (arr, perChunk) => {
  return arr.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / perChunk);

    if (!resultArray[chunkIndex]) {
      // @ts-ignore
      resultArray[chunkIndex] = []; // comienza un nuevo fragmento
    }

    // @ts-ignore
    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);
};

/**
 * Analiza emoji de una cadena.
 *
 * @param {string} str Cadena para analizar emoji desde.
 * @returns {string} Cadena con emoji analizado.
 */
const parseEmojis = (str) => {
  if (!str) {
    throw new Error("[parseEmoji]: argumento str no proporcionado");
  }
  return str.replace(/:\w+:/gm, (emoji) => {
    return toEmoji.get(emoji) || "";
  });
};

/**
 * Obtiene la diferencia en minutos entre dos fechas.
 *
 * @param {Date} d1 Primera fecha.
 * @param {Date} d2 Segunda fecha.
 * @returns {number} Cantidad de minutos entre las dos fechas.
 */
const dateDiff = (d1, d2) => {
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  const diff = date1.getTime() - date2.getTime();
  return Math.round(diff / (1000 * 60));
};

export {
  parseBoolean,
  parseArray,
  clampValue,
  lowercaseTrim,
  chunkArray,
  parseEmojis,
  dateDiff,
};
