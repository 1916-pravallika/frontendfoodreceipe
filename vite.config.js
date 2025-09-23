import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // allows access from external IPs
    port: 8082,       // or whatever port your backend is running on
    proxy: {
      '/api': {
        target: 'http://107.20.131.86:8082',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
