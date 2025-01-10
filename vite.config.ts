import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// Vytvoř konfiguraci pro Vite
export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
