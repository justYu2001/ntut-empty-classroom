import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import Pages from 'vite-plugin-pages';
import Components from 'unplugin-vue-components/vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin(),
    Components(),
    Pages(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  }
})
