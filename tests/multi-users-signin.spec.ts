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

test('Multiple users sign in, land on dashboard, and click Trust', async ({ browser }) => {
  const users = collectUsers().length
    ? collectUsers()
    : [
        {
          email: 'obaidkhaan804+unit1@gmail.com',
          password: 'Password@123',
        },
      ]; // fallback static user

  for (const [index, user] of users.entries()) {
    const context = await browser.newContext({
      recordVideo: { dir: path.resolve(`videos/user${index + 1}`), size: { width: 1280, height: 720 } },
    });
    const page = await context.newPage();

    // 🔹 Step 1: Sign in
    await signIn(page, {
      url: 'https://lykas-v2-dev.web.app/auth/login',
      emailSelector: 'input[name="email"]',
      passwordSelector: 'input[name="password"]',
      submitSelector: 'button[type="submit"]',
      successSelector: '#app',
      email: user.email,
      password: user.password,
    });

    // Utility: wait for SSE event with specific HTMLid active = true
async function waitForSSEActive(page:any, htmlId: string, timeout = 60000) {
  const start = Date.now();

  while (Date.now() - start < timeout) {
    const response = await page.evaluate(() => {
      // app likely stores SSE messages somewhere in memory
      // expose it via window for Playwright to read
      return (window as any).__LATEST_SSE_EVENT__;
    });

    console.log('SSE Response:', response);
    if (response && Array.isArray(response)) {
      const target = response.find((e: any) => e.HTMLid === htmlId);
      if (target?.active === true) {
        return; // ✅ allowed to proceed
      }
    }

    await page.waitForTimeout(1000); // retry every second
  }

  throw new Error(`Timed out waiting for SSE ${htmlId} active=true`);
}


     await page.waitForTimeout(5000); // wait for potential redirects
    

     await page.getByText('Waiting Room', { exact: true });

    // 🔹 Step 3: Wait for Trust page to load (adjust selector as needed)

    await page.waitForTimeout(1000);

    await page.getByText('Join meeting', { exact: true }).click();

    await page.waitForTimeout(2000);
  
    await page.getByText('Let’s make you a LYKAS pro!', { exact: true }).click();

    
    await page.getByText('Get started', { exact: true }).click();

    await waitForSSEActive(page, "host_done_with_overview");
    

    await page.fill('input[name="initials"]', 'test');

    await page.waitForTimeout(1000); 

    await page.getByText('Save', { exact: true }).click();

    await page.waitForTimeout(1000); 

    await page.getByText('Proceed', { exact: true }).click();

    await waitForSSEActive(page, "host_done_with_disclaimer");

    // Done
    await context.close(); // this finalizes & saves the video
  }
});
