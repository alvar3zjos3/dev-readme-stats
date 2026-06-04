// @ts-check

import wrap from "word-wrap";
import { encodeHTML } from "./html.js";

/**
 * Obtiene un número con sufijo k(miles) con precisión de decimales dados.
 *
 * @param {number} num El número a formatear.
 * @param {number=} precision La cantidad de decimales a incluir.
 * @returns {string|number} El número formateado.
 */
const kFormatter = (num, precision) => {
  const abs = Math.abs(num);
  const sign = Math.sign(num);

  if (typeof precision === "number" && !isNaN(precision)) {
    return (sign * (abs / 1000)).toFixed(precision) + "k";
  }

  if (abs < 1000) {
    return sign * abs;
  }

  return sign * parseFloat((abs / 1000).toFixed(1)) + "k";
};

/**
 * Convierte bytes a una representación de cadena legible para humanos.
 *
 * @param {number} bytes La cantidad de bytes a convertir.
 * @returns {string} La representación legible para humanos de bytes.
 * @throws {Error} Si bytes es negativo o demasiado grande.
 */
const formatBytes = (bytes) => {
  if (bytes < 0) {
    throw new Error("Los bytes deben ser un número no negativo");
  }

  if (bytes === 0) {
    return "0 B";
  }

  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB"];
  const base = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(base));

  if (i >= sizes.length) {
    throw new Error("Los bytes son demasiado grandes para convertir a una cadena legible para humanos");
  }

  return `${(bytes / Math.pow(base, i)).toFixed(1)} ${sizes[i]}`;
};

/**
 * Divide el texto en múltiples líneas basado en el ancho de la tarjeta.
 *
 * @param {string} text Texto a dividir.
 * @param {number} width Ancho de línea en cantidad de caracteres.
 * @param {number} maxLines Número máximo de líneas.
 * @returns {string[]} Arreglo de líneas.
 */
const wrapTextMultiline = (text, width = 59, maxLines = 3) => {
  const fullWidthComma = "，";
  const encoded = encodeHTML(text);
  const isChinese = encoded.includes(fullWidthComma);

  let wrapped = [];

  if (isChinese) {
    wrapped = encoded.split(fullWidthComma); // Puntuación completa en chino
  } else {
    wrapped = wrap(encoded, {
      width,
    }).split("\n"); // Divide las líneas envueltas para obtener un arreglo de líneas
  }

  const lines = wrapped.map((line) => line.trim()).slice(0, maxLines); // Solo considera maxLines líneas

  // Agrega "..." a la última línea si el texto excede maxLines
  if (wrapped.length > maxLines) {
    lines[maxLines - 1] += "...";
  }

  // Elimina líneas vacías si el texto cabe en menos de maxLines líneas
  const multiLineText = lines.filter(Boolean);
  return multiLineText;
};

export { kFormatter, formatBytes, wrapTextMultiline };
