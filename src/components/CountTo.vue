<!--
 * @Author: liangtd
 * @Date: 2023-04-15 15:20:12
 * @LastEditors: liangtd
 * @LastEditTime: 2023-04-15 15:20:40
 * @Description: 主控台的卡片数字 加载动态样式
-->

<template>
  {{ d.num.toFixed(0) }}
</template>
<script setup>
import { reactive, watch } from "vue"
import gsap from "gsap"

const props = defineProps({
  value: {
    type: Number,
    default: 0
  }
})
const d = reactive({
  num: 0
})

// 执行动画
function AnimateToValue() {
  gsap.to(d, {
    duration: 0.5,
    num: props.value
  })
}
AnimateToValue()

// 如果setup执行完props还没更新
watch(() => props.value, () => AnimateToValue())

</script>
