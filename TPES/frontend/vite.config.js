import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
<<<<<<< HEAD


export default {
  server: {
      proxy: {
          '/api': 'http://localhost:5000',
      },
  },
};
=======
>>>>>>> e7e3f510b8699f268d099474f9f34f7e5006b269
