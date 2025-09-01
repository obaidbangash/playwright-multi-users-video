# Playwright: Multi-User Sign-In with Video Capture

This repo spins up independent browser contexts for multiple users, signs them in,
and records **separate videos** to the local `videos/` folder.

## Quick Start

1. Install dependencies and Playwright browsers:
   ```bash
   npm install
   npx playwright install --with-deps
   ```

2. Copy `.env.example` and fill in with your app and user creds:
   ```bash
   cp .env.example .env
   # edit .env
   ```

3. Run the test:
   ```bash
   npx playwright test
   ```

4. Videos will be saved under `videos/user1/`, `videos/user2/`, …

## Scaling Users

- Define as many `USER{N}_EMAIL` and `USER{N}_PASSWORD` pairs as you like in `.env`.
- The test automatically loops through all defined users.

## Example .env

```env
SIGNIN_URL=https://lykas-v2-dev.web.app/auth/login
SELECTOR_EMAIL=input[name="email"]
SELECTOR_PASSWORD=input[name="password"]
SELECTOR_SUBMIT=button[type="submit"]
SUCCESS_SELECTOR=nav

USER1_EMAIL=alice@example.com
USER1_PASSWORD=pass1
USER2_EMAIL=bob@example.com
USER2_PASSWORD=pass2
USER3_EMAIL=charlie@example.com
USER3_PASSWORD=pass3
```
