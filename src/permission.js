/*
 * @Author: liangtd
 * @Date: 2023-04-14 15:47:34
 * @LastEditors: liangtd
 * @LastEditTime: 2023-04-14 17:30:09
 * @Description: 全局导航守卫
 */
import { router, addRouters } from '@/router/index.js'
import store from 'vuex'
import NProgress from 'nprogress'
import { getToken } from '@/utils/token.js'
import { notification, menus } from '@/utils/common.js'

// 全局前置守卫
router.beforeEach(async (to, from) => {
    NProgress.start() // 开启进度条
    const token = getToken()

    // 没有登录则跳转回登录页
    if (!token && to.path != '/login') {
        notification("请先登录！", "error")
        return '/login'
    }

    // //防止重复登录
    // if (token && to.path == '/login') {
    //     notification("请勿重复登录！", "error")

    //     // 使用HTML5 模式无法获取from.path,使用Hash 模式则可以实现回退功能
    //     return from.path ? from.path : "/"
    // }

    // 用户登陆后，保存用户信息到vuex中
    let hasNewRoutes = false
    hasNewRoutes = addRouters(menus)
    // if (token && !store.state.user.id) {
    //     await store.dispatch("getUserIfon")
        
    // }

    // 设置页面标题
    document.title = to.meta.title ? to.meta.title : "GUET跑得快-后台管理系统"

    if (hasNewRoutes) return to.fullPath
})

// 全局后置守卫
router.afterEach((to, from) => {
    NProgress.done() // 关闭进度条
})

export default router