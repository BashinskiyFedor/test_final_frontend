import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    // Запросы /api проксируются на FastAPI, CORS в dev не нужен.
    proxy: { '/api': 'http://localhost:8000' },
  },
})
