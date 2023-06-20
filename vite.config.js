/*
 * @Author: liangtd
 * @Date: 2023-04-12 08:37:46
 * @LastEditors: liangtd
 * @LastEditTime: 2023-04-12 16:26:15
 * @Description: Vite配置
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  // 配置插件
  plugins: [
    // 是否开启$ref，vue3.2语法糖
    vue({
      refTransform: true,
      reactivityTransform: true
    }),
    WindiCSS(),

  ],

  // 设置路径别名
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})