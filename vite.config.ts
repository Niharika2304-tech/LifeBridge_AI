import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { lifebridgeApiPlugin } from './server/apiPlugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), lifebridgeApiPlugin()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: false
  },
  preview: {
    host: '0.0.0.0',
    port: 3000
  }
});
