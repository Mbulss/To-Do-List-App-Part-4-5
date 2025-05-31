import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    server: {
      proxy: {
        "/service": {
          target: mode === "development"
            ? "http://localhost:5000"
            : "https://e2425-wads-l4ccg2-server-haniif.csbihub.id",
          changeOrigin: true,
          secure: mode !== "development",
          ws: true,
        },
      },
    },
    build: {
      outDir: "dist",
    },
    plugins: [react()],
  }
})