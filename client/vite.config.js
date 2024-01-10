import million from 'million/compiler';
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    million.vite({ auto: true })],
});
 
