import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4000,
  },
  preview: {
    port: 4000,
  },
  plugins: [react()],
});
