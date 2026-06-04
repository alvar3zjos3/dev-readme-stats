// @ts-check

import axios from "axios";

/**
 * Envía una solicitud GraphQL a la API de GitHub.
 *
 * @param {import('axios').AxiosRequestConfig['data']} data Datos de la solicitud.
 * @param {import('axios').AxiosRequestConfig['headers']} headers Encabezados de la solicitud.
 * @returns {Promise<any>} Respuesta de la solicitud.
 */
const request = (data, headers) => {
  return axios({
    url: "https://api.github.com/graphql",
    method: "post",
    headers,
    data,
  });
};

export { request };
