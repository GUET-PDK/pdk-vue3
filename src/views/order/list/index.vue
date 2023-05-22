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
            <el-button class="addBtn" color="#219EBC" @click="addOder">添加</el-button>
            <el-button class="deleteBtn" type="danger" @click="delOrder">删除</el-button>
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
            <el-table-column prop="date" label="下单时间" width="150" />
            <el-table-column prop="userID" label="用户ID" width="150" />
            <el-table-column prop="description" label="订单描述" width="300" />
            <el-table-column prop="state" label="订单状态" width="120" >
                <template #default="scope">
                    <el-tag
                    :type="scope.row.state === '未接单' ? 'danger' : scope.row.tag === '已接收' ? 'warning' : 'success'"
                    disable-transitions
                    >{{ scope.row.state }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="riderID" label="骑手ID" width="120" />
            <el-table-column prop="money" label="订金(元)" width="120" />
            <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                    <el-button link type="primary" @click="modifyOrder(scope.row)">编辑</el-button>
                    <el-button link type="danger" @click="deleteOrder(scpope.row)">删除</el-button>
                </template>
            </el-table-column>
            </el-table>            
        </div>

        <!-- 编辑订单信息弹框 -->
        <el-dialog v-model="dialogFormVisible" :title="dialogType === 'add' ? '新增' : '编辑'">
            <el-form :model="orderForm">
            <el-form-item label="时间" :label-width="100" style="width:300px"
            >
                <el-input v-model="orderForm.date" autocomplete="off" :disabled="disabled"/>
            </el-form-item>

            <el-form-item label="用户Id" :label-width="100" style="width:300px">
                <el-input v-model="orderForm.userID" autocomplete="off" :disabled="disabled"/>
            </el-form-item>

            <el-form-item label="订单描述" :label-width="100" required style="width:90%">
                <el-input v-model="orderForm.description" autocomplete="off" />
            </el-form-item>

            <el-form-item label="订单状态" :label-width="100" required style="width:300px">
                <el-radio-group v-model="orderForm.state">
                    <el-radio label="未接单" />
                    <el-radio label="已完成" />
                </el-radio-group>
            </el-form-item>

            <el-form-item label="骑手Id" :label-width="100" required style="width:300px">
                <el-input v-model="orderForm.riderID" autocomplete="off" />
            </el-form-item>

            <el-form-item label="订金" :label-width="100" required style="width:300px">
                <el-input v-model="orderForm.money" autocomplete="off" />
            </el-form-item>
            </el-form>

            <!-- 底部确认或取消按钮 -->
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="comfirmForm(orderForm)">确认</el-button>
            </span>
            </template>
        </el-dialog>

        <!-- 分页 -->
        <div class="pagination">
            <Pagination></Pagination>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Search from '@/components/searchBox.vue'
import Pagination from '@/components/Pagination.vue'

let orderData = $ref([
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
    }, {
        date: '2016-05-02',
        userID: 'Tom',
        description: '排队',
        state: '已完成',
        riderID: '111',
        money: '10',
    }
]);
let dialogFormVisible = $ref(false);
let dialogType = $ref("编辑");
let orderForm = $ref([]);
let disabled = $ref(true);

// 方法
// 编辑信息
const modifyOrder = (row) => {
    dialogFormVisible = true;
    disabled = true;
    dialogType = "编辑";
    form = { ...row };
}
// 添加
const addOder = () => {
    dialogFormVisible = true;
    form = {};
    dialogType = 'add';
    disabled = false;
}

// 确认
const comfirmForm = (val) => {
    dialogFormVisible = false;

    // 判断是添加还是编辑
    // 添加
    if (dialogType === 'add') {
        // 1.拿到数据
        // 2.添加到表格
        orderData.push({
            ...orderForm
        })
        console.log(orderForm);
    } else {
        
        // 编辑修改
        // 1.获取到当前这条数据的索引
        let index = orderData.findIndex(item => item.userID === val.userID);
        // 2.替换当前索引值对应的数据
        orderData[index] = val;
        console.log(val);
    }
}
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

/* 调整底部确认取消 */
.dialog-footer{
    display: flex;
    justify-content: center;
    align-content: center;
}
</style>