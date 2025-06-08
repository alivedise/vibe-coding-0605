import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from 'vite-plugin-pwa';
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vibe-coding-0605/',
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,vue,txt,woff2}'] // Ensure all assets are cached
      },
      manifest: {
        name: 'Vibe City Simulator',
        short_name: 'VibeCitySim',
        description: 'A Vue-based city simulation game.',
        theme_color: '#4DBA87',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/vibe-coding-0605/',
        start_url: '/vibe-coding-0605/',
        icons: [
          {
            src: 'img/icons/pwa-192x192.png', // You'll need to create this icon
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'img/icons/pwa-512x512.png', // You'll need to create this icon
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'img/icons/pwa-512x512.png', // Maskable icon
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
