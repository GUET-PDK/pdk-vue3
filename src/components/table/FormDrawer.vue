<!--
 * @Author: liangtd
 * @Date: 2023-04-12 20:40:49
 * @LastEditors: liangtd
 * @LastEditTime: 2023-04-12 21:15:48
 * @Description: 公共组件 - 侧边打开抽屉
-->
<template>
    <el-drawer v-model="showDrawer" :title="title" :size="size" :destroy-on-close="destroyOnClose">
        <div class="body">
            <slot></slot>
        </div>
        <template #footer>
            <div class="text-left">
                <el-button type="primary" @click="submit" :loading="loading">{{ confirmText }}</el-button>
                <el-button type="default" @click="close">取消</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<script setup>
import { ref } from 'vue'

// 显示/隐藏
let showDrawer = ref(false)
let loading = ref(false)

// 打开|关闭抽屉
const open = () => showDrawer.value = true
const close = () => loading.value = false

// 加载|结束
const showLoading = () => loading.value = true
const hideLoading = () => loading.value = false

// 向父组件暴露自定义事件
const emit = defineEmits(["submit"])
// 提交
const submit = () => emit("submit")

// 向父组件暴露方法
defineExpose({
    open, close, showLoading, hideLoading
})

// 接收自定义属性
defineProps({
    title: String,
    size: {
        type: String,
        default: "40%"
    },
    destroyOnClose: {
        type: Boolean,
        default: false
    },
    confirmText: {
        type: String,
        default: "提交"
    }
})
</script>

<style scoped>
.body {
  @apply w-full h-full overflow-y-auto;
}
</style>