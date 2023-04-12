/*
 * @Author: liangtd
 * @Date: 2023-04-12 08:37:46
 * @LastEditors: liangtd
 * @LastEditTime: 2023-04-12 11:58:15
 * @Description: Vite配置
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
    
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})