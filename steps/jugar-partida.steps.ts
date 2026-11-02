import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { Given, When, Then } = createBdd();

Given("que abro la aplicación con la palabra {string}", async ({ page }, palabra: string) => {
  await page.goto(`/?word=${palabra}`);
});

When("inicio la partida", async ({ page }) => {
  await page.getByRole("button", { name: "Jugar" }).click();
});

When("arriesgo la letra {string}", async ({ page }, letra: string) => {
  await page.getByRole("textbox", { name: "Letra" }).fill(letra);
  await page.getByRole("button", { name: "Arriesgar" }).click();
});

Then("veo la palabra {string}", async ({ page }, palabra: string) => {
  await expect(page.getByTestId("palabra")).toHaveText(palabra);
});

Then("veo {string} vidas", async ({ page }, vidas: string) => {
  await expect(page.getByTestId("vidas")).toHaveText(vidas);
});

Then("veo el mensaje {string}", async ({ page }, mensaje: string) => {
  await expect(page.getByTestId("resultado")).toHaveText(mensaje);
});

