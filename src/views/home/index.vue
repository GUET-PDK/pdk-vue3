<!--
 * @Author: liangtd
 * @Date: 2023-04-14 11:26:17
 * @LastEditors: liangtd
 * @LastEditTime: 2023-04-15 18:04:16
 * @Description: 后台管理主控台内容页
-->

<template>
    <div>
        <!-- 骨架屏 -->
        <template v-if="skeletonVisible">
          <!-- 顶部卡片 -->
          <el-row :gutter="20">
            <el-col :span="6" v-for="i in 4" :key="i">
              <el-skeleton style="width: 100%" animated loading>
                <template #template>
                  <el-card class="border-0" shadow="never">
                    <template #header>
                      <div class="flex justify-between">
                        <el-skeleton-item variant="text" style="width: 50%;" />
                        <el-skeleton-item variant="text" style="width: 10%;" />
                      </div>
                    </template>
                    <el-skeleton-item variant="h3" style="width: 30%;" />
                    <el-divider />
                    <div class="flex justify-between text-sm text-gray-500">
                      <el-skeleton-item variant="text" style="width: 50%;" />
                      <el-skeleton-item variant="text" style="width: 10%;" />
                    </div>
                  </el-card>
                </template>
              </el-skeleton>
            </el-col>
          </el-row>
          <!-- navs -->
          <el-row :gutter="20" class="mt-5">
            <el-col v-for="i in 8" :key="i" :span="3">
              <el-skeleton style="width: 100%" animated loading>
                <template #template>
                  <el-card class="border-0" shadow="never">
                    <div class="flex flex-col justify-center items-center">
                      <el-skeleton-item variant="circle" class="w-4 h-4" />
                      <el-skeleton-item variant="text" class="w-8 mt-2" />
                    </div>
                  </el-card>
                </template>
              </el-skeleton>
            </el-col>
          </el-row>
          <!-- 图表|待付款 -->
          <el-row :gutter="20" class="mt-5">
            <el-col :span="12">
              <el-skeleton style="width: 100%" animated loading>
                <template #template>
                  <el-card shadow="never">
                    <template #header>
                      <div class="flex">
                        <el-skeleton-item variant="p" class="w-12 h-4" />
                        <el-skeleton-item variant="p" class="w-[80px] h-6 mr-2 ml-auto" />
                        <el-skeleton-item variant="p" class="w-[80px] h-6 mr-2" />
                        <el-skeleton-item variant="p" class="w-[80px] h-6 mr-2" />
                      </div>
                    </template>
                    <el-skeleton-item variant="rect" class="w-full h-[300px]" />
                  </el-card>
                </template>
              </el-skeleton>
            </el-col>
            
            <el-col :span="12">
              <el-skeleton v-for="index in 2" :key="index" style="width: 100%" animated loading>
                <template #template>
                  <el-card shadow="never" class="mb-4">
                    <template #header>
                      <div class="flex justify-between">
                        <el-skeleton-item variant="p" class="w-12 h-4" />
                        <el-skeleton-item variant="p" class="w-[100px] h-4" />
                      </div>
                    </template>
                    <el-row :gutter="20" class="py-2">
                      <el-col :span="6" v-for="i in 4" :key="i">
                        <el-card shadow="never" class="border-0 bg-light-400">
                          <div class="flex flex-col items-center justify-center">
                            <el-skeleton-item variant="p" class="w-6 h-4" />
                            <el-skeleton-item variant="caption" class="w-10 h-4 mt-2" />
                          </div>
                        </el-card>
                      </el-col>
                    </el-row>
                  </el-card>
                </template>
              </el-skeleton>
            </el-col>
          </el-row>
        </template>

        <!-- 数据加载完毕 -->
        <template v-else>
          <!-- 顶部卡片 -->
          <el-row :gutter="20">
            <el-col :span="6" v-for="(item, index) in panels" :key="index">
              <el-card class="border-0" shadow="hover">
                <template #header>
                  <div class="flex justify-between">
                    <span class="text-sm">{{ item.title }}</span>
                    <el-tag :type="item.tagType" effect="plain">
                      {{ item.tag }}
                    </el-tag>
                  </div>
                </template>
                <span class="text-3xl font-bold text-gray-500">
                  <!-- 数字滚动 -->
                  <CountTo :value="item.value"></CountTo>
                </span>
                <el-divider />
                <div class="flex justify-between text-sm text-gray-500">
                  <span>{{ item.subTitle }}</span>
                  <span>{{ item.subValue }}</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <Navs></Navs>
          <!-- 图表|待付款 -->
          <el-row :gutter="20" class="mt-5">
            <el-col :span="12">
                <BarChart></BarChart>
            </el-col>
            <el-col :span="12">
              <lineChart></lineChart>
            </el-col>
          </el-row>
        </template>
    </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from "vue"
import CountTo from "@/components/CountTo.vue"
import Navs from "./Navs.vue"
import BarChart from "./BarChart.vue";
import lineChart from "./lineChart.vue";
import { getCountOrder, getCountUser, countApplication } from '@/api/homePage.js'
import axios from '@/api/axios'

// 获取跑腿订单数据
const goods = ref([])
const order = ref([])

// 顶部卡片数据
let panels = reactive([
    {
        'title': '发布订单',
        'tag': '用户',
        'tagType': 'success',
        'value': '0',
        'subTitle': '已支付订单',
        'subValue': '30'
    },
    {
        'title': '接取订单',
        'tag': '骑手',
        'tagType': 'ifon',
        'value': '0',
        'subTitle': '已完成订单',
        'subValue': '0'
    },
    {
        'title': '待处理',
        'tag': '认证',
        'tagType': 'warning',
        'value': '0',
        'subTitle': '已审核',
        'subValue': '0'
    },
    {
        'title': '总用户',
        'tag': '+',
        'tagType': 'danger',
        'value': '0',
        'subTitle': '已认证',
        'subValue': '0'
    }
])

const getAllInfo = async() => {
  await getCountOrder()
    .then((res) => {
      // console.log(res.data.data);
      // 发布总订单数
      panels[0].value = res.data.data.postOrder;
      // 接取的总订单数
      panels[1].value = res.data.data.pickUpOrder;
      panels[1].subValue = res.data.data.finishOrder;

    }).catch((err) => {
    console.log(err);
    })

    // 获取用户和骑手数量
  await getCountUser()
    .then((res) => {
      // console.log(res.data.data);
      panels[3].value = res.data.data.count;
      panels[3].subValue = res.data.data.runnerCount;
    }).catch((err) => {
      console.log(err);
    })

    // 获取用户申请骑手数量
  await countApplication()
    .then((res) => {
      // console.log(res.data.data);
      panels[2].value = res.data.data.notProcessed;
      panels[2].subValue = res.data.data.allow;
    })
}

  onMounted(() => {
    getAllInfo()
  })
// 是否显示骨架屏
const skeletonVisible = computed(() => {
    // return (panels.value.length == 0 && goods.value.length == 0 && order.value.length == 0)
})
</script>

<style scoped>

</style>