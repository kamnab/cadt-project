import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import mkcert from 'vite-plugin-mkcert' // 3

// https://vitejs.dev/config/
export default defineConfig({
  server: { https: true }, // 2- to use this
  preview: {
    port: 5173,
  },
  plugins: [
    mkcert(), // 1- npm i vite-plugin-mkcert -D
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
