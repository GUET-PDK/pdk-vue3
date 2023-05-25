import service from "./axios";

// 获取所有用户信息
export function getUserMessage() {
    return service({
        url: "/admin/getUserMessage",
        method: "get"
    })
}

// 封禁不良用户
// params为用户id String型
export function banUser(params) {
    return service({
        url: "/admin/banUser",
        method: "post",
        data: {
            'userId': params
        }
    })
}

// 解除不良用户
// params为用户id String型
export function pinUser(params) {
    return service({
        url: "/admin/pinUser",
        method: "post",
        data: {
            'userId': params
        }
    })
}