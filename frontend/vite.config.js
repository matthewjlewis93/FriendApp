import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    proxy: {
      "/api": {
        target: "https://0jc2qnnc-8001.usw3.devtunnels.ms",
        changeOrigin: true,
      },
    },
  },
});
