# Run in Gitpod

You can run this Playwright multi-user sign-in test directly in your browser using Gitpod.

## Steps

1. Push this repo to GitHub (e.g., `playwright-multi-users-video`).
2. Open the following URL in your browser, replacing `<your-username>` and `<your-repo>`:

   ```
   https://gitpod.io/#https://github.com/<your-username>/<your-repo>
   ```

3. Gitpod will launch:
   - Install Node.js dependencies and Playwright browsers
   - Run the test automatically (`npx playwright test`)
4. Videos will be saved in the `videos/` folder in the Gitpod file tree — right-click to **Download**.

## Notes

- Update `.env` with your user credentials inside Gitpod before running if needed.
- You can re-run tests anytime from the Gitpod terminal:
  ```bash
  npx playwright test
  ```