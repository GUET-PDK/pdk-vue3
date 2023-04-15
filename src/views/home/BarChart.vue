<!--
 * @Author: liangtd
 * @Date: 2023-04-15 15:17:22
 * @LastEditors: liangtd
 * @LastEditTime: 2023-04-15 20:38:29
 * @Description: 主控台 - 底部左下的订单统计柱状图（展示某天的日发布订单和日接取订单数）
-->
<template>
    <el-card shadow="never">
        <template #header>
            <div class="flex justify-between items-center">
                <span class="text-sm">订单统计</span>
                <div>
                    <el-check-tag v-for="(item, i) in tags" :key="i" @click="handleChoose(item.value)"
                        :checked="current == item.value" style="margin-right: 8px">
                        {{ item.text }}
                    </el-check-tag>
                </div>
            </div>
        </template>
        <div ref="barChart" id="barchart" style="width: 100%;height:360px;"></div>
    </el-card>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import * as echarts from 'echarts/core';
import { TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent, MarkLineComponent, MarkPointComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent, MarkLineComponent, MarkPointComponent, BarChart, CanvasRenderer
]);

let barChart = ref(null)
let myChart = null

// 初始化图表
onMounted(() => {
    let chart = document.querySelector('#barchart')
    if (chart) {
        myChart = echarts.init(chart)
        setChart()
    }
})

// 销毁实例
onBeforeUnmount(() => {
    if (myChart) myChart.dispose()
})

// 图表切换
let current = ref("week")
const tags = [
    {
        text: "近1个月",
        value: "month"
    },
    {
        text: "近1周",
        value: "week"
    }
]

function handleChoose(type) {
    current.value = type
    setChart()
}

// 图表数据
async function setChart() {
    let option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['接单数', '发单数']
        },

        calculable: true,
        xAxis: [
            {
                type: 'category',
                // prettier-ignore
                data: ['1月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '接单数',
                type: 'bar',
                data: [
                    2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
                ],
                markPoint: {
                    data: [
                        { type: 'max', name: 'Max' },
                        { type: 'min', name: 'Min' }
                    ]
                },
            },
            {
                name: '发单数',
                type: 'bar',
                data: [
                    2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
                ],
                markPoint: {
                    data: [
                        { name: 'Max', value: 182.2, xAxis: 7, yAxis: 183 },
                        { name: 'Min', value: 2.3, xAxis: 11, yAxis: 3 }
                    ]
                },
            }
        ]
    }
    option && myChart.setOption(option);
}



// 页面大小变化的时候
useResizeObserver(barChart, () => { myChart && myChart.resize() })
</script>

<style scoped></style>