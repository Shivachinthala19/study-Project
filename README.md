# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## 🚀 Deployment

The fastest way to publish this application to the public is using **Render** or **Vercel**.

### Option 1: Render (Recommended)
1. Push your code to a GitHub repository.
2. Log in to [Render.com](https://render.com/).
3. Click **New +** > **Blueprint**.
4. Connect your GitHub repository.
5. Render will automatically detect the `render.yaml` file and deploy the site.

### Option 2: Vercel / Netlify
1. Push your code to GitHub.
2. Import the project in Vercel/Netlify.
3. The settings should be auto-detected:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Local Production Build
To test the production build locally:
```bash
npm run build
npm run preview
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
