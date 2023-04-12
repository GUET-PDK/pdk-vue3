/*
 * @Author: liangtd
 * @Date: 2023-04-12 08:37:46
 * @LastEditors: liangtd
 * @LastEditTime: 2023-04-12 21:10:19
 * @Description: 
 */
import { createApp } from 'vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'virtual:windi.css'

import FormDrawer from '@/components/table/FormDrawer.vue'

import App from './App.vue'

// 创建app 实例
const app = createApp(App)

app.use(router)
app.use(store)

app.use(ElementPlus)
// 全局注册组件
app.component('FormDrawer',FormDrawer)

app.mount('#app')
