/*
 * @Author: liangtd
 * @Date: 2023-04-12 17:41:25
 * @LastEditors: liangtd
 * @LastEditTime: 2023-04-12 21:34:10
 * @Description: 用户信息管理
 */


import { ref, reactive } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import { notification, showModal } from "@/utils/common.js"



/**
 * @description: 用户修改密码
 * @Date: 2023-04-12 18:17:37
 * @return { form, rules, formRef, formDrawer, onSubmit, openRepassword }
 */
export function useRepassword() {
    const store = useStore()
    const router = useRouter()
    const form = reactive({
        oldpassword: '',
        password: '',
        repassword: ''
    })
    // 表单检验（修改密码）
    const rules = reactive({
        oldpassword: [
            { required: true, message: '旧密码不能为空', trigger: 'blur' }
        ],
        password: [
            { required: true, message: '新密码', trigger: 'blur' }
        ],
        repassword: [
            { required: true, message: '确认密码', trigger: 'blur' }
        ]
    })

    let formRef = ref(null)
    let formDrawer = ref(false)

    const onSubmit = () => {
        formRef.value.validate(async valid => {
            if (!valid) return
            formDrawer.value.showLoading()
        })
        try {
            
        } catch (err) {
            
        } finally{
            formDrawer.value.hideLoading()
        }
    }

    const openRepassword = () => formDrawer.value.open()
    return {
        form, rules, formRef, formDrawer, onSubmit, openRepassword
    }
}

/**
 * @description: 用户退出登录
 * @Date: 2023-04-12 18:18:24
 * @return { handleLogout }
 */
export function useLogout() {
    const store = useStore()
    const router = useRouter()
    const handleLogout = () => {
        showModal("是否确定退出登录？").then(() => {
            router.push("/login")
            notification("退出登录成功！")
        })
    }
    return {handleLogout}
}