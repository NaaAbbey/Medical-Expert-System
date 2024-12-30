import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    server: {
        port: 5173, // Change to an available port
        proxy: {
            '/api': 'http://localhost:5000',
        },
    },
    plugins: [react()],
});
