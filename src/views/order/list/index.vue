<!--
 * @Author: liangtd
 * @Date: 2023-04-14 13:50:43
 * @LastEditors: liangtd
 * @LastEditTime: 2023-04-14 13:52:32
 * @Description: 订单模块 - 订单列表
-->

<template>
    <div class="big-box">
        <!-- 包含搜索，新增，管理订单 -->
        <div class="top">
            <el-row>
                <el-col :span="8">
                    <!-- 搜索框 -->
                    <el-input v-model="searchText" 
                    class="w-50 m-2"
                    placeholder="Please Input"
                    :suffix-icon="Search" clearable />
                </el-col>
                <el-col :span="6" :offset="10">
                    <el-button type="primary">添加</el-button>
                </el-col>
            </el-row>
        </div>
        <!-- 表格 -->
        <div class="table">
            <el-table 
            :data="tableData" style="width: 100%"
            :cell-style="{ textAlign: 'center' }"
            :header-cell-style="{ 'text-align': 'center' }"
            >
            <el-table-column prop="date" label="下单时间" width="150" />
            <el-table-column prop="userID" label="用户ID" width="150" />
            <el-table-column prop="description" label="订单描述" width="200" />
            <el-table-column prop="state" label="订单状态" width="120" >
                <template #default="scope">
                    <el-tag
                    :type="scope.row.state === '未接单' ? 'danger' : scope.row.tag === '已接收' ? 'warning' : 'success'"
                    disable-transitions
                    >{{ scope.row.state }}</el-tag
                    >
                </template>
            </el-table-column>
            <el-table-column prop="riderID" label="骑手ID" width="120" />
            <el-table-column prop="money" label="订金(元)" width="120" />
            <el-table-column fixed="right" label="操作" width="120">
                <template #default>
                    <el-button link type="primary" size="small" @click="modifyOrder">修改</el-button>
                    <el-button link type="danger" size="small" @click="deleteOrder">删除</el-button>
                </template>
            </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const searchText = ref('');

const tableData = [
  {
    date: '2016-05-03',
    userID: 'Tom',
    description: '排队',
    state: '未接单',
    riderID: '111',
    money: '10',
  },
  {
    date: '2016-05-02',
    userID: 'Tom',
    description: '排队',
    state: '已完成',
    riderID: '111',
    money: '10',
  }]
</script>

<style scoped>

</style>