import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { Given, When, Then } = createBdd();

Given("que abro la aplicación con la palabra {string}", async ({ page }, palabra: string) => {
  await page.goto(`/?word=${palabra}`);
});

When("inicio la partida", async ({ page }) => {
  await page.getByRole("button", { name: "Jugar" }).click();
});

Then("veo la palabra {string}", async ({ page }, palabra: string) => {
  await expect(page.getByTestId("palabra")).toHaveText(palabra);
});

Then("veo {string} vidas", async ({ page }, vidas: string) => {
  await expect(page.getByTestId("vidas")).toHaveText(vidas);
});

