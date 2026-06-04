// @ts-check

import { retryer } from "../common/retryer.js";
import { logger } from "../common/log.js";
import { excludeRepositories } from "../common/envs.js";
import { CustomError, MissingParamError } from "../common/error.js";
import { wrapTextMultiline } from "../common/fmt.js";
import { request } from "../common/http.js";

/**
 * Objeto recuperador de lenguajes principales.
 *
 * @param {any} variables Variables del recuperador.
 * @param {string} token Token de GitHub.
 * @returns {Promise<import("axios").AxiosResponse>} Respuesta del recuperador de lenguajes.
 */
const fetcher = (variables, token) => {
  return request(
    {
      query: `
      query userInfo($login: String!) {
        user(login: $login) {
          # fetch only owner repos & not forks
          repositories(ownerAffiliations: OWNER, isFork: false, first: 100) {
            nodes {
              name
              languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                edges {
                  size
                  node {
                    color
                    name
                  }
                }
              }
            }
          }
        }
      }
      `,
      variables,
    },
    {
      Authorization: `token ${token}`,
    },
  );
};

/**
 * @typedef {import("./types").TopLangData} TopLangData Datos de lenguajes principales.
 */

/**
 * Obtiene los lenguajes principales para un usuario dado.
 *
 * @param {string} username Nombre de usuario de GitHub.
 * @param {string[]} exclude_repo Lista de repositorios a excluir.
 * @param {number} size_weight Ponderación a dar al tamaño.
 * @param {number} count_weight Ponderación a dar al conteo.
 * @returns {Promise<TopLangData>} Datos de lenguajes principales.
 */
const fetchTopLanguages = async (
  username,
  exclude_repo = [],
  size_weight = 1,
  count_weight = 0,
) => {
  if (!username) {
    throw new MissingParamError(["username"]);
  }

  const res = await retryer(fetcher, { login: username });

  if (res.data.errors) {
    logger.error(res.data.errors);
    if (res.data.errors[0].type === "NOT_FOUND") {
      throw new CustomError(
        res.data.errors[0].message || "No se pudo obtener el usuario.",
        CustomError.USER_NOT_FOUND,
      );
    }
    if (res.data.errors[0].message) {
      throw new CustomError(
        wrapTextMultiline(res.data.errors[0].message, 90, 1)[0],
        res.statusText,
      );
    }
    throw new CustomError(
      "Algo salió mal al intentar recuperar los datos de lenguaje usando la API de GraphQL.",
      CustomError.GRAPHQL_ERROR,
    );
  }

  let repoNodes = res.data.data.user.repositories.nodes;
  /** @type {Record<string, boolean>} */
  let repoToHide = {};
  const allExcludedRepos = [...exclude_repo, ...excludeRepositories];

  // poblar el mapa repoToHide para búsquedas rápidas
  // mientras se filtran
  if (allExcludedRepos) {
    allExcludedRepos.forEach((repoName) => {
      repoToHide[repoName] = true;
    });
  }

  // filtrar repositorios a ocultar
  repoNodes = repoNodes
    .sort((a, b) => b.size - a.size)
    .filter((name) => !repoToHide[name.name]);

  let repoCount = 0;

  repoNodes = repoNodes
    .filter((node) => node.languages.edges.length > 0)
    // aplanar la lista de nodos de lenguaje
    .reduce((acc, curr) => curr.languages.edges.concat(acc), [])
    .reduce((acc, prev) => {
      // obtener el tamaño del lenguaje (bytes)
      let langSize = prev.size;

      // si ya tenemos el lenguaje en el acumulador
      // & el nombre del lenguaje actual es igual al anterior
      // agregar el tamaño al tamaño del lenguaje e incrementar repoCount.
      if (acc[prev.node.name] && prev.node.name === acc[prev.node.name].name) {
        langSize = prev.size + acc[prev.node.name].size;
        repoCount += 1;
      } else {
        // restablecer repoCount a 1
        // el lenguaje debe existir en al menos un repositorio para ser detectado
        repoCount = 1;
      }
      return {
        ...acc,
        [prev.node.name]: {
          name: prev.node.name,
          color: prev.node.color,
          size: langSize,
          count: repoCount,
        },
      };
    }, {});

  Object.keys(repoNodes).forEach((name) => {
    // cálculo del índice de comparación
    repoNodes[name].size =
      Math.pow(repoNodes[name].size, size_weight) *
      Math.pow(repoNodes[name].count, count_weight);
  });

  const topLangs = Object.keys(repoNodes)
    .sort((a, b) => repoNodes[b].size - repoNodes[a].size)
    .reduce((result, key) => {
      result[key] = repoNodes[key];
      return result;
    }, {});

  return topLangs;
};

export { fetchTopLanguages };
export default fetchTopLanguages;
