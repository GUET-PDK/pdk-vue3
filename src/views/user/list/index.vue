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
            <el-button class="addBtn" color="#219EBC" @click="addUser">添加</el-button>
            <el-button class="deleteBtn" type="danger" @click="delUser">删除</el-button>
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
                <template #default="scope">
                    <el-button link type="primary" @click="modifyUser(scope.row)">修改</el-button>
                    <el-button link type="warning" @click="banUser(scope.row)">封禁</el-button>
                    <el-button link type="danger" @click="deleteUser(scope.row)">删除</el-button>
                </template>
            </el-table-column>
            </el-table>
        </div>

        <!-- 编辑订单信息弹框 -->
        <el-dialog v-model="dialogFormVisible" :title="dialogType === 'add' ? '新增' : '编辑'">
            <el-form :model="userForm">

            <el-form-item label="用户Id" :label-width="100" :required="!disabled" style="width:300px">
                <el-input v-model="userForm.userID" autocomplete="off" :disabled="disabled"/>
            </el-form-item>

            <el-form-item label="性别" :label-width="100" required style="width:300px">
                <el-radio-group v-model="userForm.sex">
                    <el-radio label="女" />
                    <el-radio label="男" />
                </el-radio-group>
            </el-form-item>

            <el-form-item label="联系电话" :label-width="100" required style="width:300px">
                <el-input v-model="userForm.telephone" autocomplete="off" />
            </el-form-item>

            <el-form-item label="地址" :label-width="100" required style="width:300px">
                <el-input v-model="userForm.address" autocomplete="off" />
            </el-form-item>
            </el-form>

            <!-- 底部确认或取消按钮 -->
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="comfirmForm(userForm)">确认</el-button>
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
import Search from '@/components/searchBox.vue'
import Pagination from '@/components/Pagination.vue'
import { ref } from 'vue'

let userData = $ref([
    {
        userID: 'Tom',
        sex: '女',
        telephone: '123456',
        address: 'aaa',
    },
    {
        userID: 'Tom',
        sex: '男',
        telephone: '123456',
        address: 'bbb',
    },
]);
let dialogFormVisible = $ref(false);
let dialogType = $ref("编辑");
let userForm = $ref([]);
let disabled = $ref(true);

// 方法
// 修改
const modifyUser = (row) => {
    dialogFormVisible = true;
    dialogType = "编辑";
    userForm = { ...row };
    disabled = true;
}
// 添加
const addUser = () => {
    dialogFormVisible = true;
    userForm = {};
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
        userData.push({
            ...userForm
        })
    } else {
        
        // 编辑修改
        // 1.获取到当前这条数据的索引
        let index = userData.findIndex(item => item.userID === val.userID);
        // 2.替换当前索引值对应的数据
        userData[index] = val;
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
</style>