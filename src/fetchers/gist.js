// @ts-check

import { retryer } from "../common/retryer.js";
import { MissingParamError } from "../common/error.js";
import { request } from "../common/http.js";

const QUERY = `
query gistInfo($gistName: String!) {
    viewer {
        gist(name: $gistName) {
            description
            owner {
                login
            }
            stargazerCount
            forks {
                totalCount
            }
            files {
                name
                language {
                    name
                }
                size
            }
        }
    }
}
`;

/**
 * Obtenedor de datos de gist.
 *
 * @param {object} variables Variables del obtenedor.
 * @param {string} token Token de GitHub.
 * @returns {Promise<import('axios').AxiosResponse>} La respuesta.
 */
const fetcher = async (variables, token) => {
  return await request(
    { query: QUERY, variables },
    { Authorization: `token ${token}` },
  );
};

/**
 * @typedef {{ name: string; language: { name: string; }, size: number }} GistFile Gist file.
 */

/**
 * Esta función calcula el lenguaje primario de un gist por tamaño de archivos.
 *
 * @param {GistFile[]} files Archivos.
 * @returns {string} Lenguaje primario.
 */
const calculatePrimaryLanguage = (files) => {
  /** @type {Record<string, number>} */
  const languages = {};

  for (const file of files) {
    if (file.language) {
      if (languages[file.language.name]) {
        languages[file.language.name] += file.size;
      } else {
        languages[file.language.name] = file.size;
      }
    }
  }

  let primaryLanguage = Object.keys(languages)[0];
  for (const language in languages) {
    if (languages[language] > languages[primaryLanguage]) {
      primaryLanguage = language;
    }
  }

  return primaryLanguage;
};

/**
 * @typedef {import('./types').GistData} GistData Gist data.
 */

/**
 * Obtiene información de gist de GitHub por ID de gist dado.
 *
 * @param {string} id ID de gist de GitHub.
 * @returns {Promise<GistData>} Datos de gist.
 */
const fetchGist = async (id) => {
  if (!id) {
    throw new MissingParamError(["id"], "/api/gist?id=GIST_ID");
  }
  const res = await retryer(fetcher, { gistName: id });
  if (res.data.errors) {
    throw new Error(res.data.errors[0].message);
  }
  if (!res.data.data.viewer.gist) {
    throw new Error("Gist no encontrado");
  }
  const data = res.data.data.viewer.gist;
  return {
    name: data.files[Object.keys(data.files)[0]].name,
    nameWithOwner: `${data.owner.login}/${
      data.files[Object.keys(data.files)[0]].name
    }`,
    description: data.description,
    language: calculatePrimaryLanguage(data.files),
    starsCount: data.stargazerCount,
    forksCount: data.forks.totalCount,
  };
};

export { fetchGist };
export default fetchGist;
