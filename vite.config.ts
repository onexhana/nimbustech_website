import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0'  // 모든 IP에서 접근 가능하도록 함 (localhost가 아닌 외부 접속용)
  }
})
