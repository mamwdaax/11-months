import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      // Allow serving files from the user's Downloads folder for the background media
      allow: [
        '..',
        'C:/Users/hardi/Downloads'
      ]
    }
  }
})
