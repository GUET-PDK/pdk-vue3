<!--
 * @Author: liangtd
 * @Date: 2023-04-14 13:52:10
 * @LastEditors: liangtd
 * @LastEditTime: 2023-04-14 14:02:47
 * @Description: 订单评价管理
-->
<template>
    <div class="container">
        <div class="table">
            <el-table
            :data="tableData1"
            style="width: 100%"
            row-key="id"
            border
            :load="load"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            >
                <el-table-column prop="date" label="Date" />
                <el-table-column prop="name" label="Name" />
                <el-table-column prop="address" label="Address" />
            </el-table>
        </div>
    </div>
</template>

<script setup>



</script>

<style scoped>

</style>