import { describe, expect, it } from "@jest/globals";
import { queryByTestId } from "@testing-library/dom";
import "@testing-library/jest-dom";
import { renderWakatimeCard } from "../src/cards/wakatime.js";
import { wakaTimeData } from "./fetchWakatime.test.js";

describe("Prueba de renderWakatimeCard", () => {
  it("debe renderizar correctamente", () => {
    const card = renderWakatimeCard(wakaTimeData.data);
    expect(card).toMatchSnapshot();
  });

  it("debe renderizar correctamente con diseño compacto", () => {
    const card = renderWakatimeCard(wakaTimeData.data, { layout: "compact" });

    expect(card).toMatchSnapshot();
  });

  it("debe renderizar correctamente con diseño compacto y langs_count", () => {
    const card = renderWakatimeCard(wakaTimeData.data, {
      layout: "compact",
      langs_count: 2,
    });

    expect(card).toMatchSnapshot();
  });

  it("debe ocultar lenguajes cuando se pasa hide", () => {
    document.body.innerHTML = renderWakatimeCard(wakaTimeData.data, {
      hide: ["YAML", "Other"],
    });

    expect(queryByTestId(document.body, /YAML/i)).toBeNull();
    expect(queryByTestId(document.body, /Other/i)).toBeNull();
    expect(queryByTestId(document.body, /TypeScript/i)).not.toBeNull();
  });

  it("debe renderizar traducciones", () => {
    document.body.innerHTML = renderWakatimeCard({}, { locale: "cn" });
    expect(document.getElementsByClassName("header")[0].textContent).toBe(
      "WakaTime 周统计",
    );
    expect(
      document.querySelector('g[transform="translate(0, 0)"]>text.stat.bold')
        .textContent,
    ).toBe("WakaTime 用户个人资料未公开");
  });

  it("debe renderizar sin bordes redondeados", () => {
    document.body.innerHTML = renderWakatimeCard(wakaTimeData.data, {
      border_radius: "0",
    });
    expect(document.querySelector("rect")).toHaveAttribute("rx", "0");
    document.body.innerHTML = renderWakatimeCard(wakaTimeData.data, {});
    expect(document.querySelector("rect")).toHaveAttribute("rx", "4.5");
  });

  it('debe mostrar el mensaje "no hay actividad de codificación esta semana"', () => {
    document.body.innerHTML = renderWakatimeCard(
      {
        ...wakaTimeData.data,
        languages: undefined,
      },
      {},
    );
    expect(document.querySelector(".stat").textContent).toBe(
      "No hay actividad de codificación esta semana",
    );
  });

  it("debe mostrar el mensaje de inactividad con diseño compacto", () => {
    document.body.innerHTML = renderWakatimeCard(
      {
        ...wakaTimeData.data,
        languages: undefined,
      },
      {
        layout: "compact",
      },
    );
    expect(document.querySelector(".stat").textContent).toBe(
      "No hay actividad de codificación esta semana",
    );
  });

  it("debe renderizar correctamente con formato de porcentaje", () => {
    const card = renderWakatimeCard(wakaTimeData.data, {
      display_format: "percent",
    });
    expect(card).toMatchSnapshot();
  });
});
