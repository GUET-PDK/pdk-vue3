<!--
 * @Author: liangtd
 * @Date: 2023-04-15 20:26:11
 * @LastEditors: liangtd
 * @LastEditTime: 2023-04-15 20:49:53
 * @Description: 主控台 - 底部右下的双折线图（用户活跃数据统计图）
-->
<template>
    <el-card shadow="never">
        <template #header>
            <div class="flex justify-between items-center">
                <span class="text-sm">活跃统计</span>
                <div>
                    <el-check-tag style="margin-right: 8px">
                        近1周
                    </el-check-tag>
                </div>
            </div>
        </template>
        <div ref="lineChart" id="linechart" style="width: 100%;height:360px;"></div>
    </el-card>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import * as echarts from 'echarts/core';
import { TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent, MarkLineComponent, MarkPointComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent, MarkLineComponent, MarkPointComponent, LineChart, CanvasRenderer, UniversalTransition]);

let lineChart = ref(null)
let myChart = null

// 初始化图表
onMounted(() => {
    let chart = document.querySelector('#linechart')
    if (chart) {
        myChart = echarts.init(chart)
        setChart()
    }
})

// 销毁实例
onBeforeUnmount(() => {
    if (myChart)
        echarts.dispose(myChart)
})

async function setChart() {
    let option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {},
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} °C'
            }
        },
        series: [
            {
                name: '骑手',
                type: 'line',
                data: [10, 11, 13, 11, 12, 12, 9],
                markPoint: {
                    data: [
                        { type: 'max', name: 'Max' },
                        { type: 'min', name: 'Min' }
                    ]
                },
            },
            {
                name: '用户',
                type: 'line',
                data: [1, -2, 2, 5, 3, 2, 0],
                markPoint: {
                    data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }]
                },
            }
        ]
    }
    option && myChart.setOption(option);
}

// 页面大小变化的时候
useResizeObserver(lineChart, () => { myChart && myChart.resize() })
</script>

<style scoped></style>