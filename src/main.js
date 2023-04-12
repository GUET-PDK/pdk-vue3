/*
 * @Author: liangtd
 * @Date: 2023-04-12 08:37:46
 * @LastEditors: liangtd
 * @LastEditTime: 2023-04-12 08:46:49
 * @Description: 
 */
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'virtual:windi.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)

app.mount('#app')
