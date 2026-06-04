// @ts-check

import { CustomError } from "./error.js";
import { logger } from "./log.js";

// Variables de script.

// Cuenta la cantidad de tokens disponibles de la API de GitHub.
const PATs = Object.keys(process.env).filter((key) =>
  /PAT_\d*$/.exec(key),
).length;
const RETRIES = process.env.NODE_ENV === "test" ? 7 : PATs;

/**
 * @typedef {import("axios").AxiosResponse} AxiosResponse Axios response.
 * @typedef {(variables: any, token: string, retriesForTests?: number) => Promise<AxiosResponse>} FetcherFunction Fetcher function.
 */

/**
 * Intenta ejecutar la función fetcher hasta que tenga éxito o se alcance el número máximo de reintentos.
 *
 * @param {FetcherFunction} fetcher La función fetcher.
 * @param {any} variables Objeto con argumentos para pasar a la función fetcher.
 * @param {number} retries Cuántas veces reintentar.
 * @returns {Promise<any>} La respuesta de la función fetcher.
 */
const retryer = async (fetcher, variables, retries = 0) => {
  if (!RETRIES) {
    throw new CustomError("No se encontraron tokens de la API de GitHub", CustomError.NO_TOKENS);
  }

  if (retries > RETRIES) {
    throw new CustomError(
      "Tiempo de inactividad debido a limitación de tasa de la API de GitHub",
      CustomError.MAX_RETRY,
    );
  }

  try {
    // intenta traer con el primer token desde RETRIES es 0 index estoy agregando +1
    let response = await fetcher(
      variables,
      // @ts-ignore
      process.env[`PAT_${retries + 1}`],
      // utilizado en pruebas para simular limitación de tasa
      retries,
    );

    // reacciona tanto a señales de limitación de tasa basadas en tipo como en mensaje.
    // https://github.com/anuraghazra/github-readme-stats/issues/4425
    const errors = response?.data?.errors;
    const errorType = errors?.[0]?.type;
    const errorMsg = errors?.[0]?.message || "";
    const isRateLimited =
      (errors && errorType === "RATE_LIMITED") || /rate limit/i.test(errorMsg);

    // si se alcanza el límite de tasa, aumenta los REINTENTOS y llama recursivamente al retryer
    // con nombre de usuario y REINTENTOS actuales
    if (isRateLimited) {
      logger.log(`PAT_${retries + 1} Falló`);
      retries++;
      // devuelve directamente de la función
      return retryer(fetcher, variables, retries);
    }

    // finalmente devuelve la respuesta
    return response;
  } catch (err) {
    /** @type {any} */
    const e = err;

    // error de red/inesperado → dejar que la persona que llama lo trate como un fracaso
    if (!e?.response) {
      throw e;
    }

    // prettier-ignore
    // también comprobando credenciales incorrectas si algún token se invalida
    const isBadCredential =
      e?.response?.data?.message === "Bad credentials";
    const isAccountSuspended =
      e?.response?.data?.message === "Sorry. Your account was suspended.";

    if (isBadCredential || isAccountSuspended) {
      logger.log(`PAT_${retries + 1} Falló`);
      retries++;
      // devuelve directamente de la función
      return retryer(fetcher, variables, retries);
    }

    // Error HTTP con una respuesta → devuélvelo para que la persona que llama lo maneje
    return e.response;
  }
};

export { retryer, RETRIES };
export default retryer;
