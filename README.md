<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally or publish it as a GitHub Pages site.

View your app in AI Studio: https://ai.studio/apps/temp/1

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies: `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key.
3. Run the app: `npm run dev`

## Continuous deployment to GitHub Pages

Pushes to `main` automatically build and deploy the production site via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

1. In your GitHub repository, navigate to **Settings → Secrets and variables → Actions** and add a repository secret named `GEMINI_API_KEY` with your Gemini API key so the workflow can build the app.
2. Enable GitHub Pages by setting the **Source** to **GitHub Actions** the first time the workflow runs (GitHub usually prompts you automatically).
3. Merge or push to `main` (or run the workflow manually from the **Actions** tab). The job installs dependencies, runs `npm run build`, and publishes the generated `dist/` folder.

Once the deployment completes, your live app is available at `https://<your-github-username>.github.io/<repository-name>/`. Replace the placeholders with your actual GitHub username and repository name to share a clickable link where anyone can try the planner.
