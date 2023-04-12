/**
 * @description: Vuex配置文件
 * @Date: 2023-04-12 10:28:05
 * @return {*}
 */
import { createStore } from "vuex";
import { setToken, removeToken } from "@/utils/token.js"

// 创建store的实例
const store = createStore({
    state() {
        return {
            user: {},           //用户信息
            asideWidth: "250px",//侧边导航栏宽度
            menus: [],
            ruleNames: []
        }
    },
    mutations: {
        // 设置用户信息
        setUserInfo(state, user) {
            state.user = user
        },

        // 展开或收缩侧边栏
        handleAsideWidth(state) {
            state.asideWidth = state.asideWidth == "250px" ? "50px" : "250px"
        },

        setMenus(state, menus) {
            state.menus = menus
        },

        setRuleNames(state, ruleNames) {
            state.ruleNames = ruleNames
        }
    },

    actions: {
        // 登录
        async userLogin({ commit }, { username, passord }) {
            try {
                
            } catch {
                
            }
        },
        // 获取用户信息
        async getUserInfo({ commit }) {
            try {
                let result = await getInfo()
                commit("setUserInfo", result)
                commit("setMenus", result.menus)
                commit("setRuleNames", result.ruleNames)
                return result
            } catch (error) {
                return Promise.reject(error)
            }
        },
        // 退出登录
        async logout({ commit }) {
            removeToken()
            commit("setUserInfo", {})
        }
    }
})

export default store