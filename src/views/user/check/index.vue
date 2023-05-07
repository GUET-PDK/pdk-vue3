<!--
 * @Author: liangtd
 * @Date: 2023-04-14 14:14:56
 * @LastEditors: liangtd
 * @LastEditTime: 2023-04-14 14:15:56
 * @Description: 用户模块 - 认证审核管理
-->

<template>
    <div class="container">
        <div class="top">
            <!-- 搜索框 -->
            <Search 
            class="searchbox"
            :data="orderData"
            ></Search>
            <div class="flex-box"></div>
            <el-button class="agreeBtn" color="#219EBC">同意</el-button>
            <el-button class="rejectBtn" type="danger">拒绝</el-button>
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
        <el-table-column fixed prop="userID" label="用户ID" width="150" />
        <el-table-column prop="description" label="申请描述" width="400" />
        <el-table-column prop="state" label="申请状态" width="180" >
            <template #default="scope">
                <el-tag
                :type="scope.row.state === '未通过' ? 'danger' : 'success'"
                disable-transitions
                >{{ scope.row.state }}</el-tag
                >
            </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
            <template #default>
                <el-button-group class="group-Btn">
                    <el-button color="#219EBC"  :icon="Select" />
                    <el-button type="danger" :icon="CloseBold" />
                </el-button-group>
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
import Search from '@/components/searchBox.vue'
import Pagination from '@/components/Pagination.vue'
import {Select, CloseBold} from '@element-plus/icons-vue'


const orderData = [
  {
    date: '2016-05-03',
    userID: 'Tom',
    description: '排队',
    state: '未通过',
  },
  {
    date: '2016-05-02',
    userID: 'Tom',
    description: '排队',
    state: '已通过',
    },
    {
    date: '2016-05-02',
    userID: 'Tom',
    description: '排队',
    state: '已通过',
    },{
    date: '2016-05-02',
    userID: 'Tom',
    description: '排队',
    state: '已通过',
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
.top .rejectBtn{
    margin-right: 50px;
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