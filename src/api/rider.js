import service from "./axios";

// 获取称为骑手的认证材料
// params是申请表id  String类型
export function getRunnerApply(params) {
    return service({
        url: "/admin/getRunnerApplyMessage",
        method: "get",
        params: {
            id: params
        }
    })
}

// 获取成为骑手的申请列表
export function getApplyList() {
    return service({
        url: "/admin/getApplyList",
        method: "get",
    })
}

// 通过普通用户成为骑手申请
// params为申请表id  number form-data格式
export function allowRunner(params) {
    return service({
        url: "/admin/allowRunner",
        method: "post",
        data: {
            'id': params
        }
    })
}

// 拒绝普通用户成为骑手申请
// params为申请表id  number form-data格式
export function disAllowRunner(params) {
    return service({
        url: "/admin/disAllowRunner",
        method: "post",
        data: {
            'id': params
        }
    })
}