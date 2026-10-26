import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Own port so this site doesn't collide with other local Vite apps on the default 5173.
  server: { port: 5180, open: true },
  preview: { port: 4180, open: true },
  build: {
    // public/assets/docs holds ~600 MB of filings; keep Vite's own bundles out of that folder.
    assetsDir: 'static',
  },
});
