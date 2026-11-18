import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { Given, Then } = createBdd();

Given(
  "que abro la aplicación con la biblioteca {string} y azar {string}",
  async ({ page }, biblioteca: string, azar: string) => {
    await page.goto(`/?biblioteca=${biblioteca}&azar=${azar}`);
  },
);

Then("no veo la palabra {string}", async ({ page }, palabra: string) => {
  await expect(page.getByTestId("palabra")).not.toHaveText(palabra);
});
