<!--
 * @Author: liangtd
 * @Date: 2023-04-12 16:47:22
 * @LastEditors: liangtd
 * @LastEditTime: 2023-04-14 17:11:48
 * @Description: 页面左侧多级菜单布局
-->

<template>
    <div class="f-menu" :style="{ width: $store.state.asideWidth }">
        <el-menu :collapse="isCollapse" unique-opened :default-active="defaultActive" class="border-0"
            @select="handleSelect" :collapse-transition="false">

            <template v-for="(item, index) in asideMenus" :key="index">
                <!-- 二级菜单 -->
                <el-sub-menu :index="item.name" v-if="item.child && item.child.length > 0">
                    <template #title>
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <span>{{ item.name }}</span>
                    </template>
                    <el-menu-item :index="child.frontpath" v-for="(child, i) in item.child" :key="i">
                        <el-icon>
                            <component :is="child.icon"></component>
                        </el-icon>
                        <span>{{ child.name }}</span>
                    </el-menu-item>
                </el-sub-menu>

                <!-- 一级菜单 -->
                <el-menu-item :index="item.frontpath" v-else>
                    <el-icon>
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{ item.name }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script setup>
import { menus } from '@/utils/common.js'
import { ref, computed } from 'vue'
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useStore } from 'vuex'
const router = useRouter()
const route = useRoute()
const store = useStore()

// 菜单数据
const asideMenus = menus

// 是否折叠侧边栏
const isCollapse = computed(() => store.state.asideWidth == '64px')

// 默认选中
const defaultActive = ref(route.path)

// 监听路由变化
onBeforeRouteUpdate((to, from) => {
    defaultActive.value = to.path
})

// 切换页面
const handleSelect = index => router.push(index)
</script>

<style scoped>
.f-menu {
    @apply top-[64px] shadow-md fixed bottom-0 left-0 bg-light-50;
    @apply transition-all duration-250 overflow-x-hidden overflow-y-auto;
}

.f-menu::-webkit-scrollbar {
    width: 0px;
}

:deep(.el-sub-menu__title span) {
    overflow: hidden;
}
</style>