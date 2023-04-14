/*
 * @Author: liangtd
 * @Date: 2023-04-12 09:39:04
 * @LastEditors: liangtd
 * @LastEditTime: 2023-04-14 17:20:43
 * @Description: 
 */
import { ElNotification, ElMessageBox } from 'element-plus'

// 页面相关 --------------------------------------------------------------------
// 页面左侧多级菜单数据
export const menus = [
    {
        'name': '主控面板',
        'icon': 'HomeFilled',
        'frontpath': '/'
    },
    {
        'name': '订单模块',
        'icon': 'Shop',
        'child': [
            {
                'name': '订单管理',
                'icon': 'Reading',
                'frontpath': '/order/list'
            },
            {
                'name': '评价管理',
                'icon': 'ChatDotRound',
                'frontpath': '/comment/list'
            }
        ]
    },
    {
        'name': '用户模块',
        'icon': 'UserFilled',
        'child': [
            {
                'name': '用户管理',
                'icon': 'User',
                'frontpath': '/user/list'
            },
            {
                'name': '认证管理',
                'icon': 'TrophyBase',
                'frontpath': '/check/list'
            }
        ]
    },
    {
        'name': '骑手模块',
        'icon': 'Management',
        'child': [
            {
                'name': '骑手管理',
                'icon': 'Van',
                'frontpath': '/rider/list'
            },
            {
                'name': '撤销管理',
                'icon': 'Brush',
                'frontpath': '/repeal/list'
            }
        ]
    },
    {
        'name': '其他模块',
        'icon': 'MoreFilled',
        'child': [
            {
                'name': '图片管理',
                'icon': 'Picture',
                'frontpath': '/picture/list'
            },
            {
                'name': '通知管理',
                'icon': 'Bell',
                'frontpath': '/bell/list'
            }
        ]
    },
    {
        'name': '系统设置',
        'icon': 'Tools',
        'child': [
            {
                'name': '基础设置',
                'icon': 'Operation',
                'frontpath': '/setting/base'
            }
        ]
    },
]


// 提示相关 --------------------------------------------------------------------
// 消息提示
export function notification(message, type = 'success', dangerouslyUseHTMLString = false) {
    ElNotification({
        message,
        type,
        duration: 3000,
        dangerouslyUseHTMLString
    })
}
// 消息提示框
export function showModal(content, type = "warning", title = "") {
    return ElMessageBox.confirm(
        content,
        title,
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type,
        }
    )
}
// 消息弹出框
export function showMessageBox(tip, value = "") {
    return ElMessageBox.prompt(tip, "", {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        inputValue: value
    })
}

// 存储相关 --------------------------------------------------------------------
// 设置
export function setStorage(key, value, storageType = "local") {
    value = typeof value == "object" ? JSON.stringify(value) : value
    if (storageType == "session") {
        sessionStorage.setItem(key, value)
    } else {
        localStorage.setItem(key, value)
    }
}
// 获取
export function getStorage(key, storageType = "local") {
    if (storageType == "session") {
        return JSON.parse(sessionStorage.getItem(key))
    } else {
        return JSON.parse(localStorage.getItem(key))
    }
}
// 删除
export function removeStorage(key, storageType = "local") {
    if (storageType == "session") {
        localStorage.removeItem(key)
    } else {
        localStorage.removeItem(key)
    }
}

// 格式化 --------------------------------------------------------------------
// 格式化params参数
export function formatParams(data) {
    let arr = []
    for (const key of Object.keys(data)) {
        if (data[key]) {
            arr.push(`${key}=${encodeURIComponent(data[key])}`)
        }
    }

    let params = arr.join("&")
    params = "?" + params
    return params
}
