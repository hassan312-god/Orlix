import { test, expect } from '@playwright/test';

test.describe('Orlix Admin', () => {
  test('displays dashboard hero', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Bienvenue sur Orlix Admin');
  });
});
