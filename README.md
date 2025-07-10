# OpenPaddle

This is the repository for the **OpenPaddle** project, a community-designed, transparently-built pickleball paddle. The goal is to make great gear accessible without inflated margins, proving open-source principles can work for physical products.

**Visit the live site: [https://ebanux.github.io/openpaddle/](https://ebanux.github.io/openpaddle/)**

This project is built with [Docusaurus](https://docusaurus.io/), a modern static website generator.

## 🚀 Local Development

To get started with local development:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/ebanux/openpaddle.git
    cd openpaddle
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run start
    ```

This command starts a local development server and opens up a browser window at `http://localhost:3000`. Most changes are reflected live without having to restart the server.

## 📦 Building for Production

To generate a static production build of the site:

```bash
npm run build
```

The static files will be placed in the `build/` directory.

## 🚢 Deployment to GitHub Pages

This repository is configured for easy deployment to GitHub Pages.

### Prerequisites

- You must have push access to the `ebanux/openpaddle` repository.
- Your local Git client must be configured with your GitHub credentials.

### How to Deploy

To deploy the website, run the following single command from your local project directory:

```bash
npm run deploy
```

This command will automatically build the site and push the contents of the `build` directory to the `gh-pages` branch on the remote repository.

### GitHub Repository Configuration

For the deployed site to be visible, the GitHub repository's **Pages** settings must be configured correctly:

1.  Go to the repository's **Settings** tab on GitHub.
2.  In the left sidebar, click on **Pages**.
3.  Under "Build and deployment", set the **Source** to **Deploy from a branch**.
4.  Under **Branch**, select `gh-pages` and `/ (root)` for the folder, then save.

After a successful deployment, the site will be updated at [https://ebanux.github.io/openpaddle/](https://ebanux.github.io/openpaddle/). It may take a few minutes for changes to go live.
