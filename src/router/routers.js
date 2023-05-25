/*
 * @Author: liangtd
 * @Date: 2023-04-14 11:22:58
 * @LastEditors: liangtd
 * @LastEditTime: 2023-04-14 17:32:30
 * @Description: 左侧菜单栏子项路由配置
 */

// 主控台 （后台数据可视化面板）
const index = () => import('@/views/home/index.vue')

// 订单模块
const OrderList = () => import('@/views/order/list/index.vue')
// const CommentList = () => import('@/views/order/comment/index.vue')

// 用户模块
const UserList = () => import('@/views/user/list/index.vue')
// const UserCheck = () => import('@/views/user/check/index.vue')

// 骑手模块
const RiderList = () => import('@/views/rider/list/index.vue')
// const RiderRepeal = () => import('@/views/rider/repeal/index.vue')

// 其他模块
// const ImageList = () => import('@/views/other/picture/index.vue')
// const BellList = () => import('@/views/other/bell/index.vue')

// 系统设置
// const SettingBase = () => import('@/views/system/base/index.vue')

// 配置动态路由，匹配菜单动态添加路由
export default [
    {
        path: "/",
        name: "/",
        component: index,
        meta: {
            title: "GUET跑得快-后台首页"
        }
    },
    {
        path: "/order/list",
        name: "/order/list",
        component: OrderList,
        meta: {
            title: "订单列表"
        }
    },
    {
        path: "/user/list",
        name: "/user/list",
        component: UserList,
        meta: {
            title: "用户列表"
        }
    },
    {
        path: "/rider/list",
        name: "/rider/list",
        component: RiderList,
        meta: {
            title: "骑手管理"
        }
    },

]