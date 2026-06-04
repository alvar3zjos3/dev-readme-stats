// @ts-check

import { describe, expect, it } from "@jest/globals";
import { queryByTestId } from "@testing-library/dom";
import "@testing-library/jest-dom/jest-globals";
import { renderError } from "../src/common/render.js";

describe("Test render.js", () => {
  it("should test renderError", () => {
    document.body.innerHTML = renderError({ message: "Algo salió mal" });
    expect(
      queryByTestId(document.body, "message")?.children[0],
    ).toHaveTextContent(/Algo salió mal/gim);
    expect(
      queryByTestId(document.body, "message")?.children[1],
    ).toBeEmptyDOMElement();

    // Secondary message
    document.body.innerHTML = renderError({
      message: "Algo salió mal",
      secondaryMessage: "Mensaje secundario",
    });
    expect(
      queryByTestId(document.body, "message")?.children[1],
    ).toHaveTextContent(/Mensaje secundario/gim);
  });
});
