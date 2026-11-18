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

When("espero un segundo", async ({ page }) => {
  await page.waitForTimeout(1100);
});

Then("veo el reloj en {string}", async ({ page }, tiempo: string) => {
  await expect(page.getByTestId("reloj")).toHaveText(tiempo);
});

Then("el reloj avanza", async ({ page }) => {
  await expect(page.getByTestId("reloj")).not.toHaveText("10:00", { timeout: 3000 });
});

Then("el reloj vuelve a {string}", async ({ page }, tiempo: string) => {
  await expect(page.getByTestId("reloj")).toHaveText(tiempo, { timeout: 400 });
});

Then("se muestran {string} intentos", async ({ page }, cantidad: string) => {
  await expect(page.getByText(`${cantidad} intentos`)).toBeVisible();
});
