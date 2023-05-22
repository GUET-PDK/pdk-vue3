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
            <el-button class="addBtn" color="#219EBC" @click="handleAdd">添加</el-button>
            <el-button class="deleteBtn" type="danger">删除</el-button>
        </div>
        
        <!-- 表格 -->
        <div class="table">
            <el-table 
            style="width: 980px; height: 350px;"
            :data="pictureData"
            :cell-style="{ textAlign: 'center' }"
            :header-cell-style="{ 'text-align': 'center' }"
            ref="multipleTableRef"
            @selection-change="handleSelectionChange"
            >
            <el-table-column type="selection" width="80" />
            <el-table-column prop="id" label="序号" width="80" />
            <el-table-column prop="picture" label="图片" width="390" >
                <template v-slot="scope">
                    <el-image style=" height: 60px;" :src="scope.row.url" 
                    :preview-src-list="[scope.row.url]" fit="contain">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column prop="title" label="图片标题" width="200" />
            <el-table-column fixed="right" label="操作" width="200">
                <template #default="scope">
                    <el-button link type="primary" @click="editPic(scope.row)">编辑</el-button>
                    <el-button link type="danger" @click="deletePic(scope.row)">删除</el-button>
                </template>
            </el-table-column>
            </el-table>
        </div>

        <!-- 编辑图片弹框 -->
        <el-dialog v-model="dialogFormVisible" :title="dialogType === 'add' ? '新增' : '编辑'">
            <el-form :model="form">
                <!-- 标题 -->
            <el-form-item label="标题" :label-width="60" required>
                <el-input v-model="form.title" autocomplete="off" />
            </el-form-item>

            <!-- 图片上传修改 -->
            <el-form-item label="图片" :label-width="60" required>
                <el-upload
                class="avatar-uploader"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                :show-file-list="false"
                :http-request="imgUploadLicense"
                >
                    <img v-if="form.url" :src="form.url" class="avatar"/>
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
            </el-form-item>
            </el-form>

            <!-- 底部确认或取消按钮 -->
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="comfirmForm">确认</el-button>
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
import { Delete, Edit, Plus} from '@element-plus/icons-vue'
import { reactive, ref, toRefs } from 'vue'
// 用$ref就用不了watch监听,可以省略.value的使用

const pictureData = $ref([
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
    }
]);
let multipleTableRef = $ref([]);
let dialogFormVisible = $ref(false);
let dialogType = $ref('add')
let form = $ref({});


// 方法

// 多选
const handleSelectionChange = (val) => {
    multipleTableRef = val;
    console.log(multipleTableRef);
}

// 删除单条参数使用了解构数值，只获取id
// 还未完善
const deletePic = ({ id }) => {
    console.log(id);
}

//添加图片
const handleAdd = () => {
    dialogFormVisible = true;
    form = {};
    dialogType = 'add';
} 

// 编辑图片信息
const editPic = (row) => {
    dialogFormVisible = true;
    dialogType = "编辑";
    form = {...row};
}

// 弹框确认
const comfirmForm = () => {
    dialogFormVisible = false;

    // 判断是添加还是编辑
    // 添加
    if (dialogType === 'add') {
        // 1.拿到数据
        // 2.添加到表格
        pictureData.push({
            id: (pictureData.length + 1).toString(),
            ...form
        })
        console.log(form);
    } else {
        // 编辑修改
        // 1.获取到当前这条数据的索引
        let index = pictureData.findIndex(item => item.id === form.id);
        // 2.替换当前索引值对应的数据
        pictureData[index] = form;
    }
}
// 使用reactive解构
// const { pictureData } = toRefs(data);
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

/* 调整底部确认取消 */
.dialog-footer{
    display: flex;
    justify-content: center;
    align-content: center;
}
/* 上传图片边框 */
.avatar-uploader{
    width: 178px;
    height: 178px;
    border: 1px dashed #afb1b4;
    border-radius: 6px;
    cursor: pointer;
    display: block;
    margin-top: 10px;
}
.avatar-uploader:hover {
  border-color: rgb(232, 158, 164);
}
/* 上传图标大小 */
.avatar-uploader-icon{
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>