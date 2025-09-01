import { test } from '@playwright/test';
import path from 'path';
import { signIn } from '../src/signIn';

function collectUsers() {
  const users: { email: string; password: string }[] = [];
  for (let i = 1; i <= 50; i++) {
    const email = process.env[`USER${i}_EMAIL`];
    const password = process.env[`USER${i}_PASSWORD`];
    if (email && password) {
      users.push({ email, password });
    }
  }
  return users;
}

test('Multiple users sign in and record videos', async ({ browser }) => {
  const users = collectUsers();
  if (users.length === 0) {
    throw new Error('No users defined in .env (USER1_EMAIL, USER1_PASSWORD, etc.)');
  }

  for (const [index, user] of users.entries()) {
    const context = await browser.newContext({
      recordVideo: { dir: path.resolve(`videos/user${index+1}`), size: { width: 1280, height: 720 } },
    });
    const page = await context.newPage();

    await signIn(page, {
      url: process.env.SIGNIN_URL!,
      emailSelector: process.env.SELECTOR_EMAIL!,
      passwordSelector: process.env.SELECTOR_PASSWORD!,
      submitSelector: process.env.SELECTOR_SUBMIT!,
      successSelector: process.env.SUCCESS_SELECTOR,
      email: user.email,
      password: user.password,
    });

    await context.close(); // finalize video
  }
});
