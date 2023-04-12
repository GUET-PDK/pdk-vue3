<!--
 * @Author: liangtd
 * @Date: 2023-04-12 14:07:50
 * @LastEditors: liangtd
 * @LastEditTime: 2023-04-12 16:17:04
 * @Description: 
-->
<template>
    <el-container>
        <!-- 头部 -->
        <el-header>
            <Header></Header>
        </el-header>
        <!-- 中间 -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width="$store.state.asideWidth">
                <Menu></Menu>
            </el-aside>
            <!-- 内容 -->
            <el-main>
                <!-- 标签导航 -->
                <TagList></TagList>
                <router-view v-slot="{ Component }">
                    <!-- 添加overflow-hidden解决快速切换的时候出现x轴滚动条 -->
                    <div class="overflow-hidden">
                        <!-- 过渡动画 -->
                        <Transition name="fade" mode="out-in">
                            <!-- 页面缓存 -->
                            <KeepAlive :max="10">
                                <component :is="Component"></component>
                            </KeepAlive>
                        </Transition>
                    </div>
                </router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import Header from './components/Header.vue'
import Menu from './components/Menu.vue'
import TagList from './components/TagList.vue'
</script>

<style scoped>

</style>