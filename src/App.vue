<!--
 * @Author: liangtd
 * @Date: 2023-04-12 08:37:46
 * @LastEditors: liangtd
 * @LastEditTime: 2023-04-15 15:25:55
 * @Description: 根组件
-->

<template>
  <router-view></router-view>
</template>

<script setup></script>

<style>
body {
  @apply bg-gray-100;
}

/* loading加载防止遮到底部区域 */
.el-loading-mask {
  z-index: 9;
}

/* 单选|多选样式 */
.el-radio,
.el-checkbox-group .el-checkbox {
  margin-right: 10px;
}

.el-radio:last-child {
  margin-right: 0;
}

/* 提示文字样式 */
.point-small {
  @apply text-gray-500 block;
}

#nprogress .bar {
  background: #11c3ad !important;
}

#nprogress .spinner-icon {
  border-top-color: #11c3ad !important;
  border-left-color: #11c3ad !important;
}

::-webkit-scrollbar {
  width: 4px;
  height: 6px;
}

::-webkit-scrollbar-corner {
  display: block;
}

::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.2);
}

::-webkit-scrollbar-thumb,
::-webkit-scrollbar-track {
  border-right-color: transparent;
  border-left-color: transparent;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
