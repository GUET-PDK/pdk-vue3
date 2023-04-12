import { createRouter, createWebHistory } from 'vue-router'
import login from '@/views/login.vue'
import admin from '@/views/layout/admin.vue'
const NotFound = () => import('@/views/404.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'admin',
      component: admin,
      // 子路由

    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        title: '登录'
      }
    },

    // 404页面
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    },
  ]
})

export default router
