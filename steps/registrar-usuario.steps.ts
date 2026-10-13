import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";
const { Given, When, Then } = createBdd();

Given('que abro la aplicación', async ({ page }) => {
  await page.goto("/");
});

When('ingreso el nombre {string} y confirmo', async ({ page }, nombre: string) => {
  await page.getByRole("textbox", { name: /nombre/i }).fill(nombre);
  await page.getByRole("button", { name: /confirmar/i }).click();
});

Then('se muestra el nombre {string}', async ({ page }, nombre: string) => {
  await expect(page.getByRole("heading", { name: new RegExp(nombre, "i") })).toBeVisible();
});

Then('se muestra el mensaje {string}', async ({ page }, mensaje: string) => {
  await expect(page.getByText(mensaje)).toBeVisible();
});
