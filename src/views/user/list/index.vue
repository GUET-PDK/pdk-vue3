<!--
 * @Author: liangtd
 * @Date: 2023-04-14 14:15:03
 * @LastEditors: liangtd
 * @LastEditTime: 2023-04-14 14:16:27
 * @Description: 用户模块 - 用户列表
-->

<template>
    <div class="big-box">
        <!-- 包含搜索，新增，管理 -->
        <div class="top">
            <!-- 搜索框 -->
            <Search class="searchbox"></Search>
            <div class="flex-box"></div>
            <el-button class="addBtn" color="#219EBC">添加</el-button>
            <el-button class="deleteBtn" type="danger">删除</el-button>
        </div>
        <!-- 表格 -->
        <div class="table">
            <el-table 
            style="width: 980px; height: 350px;"
            :data="userData"
            :cell-style="{ textAlign: 'center' }"
            :header-cell-style="{ 'text-align': 'center' }"
            >
            <el-table-column type="selection" width="50" />
            <el-table-column prop="userID" label="用户ID" width="150" />
            <el-table-column prop="sex" label="性别" width="80" />
            <el-table-column prop="telephone" label="联系电话" width="200" />
            <el-table-column prop="address" label="住址" width="350" />
            <el-table-column fixed="right" label="操作" width="150">
                <template #default>
                    <el-button link type="primary" @click="modifyUser">修改</el-button>
                    <el-button link type="warning" @click="banUser">封禁</el-button>
                    <el-button link type="danger" @click="deleteUser">删除</el-button>
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
import { reactive } from 'vue'

const userData = [
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
]
// 获取所有用户信息

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