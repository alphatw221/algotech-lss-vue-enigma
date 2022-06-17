import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import mkcert from 'vite-plugin-mkcert'


// https://vitejs.dev/config/
export default defineConfig({
  base:'/',
  build:{
    outDir:'./static',
    manifest:true,
    rollupOptions: {
      input: {lss:'./src/main.js'}
    }
  },
  server: { 
    https: true ,
    // https: false ,
    cors: true,
    host: true
  },
  plugins: [ vue(), mkcert() ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
