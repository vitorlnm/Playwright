// @ts-check
const { test, expect } = require('@playwright/test');

test('Acessar a página de Histórico do YouTube', async ({ page }) => {
  // Acessa o YouTube
  await page.goto('https://www.youtube.com');

  // Aceitar cookies, se necessário
  const aceitarCookies = page.locator('button:has-text("Aceitar tudo")');
  if (await aceitarCookies.isVisible()) {
    await aceitarCookies.click();
  }

  // Aguarda a página carregar
  await page.waitForLoadState('domcontentloaded');

  // Clica no menu de navegação lateral
  const menuButton = page.locator('button[aria-label="Guia"]');
  if (await menuButton.isVisible()) {
    await menuButton.click();
  }

  // Aguarda o menu aparecer
  await page.waitForTimeout(1000);

  // Localiza o botão "Histórico" pelo texto visível (independente do idioma)
  const historicoButton = page.locator('a:has-text("Histórico"), a:has-text("History")'); 

  // Aguarda até que o botão de Histórico esteja visível
  await historicoButton.waitFor({ state: 'visible', timeout: 5000 });

  // Clica no botão "Histórico"
  await historicoButton.click();

  // Aguarda até que a URL mude para a página de Histórico
  await expect(page).toHaveURL(/.*history.*/);

  console.log('Página de Histórico acessada com sucesso!');
});
