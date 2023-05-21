<!--
 * @Author: liangtd
 * @Date: 2023-04-14 14:04:16
 * @LastEditors: liangtd
 * @LastEditTime: 2023-04-14 14:06:59
 * @Description: 其他模块 - 图库管理
-->

<template>
    <div class="container">
        <div class="button">
            <div class="flex-box"></div>
            <el-button class="addBtn" color="#219EBC">添加</el-button>
            <el-button class="deleteBtn" type="danger">删除</el-button>
        </div>
        
        <!-- 表格 -->
        <div class="table">
            <el-table 
            style="width: 980px; height: 350px;"
            :data="pictureData"
            :cell-style="{ textAlign: 'center' }"
            :header-cell-style="{ 'text-align': 'center' }"
            >
            <el-table-column type="selection" width="80" />
            <el-table-column prop="id" label="序号" width="80" />
            <el-table-column prop="picture" label="图片" width="390" >
                <template v-slot="scope">
                    <el-image style=" height: 60px;" :src="scope.row.url" 
                    :preview-src-list="[scope.row.url]">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column prop="title" label="标题" width="200" />
            <el-table-column fixed="right" label="操作" width="200">
                <template #default="scope">
                    <el-button text type="primary" @click="dialogFormVisible = true">编辑</el-button>
                    <el-button link type="danger" @click="deletePic(scope.row)">删除</el-button>
                </template>
            </el-table-column>
            </el-table>
        </div>

        <!-- 编辑图片弹框 -->
        <el-dialog v-model="dialogFormVisible" title="Shipping address">
            <el-form :model="form">
            <el-form-item label="Promotion name" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Zones" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="Please select a zone">
                <el-option label="Zone No.1" value="shanghai" />
                <el-option label="Zone No.2" value="beijing" />
                </el-select>
            </el-form-item>
            </el-form>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">
                Confirm
                </el-button>
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
import Pagination from '@/components/Pagination.vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import { reactive } from 'vue'

const pictureData = [
    {
        id: 1,
        piture: 'Tom',
        url: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        title: 'aaa',
    },
    {
        id: 2,
        piture: 'Tom',
        url: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        title: 'aaa',
    },
];


let visible = false;
const formData = [ ];
    


const modifyPic = (row) => {
    visible = true;

}

</script>

<style scoped>
.button{
    display: flex;
    height: 50px;
}
.flex-box{
    flex: 1;
}

.deleteBtn{
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