import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HelloWorld.vue'
const NotFound = () => import('@/views/404.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    },
  ]
})

export default router
