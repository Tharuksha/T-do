import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   host: '172.16.16.36',  // Replace with your actual local IP
  //   port: 3000              // Optional: set a different port if needed
  // }
})
