<!--
 * @Author: liangtd
 * @Date: 2023-04-15 15:16:14
 * @LastEditors: liangtd
 * @LastEditTime: 2023-04-15 16:36:58
 * @Description: 主控台 - 中部的标签导航
-->
<template>
      <el-row :gutter="20" class="mt-5">
        <el-col :span="3" v-for="item in iconNavs" :key="item.path">
          <el-card shadow="hover" @click="$router.push(item.path)">
            <div class="flex flex-col justify-center items-center cursor-pointer">
              <el-icon :size="16" :class="item.color">
                <component :is="item.icon"></component>
              </el-icon>
              <span class="text-sm mt-2">{{ item.title }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
</template>

<script setup>
// 图表列表
const iconNavs = [
    {
        icon: "user",
        color: "text-light-blue-500",
        title: "用户",
        path: "/user/list"
    },
    {
        icon: "van",
        color: "text-violet-500",
        title: "骑手",
        path: "/rider/list"
    },
    {
        icon: "tickets",
        color: "text-fuchsia-500",
        title: "订单",
        path: "/order/list"
    },
    {
        icon: "chat-dot-square",
        color: "text-teal-500",
        title: "评价",
        path: "/comment/list"
    },
    {
        icon: "trophyBase",
        color: "text-rose-500",
        title: "骑手认证",
        path: "/check/list"
    },
    {
        icon: "brush",
        color: "text-green-500",
        title: "撤销管理",
        path: "/repeal/list"
    },
    {
        icon: "picture",
        color: "text-yellow-500",
        title: "图库",
        path: "/picture/list"
    },
    {
        icon: "set-up",
        color: "text-grey-500",
        title: "配置",
        path: "/setting/base"
    }
]
</script>

<style scoped></style>