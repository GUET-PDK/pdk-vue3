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
            <!-- 搜索框 -->
            <Search 
            class="searchbox"
            :data="orderData"
            ></Search>
            <div class="flex-box"></div>
            <el-button class="addBtn" color="#219EBC">添加</el-button>
            <el-button class="deleteBtn" type="danger">删除</el-button>
        </div>
        <!-- 表格 -->
        <div class="table">

            <el-table 
            style="width: 980px; height: 350px;"
            :data="orderData"
            :cell-style="{ textAlign: 'center' }"
            :header-cell-style="{ 'text-align': 'center' }"
            >
            <el-table-column type="selection" width="50" />
            <el-table-column fixed prop="date" label="下单时间" width="150" />
            <el-table-column prop="userID" label="用户ID" width="150" />
            <el-table-column prop="description" label="订单描述" width="300" />
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
        <!-- 分页 -->
        <div class="pagination">
            <Pagination></Pagination>
        </div>
    </div>
</template>

<script setup>
// import { ref } from 'vue'
import Search from '@/components/searchBox.vue'
import Pagination from '@/components/Pagination.vue'

const orderData = [
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
    },
    {
    date: '2016-05-02',
    userID: 'Tom',
    description: '排队',
    state: '已完成',
    riderID: '111',
    money: '10',
    },{
    date: '2016-05-02',
    userID: 'Tom',
    description: '排队',
    state: '已完成',
    riderID: '111',
    money: '10',
  }
    ]
</script>

<style scoped>

.top{
    display: flex;
    height: 50px;
}
.flex-box{
    flex: 1;
}
.top .searchbox{
    margin-left: 5px;
    display: inline-block;
}
.top .deleteBtn{
    margin-right: 25px;
}
/* 实现表格自适应浏览器宽度和阴影 */
.table{
    display: flex;
    height: 360px;
    position: relative;
}
.table .el-table{
    box-shadow: 3px 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
}
/* 分页居中 */
.pagination{
    display: flex;
    justify-content: center;
    align-content: center;
    margin-top: 15px;
}
</style>