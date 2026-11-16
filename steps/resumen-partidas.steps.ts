import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { Then } = createBdd();

function getPartida(page: any, posicion: string) {
  const index = posicion === "primera" ? 0 : posicion === "segunda" ? 1 : parseInt(posicion, 10) - 1;
  return page.getByTestId("partida").nth(index);
}

Then("en la {word} partida del resumen la palabra es {string}", async ({ page }, posicion: string, palabra: string) => {
  await expect(getPartida(page, posicion).getByTestId("resumen-palabra")).toHaveText(palabra);
});

Then("en la {word} partida del resumen el resultado es {string}", async ({ page }, posicion: string, resultado: string) => {
  await expect(getPartida(page, posicion).getByTestId("resumen-resultado")).toHaveText(resultado);
});
