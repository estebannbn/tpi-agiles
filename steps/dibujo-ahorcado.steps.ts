import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { Then } = createBdd();

Then("veo la parte {string}", async ({ page }, parte: string) => {
  await expect(page.getByTestId(`parte-${parte}`)).toBeVisible();
});

Then("no veo la parte {string}", async ({ page }, parte: string) => {
  await expect(page.getByTestId(`parte-${parte}`)).toHaveCount(0);
});
