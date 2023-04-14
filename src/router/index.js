/*
 * @Author: liangtd
 * @Date: 2023-04-12 08:37:46
 * @LastEditors: liangtd
 * @LastEditTime: 2023-04-14 17:10:29
 * @Description: VueRouter路由配置
 */

import { createRouter, createWebHistory } from 'vue-router'
import login from '@/views/login.vue'
import admin from '@/views/layout/admin.vue'
import asyncRouters from './routers'
const NotFound = () => import('@/views/404.vue')

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'admin',
      component: admin,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        // todo 页面路由标题重命名未实现
        title: '登录页'
      }
    },
    // 404页面
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
      meta: {
        title: '404'
      }
    },
  ]
})

/**
 * @description: 动态添加路由的方法
 * @Date: 2023-04-14 14:39:56
 * @param {*} menus
 * @return {*} hasNewRouter
 */
export function addRouters(menus) {
  // 是否有新的路由 - 即是否存在二级菜单
  let hasNewRouter = false
  const findRouter = arr => {
    arr.forEach(item => {
      // 查找匹配的路由并添加到默认的路由的 child 当中
      let route = asyncRouters.find(e => e.path == item.frontpath)
      if (route && !router.hasRoute(route.path)) {
        router.addRoute('admin', route)
        hasNewRouter = true
      }

      // 如果有子路由则递归
      if (item.child && item.child.length > 0) {
        findRouter(item.child)
      }
    });
  }
  findRouter(menus)
  return hasNewRouter
}
