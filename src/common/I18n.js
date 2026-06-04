// @ts-check

const FALLBACK_LOCALE = "en";

/**
 * Clase de traducción i18n.
 */
class I18n {
  /**
   * Constructor.
   *
   * @param {Object} options Opciones.
   * @param {string=} options.locale Localizador.
   * @param {any} options.translations Traducciones.
   */
  constructor({ locale, translations }) {
    this.locale = locale || FALLBACK_LOCALE;
    this.translations = translations;
  }

  /**
   * Obtiene la traducción.
   *
   * @param {string} str Cadena a traducir.
   * @returns {string} Cadena traducida.
   */
  t(str) {
    if (!this.translations[str]) {
      throw new Error(`${str} Cadena de traducción no encontrada`);
    }

    if (!this.translations[str][this.locale]) {
      throw new Error(
        `'${str}' traducción no encontrada para el locale '${this.locale}'`,
      );
    }

    return this.translations[str][this.locale];
  }
}

export { I18n };
export default I18n;
