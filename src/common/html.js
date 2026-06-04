// @ts-check

/**
 * Codifica una cadena como HTML.
 *
 * @see https://stackoverflow.com/a/48073476/10629172
 *
 * @param {string} str Cadena a codificar.
 * @returns {string} Cadena codificada.
 */
const encodeHTML = (str) => {
  return str
    .replace(/[\u00A0-\u9999<>&](?!#)/gim, (i) => {
      return "&#" + i.charCodeAt(0) + ";";
    })
    .replace(/\u0008/gim, "");
};

export { encodeHTML };
