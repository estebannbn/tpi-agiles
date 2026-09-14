import { createBdd } from "playwright-bdd";
const { Given, When, Then } = createBdd();

Given('que abro la aplicación', async ({ page }) => {
  await page.goto("/");
});

When('ingreso el nombre {string} y confirmo', async ({ page }, arg) => {
  // Step: Cuando ingreso el nombre "Ana" y confirmo
  // From: features\registrar-usuario.feature:13:13
});

Then('se muestra el nombre {string}', async ({ }, arg) => {
  // Step: Entonces se muestra el nombre "Ana"
  // From: features\registrar-usuario.feature:14:13
});

Then('se muestra el mensaje {string}', async ({ }, arg) => {
  // Step: Entonces se muestra el mensaje "El nombre no puede estar vacío"
  // From: features\registrar-usuario.feature:21:13
});
