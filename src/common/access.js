// @ts-check

import { renderError } from "./render.js";
import { blacklist } from "./blacklist.js";
import { whitelist, gistWhitelist } from "./envs.js";

const NOT_WHITELISTED_USERNAME_MESSAGE = "Este nombre de usuario no está en la lista blanca";
const NOT_WHITELISTED_GIST_MESSAGE = "Este ID de gist no está en la lista blanca";
const BLACKLISTED_MESSAGE = "Este nombre de usuario está en la lista negra";

/**
 * Protege el acceso usando lista blanca/negra.
 *
 * @param {Object} args El objeto de parámetros.
 * @param {any} args.res El objeto de respuesta.
 * @param {string} args.id Identificador de recurso (nombre de usuario o id de gist).
 * @param {"username"|"gist"|"wakatime"} args.type El tipo de identificador.
 * @param {{ title_color?: string, text_color?: string, bg_color?: string, border_color?: string, theme?: string }} args.colors Opciones de color para la tarjeta de error.
 * @returns {{ isPassed: boolean, result?: any }} El objeto de resultado que indica éxito o fracaso.
 */
const guardAccess = ({ res, id, type, colors }) => {
  if (!["username", "gist", "wakatime"].includes(type)) {
    throw new Error(
      'Tipo inválido. Se esperaba "username", "gist" o "wakatime".',
    );
  }

  const currentWhitelist = type === "gist" ? gistWhitelist : whitelist;
  const notWhitelistedMsg =
    type === "gist"
      ? NOT_WHITELISTED_GIST_MESSAGE
      : NOT_WHITELISTED_USERNAME_MESSAGE;

  if (Array.isArray(currentWhitelist) && !currentWhitelist.includes(id)) {
    const result = res.send(
      renderError({
        message: notWhitelistedMsg,
        secondaryMessage: "Por favor, desplega tu propia instancia",
        renderOptions: {
          ...colors,
          show_repo_link: false,
        },
      }),
    );
    return { isPassed: false, result };
  }

  if (
    type === "username" &&
    currentWhitelist === undefined &&
    blacklist.includes(id)
  ) {
    const result = res.send(
      renderError({
        message: BLACKLISTED_MESSAGE,
        secondaryMessage: "Por favor, desplega tu propia instancia",
        renderOptions: {
          ...colors,
          show_repo_link: false,
        },
      }),
    );
    return { isPassed: false, result };
  }

  return { isPassed: true };
};

export { guardAccess };
