import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import mkcert from 'vite-plugin-mkcert'
import vueI18n from '@intlify/vite-plugin-vue-i18n'


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
  plugins: [ 
    vue(), 
    mkcert(),
    vueI18n({
      // you need to set i18n resource including paths !
      include: path.resolve(__dirname, './src/locales/**')
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
