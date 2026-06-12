import { afterEach, describe, expect, it } from "@jest/globals";
import "@testing-library/jest-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fetchTopLanguages } from "../src/fetchers/top-languages.js";

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

const data_langs = {
  data: {
    user: {
      repositories: {
        nodes: [
          {
            name: "test-repo-1",
            languages: {
              edges: [{ size: 100, node: { color: "#0f0", name: "HTML" } }],
            },
          },
          {
            name: "test-repo-2",
            languages: {
              edges: [{ size: 100, node: { color: "#0f0", name: "HTML" } }],
            },
          },
          {
            name: "test-repo-3",
            languages: {
              edges: [
                { size: 100, node: { color: "#0ff", name: "javascript" } },
              ],
            },
          },
          {
            name: "test-repo-4",
            languages: {
              edges: [
                { size: 100, node: { color: "#0ff", name: "javascript" } },
              ],
            },
          },
        ],
      },
    },
  },
};

const error = {
  errors: [
    {
      type: "NOT_FOUND",
      path: ["user"],
      locations: [],
      message: "No se pudo resolver el usuario con el login de 'noname'.",
    },
  ],
};

describe("FetchTopLanguages", () => {
  it("debe obtener correct language data while using the new calculation", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, data_langs);

    let repo = await fetchTopLanguages("alvar3zjos3", [], 0.5, 0.5);
    expect(repo).toStrictEqual({
      HTML: {
        color: "#0f0",
        count: 2,
        name: "HTML",
        size: 20.000000000000004,
      },
      javascript: {
        color: "#0ff",
        count: 2,
        name: "javascript",
        size: 20.000000000000004,
      },
    });
  });

  it("debe obtener correct language data while excluding the 'test-repo-1' repository", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, data_langs);

    let repo = await fetchTopLanguages("alvar3zjos3", ["test-repo-1"]);
    expect(repo).toStrictEqual({
      HTML: {
        color: "#0f0",
        count: 1,
        name: "HTML",
        size: 100,
      },
      javascript: {
        color: "#0ff",
        count: 2,
        name: "javascript",
        size: 200,
      },
    });
  });

  it("debe obtener correct language data while using the old calculation", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, data_langs);

    let repo = await fetchTopLanguages("alvar3zjos3", [], 1, 0);
    expect(repo).toStrictEqual({
      HTML: {
        color: "#0f0",
        count: 2,
        name: "HTML",
        size: 200,
      },
      javascript: {
        color: "#0ff",
        count: 2,
        name: "javascript",
        size: 200,
      },
    });
  });

  it("debe rank languages by the number of repositories they appear in", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, data_langs);

    let repo = await fetchTopLanguages("alvar3zjos3", [], 0, 1);
    expect(repo).toStrictEqual({
      HTML: {
        color: "#0f0",
        count: 2,
        name: "HTML",
        size: 2,
      },
      javascript: {
        color: "#0ff",
        count: 2,
        name: "javascript",
        size: 2,
      },
    });
  });

  it("debe lanzar un error específico error when user not found", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, error);

    await expect(fetchTopLanguages("alvar3zjos3")).rejects.toThrow(
      "No se pudo resolver el usuario con el login de 'noname'.",
    );
  });

  it("debe lanzar other errors with their message", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, {
      errors: [{ message: "Some test GraphQL error" }],
    });

    await expect(fetchTopLanguages("alvar3zjos3")).rejects.toThrow(
      "Some test GraphQL error",
    );
  });

  it("debe lanzar un error with specific message when error does not contain message property", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, {
      errors: [{ type: "TEST" }],
    });

    await expect(fetchTopLanguages("alvar3zjos3")).rejects.toThrow(
      "Algo salió mal al intentar recuperar los datos de lenguaje usando la API de GraphQL.",
    );
  });
});
