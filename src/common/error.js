// @ts-check

/**
 * @type {string} Mensaje general para pedir al usuario que intente más tarde.
 */
const TRY_AGAIN_LATER = "Por favor, intenta más tarde";

/**
 * @type {Object<string, string>} Mapa de tipos de error a mensajes de error secundarios.
 */
const SECONDARY_ERROR_MESSAGES = {
  MAX_RETRY:
    "Puedes desplegar tu propia instancia o esperar hasta que la pública ya no esté limitada",
  NO_TOKENS:
    "Por favor, agrega una variable de entorno llamada PAT_1 con tu token de API de GitHub en vercel",
  USER_NOT_FOUND:
    "Asegúrate de que el nombre de usuario proporcionado no sea una organización",
  GRAPHQL_ERROR: TRY_AGAIN_LATER,
  GITHUB_REST_API_ERROR: TRY_AGAIN_LATER,
  WAKATIME_USER_NOT_FOUND:
    "Asegúrate de que tengas un perfil público de WakaTime",
};

/**
 * Clase de error personalizado para manejar errores de GRS personalizados.
 */
class CustomError extends Error {
  /**
   * Constructor de error personalizado.
   *
   * @param {string} message Mensaje de error.
   * @param {string} type Tipo de error.
   */
  constructor(message, type) {
    super(message);
    this.type = type;
    this.secondaryMessage = SECONDARY_ERROR_MESSAGES[type] || type;
  }

  static MAX_RETRY = "MAX_RETRY";
  static NO_TOKENS = "NO_TOKENS";
  static USER_NOT_FOUND = "USER_NOT_FOUND";
  static GRAPHQL_ERROR = "GRAPHQL_ERROR";
  static GITHUB_REST_API_ERROR = "GITHUB_REST_API_ERROR";
  static WAKATIME_ERROR = "WAKATIME_ERROR";
}

/**
 * Clase de error de parámetro faltante.
 */
class MissingParamError extends Error {
  /**
   * Constructor de error de parámetro faltante.
   *
   * @param {string[]} missedParams Un arreglo de nombres de parámetros faltantes.
   * @param {string=} secondaryMessage Mensaje secundario opcional a mostrar.
   */
  constructor(missedParams, secondaryMessage) {
    const msg = `Parámetros faltantes ${missedParams
      .map((p) => `"${p}"`)
      .join(", ")} asegúrate de pasar los parámetros en la URL`;
    super(msg);
    this.missedParams = missedParams;
    this.secondaryMessage = secondaryMessage;
  }
}

/**
 * Obtiene el mensaje secundario de un objeto de error.
 *
 * @param {Error} err El objeto de error.
 * @returns {string|undefined} El mensaje secundario si está disponible, de lo contrario indefinido.
 */
const retrieveSecondaryMessage = (err) => {
  return "secondaryMessage" in err && typeof err.secondaryMessage === "string"
    ? err.secondaryMessage
    : undefined;
};

export {
  CustomError,
  MissingParamError,
  SECONDARY_ERROR_MESSAGES,
  TRY_AGAIN_LATER,
  retrieveSecondaryMessage,
};
