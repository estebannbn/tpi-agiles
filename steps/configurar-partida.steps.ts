import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { When, Then } = createBdd();

When(
  "elijo un tiempo de partida de {string}",
  async ({ page }, duracion: string) => {
    await page
      .getByRole("radiogroup", { name: "Tiempo de partida" })
      .getByRole("radio", { name: duracion, exact: true })
      .check();
  },
);

Then("veo el reloj en {string}", async ({ page }, tiempo: string) => {
  await expect(page.getByTestId("reloj")).toHaveText(tiempo);
});
