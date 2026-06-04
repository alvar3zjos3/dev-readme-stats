// @ts-check

import axios from "axios";
import { CustomError, MissingParamError } from "../common/error.js";

// Lista blanca de dominios permitidos para api_domain
const ALLOWED_DOMAINS = ["wakatime.com", "wakapi.dev"];

/**
 * Valida que el api_domain sea uno de los dominios permitidos.
 * @param {string | undefined} domain Parámetro de dominio de la URL.
 * @returns {string} Dominio seguro y validado.
 */
const sanitizeApiDomain = (domain) => {
  if (!domain) {
    return "wakatime.com";
  }

  // Elimina la barra final y normaliza a minúsculas
  const cleanDomain = domain.replace(/\/$/gi, "").toLowerCase().trim();

  // Solo se permiten dominios en la lista blanca
  if (!ALLOWED_DOMAINS.includes(cleanDomain)) {
    // Si el dominio no está permitido, usamos el predeterminado
    return "wakatime.com";
  }

  return cleanDomain;
};

/**
 * Recuperador de datos de WakaTime.
 *
 * @param {{username: string, api_domain: string }} props Props del recuperador.
 * @returns {Promise<import("./types").WakaTimeData>} Respuesta de datos de WakaTime.
 */
const fetchWakatimeStats = async ({ username, api_domain }) => {
  if (!username) {
    throw new MissingParamError(["username"]);
  }

  // Validar que username solo tenga caracteres seguros
  if (!/^[a-zA-Z0-9._-]+$/.test(username)) {
    throw new CustomError(
      "Formato de nombre de usuario no válido",
      "WAKATIME_USER_NOT_FOUND",
    );
  }

  // Usar el dominio validado en lugar del input directo del usuario
  const safeDomain = sanitizeApiDomain(api_domain);

  try {
    const { data } = await axios.get(
      `https://${safeDomain}/api/v1/users/${encodeURIComponent(username)}/stats?is_including_today=true`,
    );

    return data.data;
  } catch (err) {
    if (err.response?.status < 200 || err.response?.status > 299) {
      throw new CustomError(
        `No se pudo resolver a un usuario con el login de '${username}'`,
        "WAKATIME_USER_NOT_FOUND",
      );
    }
    throw err;
  }
};

export { fetchWakatimeStats };
export default fetchWakatimeStats;
