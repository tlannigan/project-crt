import { expect, test } from '@playwright/test';
import { expectNoAxeViolations } from './support/axe';

test('home renders a styled @tlannigan/crt component with no axe violations', async ({ page }) => {
  await page.goto('/');

  const heading = page.getByRole('heading', { name: 'Home', level: 1 });
  await expect(heading).toBeVisible();

  // CrtMonitor wraps its children in one div, so its root is main's grandparent
  const monitor = page.getByRole('main').locator('xpath=../..');
  const { color, foreground, backgroundColor } = await monitor.evaluate((el) => {
    const probe = document.createElement('span');
    probe.style.color = 'var(--foreground)';
    el.parentElement?.append(probe);
    const theme = getComputedStyle(probe).color;
    probe.remove();
    const style = getComputedStyle(el);
    return { color: style.color, foreground: theme, backgroundColor: style.backgroundColor };
  });

  expect(color).toBe(foreground);
  // bg-background comes from the library's CSS, not inherited from the Theme
  expect(backgroundColor).toBe('rgb(7, 7, 7)');

  await expectNoAxeViolations(page);
});
