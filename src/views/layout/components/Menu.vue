<template>
    <div class="f-menu" :style="{ width: $store.state.asideWidth }">
        <el-menu :collapse="isCollapse" unique-opened :default-active="defaultActive" class="border-0"
            @select="handleSelect">
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
import { HomeFilled, } from '@element-plus/icons-vue'
const asideMenus = [
    {
        'name': '主控面板',
        'icon': 'HomeFilled',
        'frontpath': '/'
    },
    {
        'name': '订单模块',
        'icon': '',
        'child': [
            {
                'name': '订单管理',
                'icon': '',
                'frontpath': '/order/list'
            },
            {
                'name': '评价管理',
                'icon': '',
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
                'icon': '',
                'frontpath': '/apply/list'
            }
        ]
    },
    {
        'name': '骑手模块',
        'icon': '',
        'child': [
            {
                'name': '骑手管理',
                'icon': '',
                'frontpath': ''
            },
            {
                'name': '撤销管理',
                'icon': '',
                'frontpath': ''
            }
        ]
    },
    {
        'name': '其他模块',
        'icon': '',
        'child': [
            {
                'name': '图片管理',
                'icon': '',
                'frontpath': ''
            },
            {
                'name': '通知管理',
                'icon': '',
                'frontpath': ''
            }
        ]
    },
    {
        'name': '系统设置',
        'icon': '',
        'child': [
            {
                'name': '基础设置',
                'icon': '',
                'frontpath': ''
            },
            {
                'name': '物流设置',
                'icon': '',
                'frontpath': ''
            }
        ]
    },


]
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