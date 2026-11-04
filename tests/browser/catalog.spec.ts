import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync, mkdirSync } from 'node:fs';
const index = JSON.parse(readFileSync('storybook-static/index.json', 'utf8'));
type Entry = { id: string; title: string; name: string; type: string };
const stories = Object.values(index.entries) as Entry[];
async function open(page: Page, id: string, theme = 'light') {
  await page.goto(`/iframe.html?id=${id}&viewMode=story&globals=theme:${theme}`);
  await expect(page.locator('#storybook-root .story-root')).toBeVisible();
  await expect(page.locator('.sb-errordisplay')).not.toBeVisible();
}
for (const story of stories.filter((s) => s.type === 'story' && s.name === 'Default'))
  test(`component ${story.title}: renders and has no automated accessibility violations`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await open(page, story.id);
    const results = await new AxeBuilder({ page })
      .include('.story-root')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      results.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
    ).toEqual([]);
    expect(errors).toEqual([]);
  });
for (const theme of ['light', 'dark'])
  for (const width of [320, 393, 844, 1440])
    test(`home ${theme} ${width}: no horizontal overflow and usable shell`, async ({ page }) => {
      await page.setViewportSize({ width, height: width === 844 ? 390 : 900 });
      await open(page, 'templates-jornadas--home', theme);
      await expect(
        page.getByRole('heading', { name: 'O que vamos construir hoje?' }),
      ).toBeVisible();
      const size = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        width: innerWidth,
        height: innerHeight,
        scrollHeight: document.documentElement.scrollHeight,
      }));
      expect(size.scroll).toBeLessThanOrEqual(size.width + 1);
      expect(size.scrollHeight).toBeLessThanOrEqual(size.height + 2);
      await expect(page.getByRole('navigation', { name: 'Navegação móvel' })).toBeVisible({
        visible: width <= 900,
      });
      const a11y = await new AxeBuilder({ page })
        .include('.story-root')
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      expect(
        a11y.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
      ).toEqual([]);
      if (theme === 'light' && (width === 1440 || width === 393)) {
        mkdirSync('docs/images', { recursive: true });
        await page.screenshot({
          path: `docs/images/home-${width === 1440 ? 'desktop' : 'mobile'}.png`,
        });
      }
    });
for (const name of ['projects', 'conversation', 'workspace', 'canvas', 'agenda', 'offline'])
  for (const width of [320, 1440])
    test(`template ${name} ${width}: fits and is accessible`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await open(page, `templates-jornadas--${name}`);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
      ).toBe(true);
      const r = await new AxeBuilder({ page })
        .include('.story-root')
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      expect(r.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) }))).toEqual(
        [],
      );
    });
test('dialog traps focus, closes with Escape and restores trigger', async ({ page }) => {
  await open(page, 'organismos-dialog--default');
  const trigger = page.getByRole('button', { name: 'Abrir painel' });
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(page.getByRole('button', { name: 'Fechar painel' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByLabel('Nome do projeto')).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(page.getByRole('button', { name: 'Fechar painel' })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(page.getByRole('button', { name: 'Continuar' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});
test('mobile dark dialog is bottom anchored, scrollable and themed', async ({ page }) => {
  await page.setViewportSize({ width: 393, height: 700 });
  await open(page, 'organismos-dialog--default', 'dark');
  await page.getByRole('button', { name: 'Abrir painel' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toHaveAttribute('data-theme', 'dark');
  const rect = await dialog.boundingBox();
  expect(rect!.x).toBe(0);
  expect(Math.abs(rect!.y + rect!.height - 700)).toBeLessThan(2);
  const r = await new AxeBuilder({ page })
    .include('[role=dialog]')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(r.violations.map((v) => v.id)).toEqual([]);
});
test('tabs support arrow keys and skip disabled items', async ({ page }) => {
  await open(page, 'moléculas-tabs--default');
  await page.getByRole('tab', { name: 'Visão geral' }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Materiais' })).toBeFocused();
  await expect(page.getByRole('tabpanel')).toContainText('Arquivos e referências');
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Visão geral' })).toBeFocused();
});
test('composer rejects whitespace and reports a submitted message', async ({ page }) => {
  await open(page, 'organismos-composer--default');
  const send = page.getByRole('button', { name: 'Enviar' });
  await expect(send).toBeDisabled();
  await page.getByLabel('Mensagem para o agente').fill('   ');
  await expect(send).toBeDisabled();
  await page.getByLabel('Mensagem para o agente').fill('Organize minhas referências');
  await send.click();
  await expect(page.getByRole('status')).toContainText('Organize minhas referências');
  await expect(page.getByLabel('Mensagem para o agente')).toHaveValue('');
  await expect(send).toBeDisabled();
});
test('projects create and search a local fixture', async ({ page }) => {
  await open(page, 'templates-jornadas--projects');
  await page.getByRole('button', { name: 'Novo projeto' }).click();
  await page.getByLabel('Nome do projeto').fill('Projeto de verificação');
  await page.getByRole('button', { name: 'Salvar projeto' }).click();
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await page.getByLabel('Buscar projetos').fill('verificação');
  await expect(page.getByRole('heading', { name: 'Projeto de verificação' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Aurora', exact: true })).not.toBeVisible();
});
test('dark dropdown remains themed and returns focus', async ({ page }) => {
  await open(page, 'moléculas-dropdownmenu--default', 'dark');
  const trigger = page.getByRole('button', { name: 'Ações' });
  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('menu')).toHaveAttribute('data-theme', 'dark');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
});
test('reduced motion removes decorative animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await open(page, 'átomos-spinner--default');
  expect(await page.locator('.cv-spinner').evaluate((e) => getComputedStyle(e).animationName)).toBe(
    'none',
  );
});
