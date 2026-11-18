import { expect, Page } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { Then } = createBdd();

function getPartida(page: Page, posicion: string) {
  const index = posicion === "primera" ? 0 : posicion === "segunda" ? 1 : parseInt(posicion, 10) - 1;
  return page.getByTestId("partida").nth(index);
}

Then("en la {word} partida del resumen la palabra es {string}", async ({ page }, posicion: string, palabra: string) => {
  await expect(getPartida(page, posicion).getByTestId("resumen-palabra")).toHaveText(palabra);
});

Then("en la {word} partida del resumen el resultado es {string}", async ({ page }, posicion: string, resultado: string) => {
  await expect(getPartida(page, posicion).getByTestId("resumen-resultado")).toHaveText(resultado);
});

Then(
  /en la (\w+) partida del resumen (?:la cantidad de errores es|los errores son) "(.*)"/,
  async ({ page }, posicion: string, errores: string) => {
    await expect(getPartida(page, posicion).getByTestId("resumen-errores")).toHaveText(errores);
  }
);

Then(
  /en la (\w+) partida del resumen (?:las letras fallidas son|las fallidas son|la letra fallida es) "(.*)"/,
  async ({ page }, posicion: string, fallidas: string) => {
    await expect(getPartida(page, posicion).getByTestId("resumen-fallidas")).toHaveText(fallidas);
  }
);

Then(
  "en la {word} partida del resumen el tiempo máximo es {string}",
  async ({ page }, posicion: string, tiempo: string) => {
    await expect(getPartida(page, posicion).getByTestId("resumen-tiempo-maximo")).toHaveText(tiempo);
  },
);
