/*
 * @Author: liangtd
 * @Date: 2023-04-12 08:37:46
 * @LastEditors: liangtd
 * @LastEditTime: 2023-04-14 17:24:09
 * @Description: 项目入口文件
 */
import { createApp } from 'vue'
import router from './permission.js'
import store from './store/index.js'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'virtual:windi.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import FormDrawer from '@/components/table/FormDrawer.vue'

import App from './App.vue'

// 创建app 实例
const app = createApp(App)

app.use(router)
app.use(store)
app.use(ElementPlus)

// 全局引入elementplus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 全局注册组件
app.component('FormDrawer',FormDrawer)

app.mount('#app')
