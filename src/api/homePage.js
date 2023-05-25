import service from './axios'
// 发送验证码
export function sendCode(data) {
    return service({
        url: "admin/getCode",
        method: "post",
        data: data
    })
}

// 登录
export function login(params) {
    return service({
        url: "/admin/login",
        method: "get",
        params: params
    })
}

// 获取总的发布订单数
export function getCountOrder() {
    return service({
        url: "admin/allOrder",
        method: "get"
    })
}

// 获取统计用户数量和骑手数量
export function getCountUser() {
    return service({
        url: "/admin/countUser",
        method: "get"
    })
}

// 统计近一周用户和骑手活跃度
export function getActiveCount() {
    return service({
        url: "/admin/getActiveCount",
        method: "get"
    })
}

// 获取统计用户数量和骑手数量
export function countApplication() {
    return service({
        url: "/admin/countApplication",
        method: "get"
    })
}

