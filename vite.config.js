import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    VitePWA({
    registerType: 'autoUpdate',

    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      name: 'Egg Sizing',
      short_name: 'egg-size-mobile',
      description: 'Canny Edge Detection with Aruco Marker',
      start_url: '/capture',
      scope: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#2196F3',
      icons: [
        {
          src: 'pwa-64x64.png',
          sizes: '64x64',
          type: 'image/png',
        },
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: 'maskable-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        },
      ]
    },

    workbox: {
      globPatterns: [
        '**/*.{js,css,html,svg,png,ico,json}'
      ]
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
})