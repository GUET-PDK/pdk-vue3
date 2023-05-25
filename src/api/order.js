import service from "./axios";

// 获取所有订单详细数据
export function getAllOrders() {
    return service({
        url: "/admin/gerAllOrders",
        method: "get"
    })
}

// 删除订单
// params为orderId  number类型
export function delOrder(params) {
    return service({
        url: "/admin/deleteOrder",
        method: "post",
        data: {
            'orderId': params
        }
    })
}