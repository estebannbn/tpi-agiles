import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { When, Then } = createBdd();

When(
  "elijo un tiempo de partida de {string}",
  async ({ page }, duracion: string) => {
    await page
      .getByRole("radiogroup", { name: "Tiempo de partida" })
      .getByRole("radio", { name: duracion })
      .check();
  },
);

Then(
  "se muestra el tiempo de partida {string}",
  async ({ page }, duracion: string) => {
    await expect(
      page
        .getByRole("radiogroup", { name: "Tiempo de partida" })
        .getByRole("radio", { name: duracion }),
    ).toBeChecked();
  },
);
