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
        <!-- <div class="top">
            搜索框
            <Search class="searchbox"></Search>
            <div class="flex-box"></div>
            <el-button class="deleteBtn" type="danger" @click="delRider">删除</el-button>
        </div> -->
        <!-- 表格 -->
        <div class="table">
            <el-table 
            style="width: 980px; height: 380px;"
            :data="riderData"
            :cell-style="{ textAlign: 'center' }"
            :header-cell-style="{ 'text-align': 'center' }"
            ref="multipleTableRef"
            @selection-change="handleSelectionChange"
            >
            <el-table-column type="selection" width="50" />
            <el-table-column prop="id" label="id" width="50" />
            <el-table-column prop="userId" label="用户ID" width="150" />
            <el-table-column prop="idNumber" label="学号" width="100" />
            <el-table-column prop="cardNumber" label="身份证号" width="200" />
            <!-- 学生证照片 -->
            <el-table-column prop="idImage" label="图片" width="100" >
                <template v-slot="scope">
                    <el-image style="width: 50px; height: 60px;" :src="scope.row.idImage" 
                     fit="contain">
                    </el-image>
                </template>
            </el-table-column>

            <!-- 身份证照片 -->
            <el-table-column prop="cardImage" label="图片" width="100" >
                <template v-slot="scope">
                    <el-image style="width: 50px; height: 60px;" :src="scope.row.cardImage" 
                     fit="contain">
                    </el-image>
                </template>
            </el-table-column>

            <el-table-column prop="status" label="状态" width="100" >
                <template v-slot="scope">
                    <el-tag v-if="scope.row.status==0">审核中</el-tag>
                    <el-tag type="warning" v-if="scope.row.status==1">已通过</el-tag>
                    <el-tag type="danger"  v-if="scope.row.status==2">未通过</el-tag>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
                <template #default="scope">
                    <el-button-group class="group-Btn">
                    <el-button color="#219EBC"  :icon="Select" @click="agreeRider(scope.row)"/>
                    <el-button type="danger" :icon="CloseBold" @click="disagreeRider(scope.row)"/>
                </el-button-group>
                    
                </template>
            </el-table-column>
            </el-table>
        </div>

        <!-- 编辑骑手信息弹框 -->
        <!-- <el-dialog v-model="dialogFormVisible" :title="dialogType === 'add' ? '新增' : '编辑'">
            <el-form :model="riderForm">

            <el-form-item label="用户Id" :label-width="100" :required="!disabled" style="width:300px">
                <el-input v-model="riderForm.riderID" autocomplete="off" :disabled="disabled"/>
            </el-form-item>

            <el-form-item label="性别" :label-width="100" required style="width:300px">
                <el-radio-group v-model="riderForm.sex">
                    <el-radio label="女" />
                    <el-radio label="男" />
                </el-radio-group>
            </el-form-item>

            <el-form-item label="联系电话" :label-width="100" required style="width:300px">
                <el-input v-model="riderForm.telephone" autocomplete="off" />
            </el-form-item>

            <el-form-item label="地址" :label-width="100" required style="width:300px">
                <el-input v-model="riderForm.address" autocomplete="off" />
            </el-form-item>
            </el-form> -->

            <!-- 底部确认或取消按钮 -->
            <!-- <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="comfirmForm(riderForm)">确认</el-button>
            </span>
            </template>
        </el-dialog> -->

        <!-- 分页 -->
        <div class="pagination">
            <el-pagination
            :current-page="CurrentPage"
            layout="total, prev, pager, next, jumper"
            :total="total"
            :page-size="PageSize"
            @current-change="handleCurrentChange"
        />
        </div>
    </div>
</template>

<script setup>
import Search from '@/components/searchBox.vue'
import { ref, reactive, onMounted } from 'vue'
import { getApplyList, allowRunner, disAllowRunner} from '@/api/rider.js'
import { notification } from '@/utils/common.js'
import {Select, CloseBold} from '@element-plus/icons-vue'

let riderData = reactive([]);
let riderList = reactive([]);
let multipleTableRef = $ref([]); //多选
// 分页
let total = ref(1);
// 默认当前页为第一页
let CurrentPage = ref(1);
let PageSize = ref(4);
// let dialogFormVisible = $ref(false);
// let dialogType = $ref("编辑");
// let riderForm = $ref([]);
// let disabled = $ref(true);

// 方法
// 多选
const handleSelectionChange = (val) => {
    multipleTableRef = val;
    console.log(multipleTableRef);
}

// 获取所有骑手申请信息
const getAllRider = async() => {
    await getApplyList()
        .then((res) => {
            // console.log(res.data.data);
            const data = res.data.data;
            if (res.data.code === 200) {
                notification("获取数据成功", 'success');
                riderData = data;
                console.log("riderData", riderData);

                // 进行分页
                total.value = riderData.length;
                riderList = data;
                console.log("riderList", riderList);
                // 分割每页要显示的数据
                if (total.value > 5) {
                    riderData = riderList.slice(0, PageSize.value);
                } else {
                    riderData = riderList;
                }
                console.log(total.value);
        }
        }).catch((err) => {
        console.log(err);
    })
}

// 拒绝成为骑手
const disagreeRider = async(row) => {
    let rider = riderData.find(item => item.id === row.id);
    console.log(rider.id);
    await disAllowRunner(rider.id)
        .then((res) => {
            console.log(res.data);
            if (res.data.code === 200) {
                notification("已拒绝", 'success');
                getAllRider();
            } else {
                notification("请求失败", 'warning');
        }
        }).catch((err) => {
        console.log(err);
    })
}

// 同意成为骑手
const agreeRider = (row) => {
    let rider = riderData.find(item => item.id === row.id);
    console.log(rider.id);
    allowRunner(rider.id)
        .then((res) => {
            console.log(res.data);
            if (res.data.code === 200) {
                notification("已同意", 'success');
                getAllRider();
            } else {
                notification("该用户已成为骑手", 'warning');
        }
        }).catch((err) => {
        console.log(err);
    })
}

//当前是第几页,展示第几页的数据
const handleCurrentChange = (val) => {
      console.log('当前页',val);
      CurrentPage.value = val;
      // end表示可以到达最后一条数据
      const end = val * PageSize.value;
        //开始索引,和结束位置，不包含结束位置
      const data = riderList.slice(end - PageSize.value, end);
      //console.log('data', data);
      riderData = data;
    };

// 方法
onMounted(async() => {
   await getAllRider();
})

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
    margin-top: 40px;
}
</style>