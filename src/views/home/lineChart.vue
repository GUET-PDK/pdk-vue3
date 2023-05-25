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
import {getActiveCount} from '@/api/homePage.js'


echarts.use([TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent, MarkLineComponent, MarkPointComponent, LineChart, CanvasRenderer, UniversalTransition]);

let lineChart = ref(null)
let myChart = null
let userArr = [];  //存放用户数据
let riderArr = []; //存放骑手数据

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
    await getActiveCount()
        .then((res) => {
            // console.log(res.data.data);
            const data = res.data.data;
            const length = res.data.data.length;
            for (let i = 0; i < length; i++) {
                userArr.push(data[i].userCount);
                riderArr.push(data[i].runnerCount);
            }
            console.log("userArr", userArr, "riderArr", riderArr);
        }).catch((err) => {
            console.log(err);
        });

    let option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {},
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
            type: 'value',
            min: 0,
            scale: true,
            axisLabel: {
                formatter: '{value} '
            }
        },
        series: [
            {
                name: '骑手',
                type: 'line',
                data: riderArr,
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
                data: userArr,
                markPoint: {
                    data: [{ name: '周最低' }]
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