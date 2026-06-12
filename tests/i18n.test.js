import { describe, expect, it } from "@jest/globals";
import { I18n } from "../src/common/I18n.js";
import { statCardLocales } from "../src/translations.js";

describe("I18n", () => {
  it("debe devolver translated string", () => {
    const i18n = new I18n({
      locale: "es",
      translations: statCardLocales({ name: "Jose Alvarez", apostrophe: "s" }),
    });
    expect(i18n.t("statcard.title")).toBe(
      "Estadísticas de GitHub de Jose Alvarez",
    );
  });

  it("debe lanzar un error if translation string not found", () => {
    const i18n = new I18n({
      locale: "es",
      translations: statCardLocales({ name: "Jose Alvarez", apostrophe: "s" }),
    });
    expect(() => i18n.t("statcard.title1")).toThrow(
      "statcard.title1 Cadena de traducción no encontrada",
    );
  });

  it("debe lanzar un error if translation not found for locale", () => {
    const i18n = new I18n({
      locale: "chema",
      translations: statCardLocales({ name: "Jose Alvarez", apostrophe: "s" }),
    });
    expect(() => i18n.t("statcard.title")).toThrow(
      "'statcard.title' traducción no encontrada para el locale 'chema'",
    );
  });
});
