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

When("elijo {string}", async ({ page }, opcion: string) => {
  await page
    .getByRole("group", { name: "Cantidad de intentos" })
    .getByRole("radio", { name: opcion, exact: true })
    .check();
});

Then("veo el reloj en {string}", async ({ page }, tiempo: string) => {
  await expect(page.getByTestId("reloj")).toHaveText(tiempo);
});

Then("se muestran {string} intentos", async ({ page }, cantidad: string) => {
  await expect(page.getByText(`${cantidad} intentos`)).toBeVisible();
});
