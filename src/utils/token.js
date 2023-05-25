/**
 * @description: token的设置、获取和删除方法
 * @Date: 2023-04-12 10:33:36
 * @return {*}
 */
const key = "admin-token"

// 设置token
export function setToken(token) {

    return localStorage.setItem(key, token)
}

// 获取token
export function getToken() {
    return localStorage.getItem(key)
}

// 删除token
export function removeToken() {
    return localStorage.removeItem(key)
}