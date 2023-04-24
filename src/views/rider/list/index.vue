<!--
 * @Author: liangtd
 * @Date: 2023-04-14 14:07:47
 * @LastEditors: liangtd
 * @LastEditTime: 2023-04-14 14:08:20
 * @Description: 骑手模块 - 骑手列表
-->
<template>
    <div class="big-box">
        <!-- 包含搜索，新增，管理订单 -->
        <div class="top">
            <!-- 搜索框 -->
            <Search class="searchbox"></Search>
            <el-button class="add" type="primary">添加</el-button>
            <el-button class="delete" type="danger">删除</el-button>
        </div>
        <!-- 表格 -->
        <div class="table">
            <el-table 
            style="width: 980px; height: 350px;"
            :data="riderData"
            :cell-style="{ textAlign: 'center' }"
            :header-cell-style="{ 'text-align': 'center' }"
            >
            <el-table-column type="selection" width="50" />
            <el-table-column prop="userID" label="用户ID" width="150" />
            <el-table-column prop="sex" label="性别" width="80" />
            <el-table-column prop="telephone" label="联系电话" width="200" />
            <el-table-column prop="address" label="住址" width="350" />
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
import Search from '@/components/searchBox.vue'
import Pagination from '@/components/Pagination.vue'

const riderData = [
{
    userID: 'lucy',
    sex: '女',
    telephone: '123456',
    address: '广西省×××××××××',
  },
  {
    userID: 'Tom',
    sex: '男',
    telephone: '12345678',
    address: '广西省×××××××××',
  }]
</script>

<style scoped>
.top{
    height: 50px;
}
.top .searchbox{
    margin-left: 5px;
    display: inline-block;
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