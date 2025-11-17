import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'


// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@' : resolve(__dirname, 'src'),
      '~' : resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000,
    proxy: {
      //凡是以/api开头的请求都会被代理
      '/api': {
        target: 'http://8.140.227.150:8888',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/,'')
      },
    }
  }
})