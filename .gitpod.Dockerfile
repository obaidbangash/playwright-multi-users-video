FROM gitpod/workspace-full

# Install Playwright dependencies
RUN npx playwright install-deps
