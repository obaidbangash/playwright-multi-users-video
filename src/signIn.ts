import { Page } from '@playwright/test';

interface SignInOptions {
  url: string;
  emailSelector: string;
  passwordSelector: string;
  submitSelector: string;
  successSelector?: string;
  email: string;
  password: string;
}

export async function signIn(page: Page, opts: SignInOptions) {
  console.log(page, opts);
  await page.goto(opts.url);
  await page.fill(opts.emailSelector, opts.email);
  await page.fill(opts.passwordSelector, opts.password);
  await page.click(opts.submitSelector);
  if (opts.successSelector) {
    await page.waitForSelector(opts.successSelector, { timeout: 100000 });
  }
}
