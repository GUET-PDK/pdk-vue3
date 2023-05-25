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
        <!-- <div class="top">
            搜索框 
            <Search class="searchbox"></Search>
            <div class="flex-box"></div>
            <el-button class="deleteBtn" type="danger" @click="delUser">删除</el-button>
        </div> -->
        <!-- 表格 -->
        <div class="table">
            <el-table 
            style="width: 980px; height: 380px;"
            :data="userData"
            :cell-style="{ textAlign: 'center' }"
            :header-cell-style="{ 'text-align': 'center' }"
            ref="multipleTableRef"
            @selection-change="handleSelectionChange"
            >
            <el-table-column type="selection" width="100" />
            <el-table-column prop="createTime" label="创建时间" width="200" />
            <el-table-column prop="userId" label="用户ID" width="150" />
            <el-table-column prop="userAvatar" label="头像" width="150" >
                <template v-slot="scope">
                    <el-image style="width: 80px; height: 60px;" :src="scope.row.userAvatar" 
                     fit="contain">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column prop="userPhone" label="联系电话" width="150" />
            <el-table-column prop="status" label="用户状态" width="100" >
                <template v-slot="scope">
                    <el-tag v-if="scope.row.status==0">正常</el-tag>
                    <el-tag type="warning" v-if="scope.row.status==1">封禁</el-tag>
                    <el-tag type="danger"  v-if="scope.row.status==2">已删除</el-tag>
                </template>
            </el-table-column>    
            <el-table-column fixed="right" label="操作" width="150">
                <template #default="scope">
                    <el-button link type="danger" @click="ban(scope.row)">封禁</el-button>
                    <el-button link type="primary" @click="pin(scope.row)">解禁</el-button>
                </template>
            </el-table-column>
            </el-table>
        </div>

        <!-- 编辑用户信息弹框 -->
        <!-- <el-dialog v-model="dialogFormVisible" :title="dialogType === 'add' ? '新增' : '编辑'">
            <el-form :model="userForm">

            <el-form-item label="创建时间" :label-width="100" style="width:300px">
                <el-input v-model="userForm.createTime" autocomplete="off" :disabled="disabled"/>
            </el-form-item>

            <el-form-item label="用户Id" :label-width="100" style="width:200px">
                <el-input v-model="userForm.userId" autocomplete="off" :disabled="disabled"/>
            </el-form-item>

            <el-form-item label="用户名" :label-width="100" :required="!disabled" style="width:200px">
                <el-input v-model="userForm.userName" autocomplete="off" :disabled="disabled"/>
            </el-form-item>

            <el-form-item label="联系电话" :label-width="100" required style="width:300px">
                <el-input v-model="userForm.userPhone" autocomplete="off" />
            </el-form-item>

            <el-form-item label="地址" :label-width="100" required style="width:300px">
                <el-input v-model="userForm.address" autocomplete="off" />
            </el-form-item>
            </el-form> -->

            <!-- 底部确认或取消按钮 -->
            <!-- <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="comfirmForm(userForm)">确认</el-button>
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
import { onMounted, ref, reactive} from 'vue'
import { getUserMessage } from '@/api/user.js'
import { notification } from '@/utils/common.js'
import { banUser, pinUser} from '@/api/user.js'

let userData = reactive([]);
let userList = reactive([]);
let multipleTableRef = $ref([]);  //多选
// 分页
let total = ref(1);
// 默认当前页为第一页
let CurrentPage = ref(1);
let PageSize = ref(4);
let userId = reactive("");
// let itemKey = reactive(0);


// 获取所有用户信息
const getAllUser = async() => {
    await getUserMessage()
        .then((res) => {
            // console.log(res.data.data);
            const data = res.data.data;
            if (res.data.code === 200) {
                notification("获取数据成功", 'success');
                userData = data;
                // console.log("userData", userData);

                // 进行分页
                total.value = userData.length;
                userList = data;
                console.log("userList", userList);
                // 分割每页要显示的数据
                if (total.value > 5) {
                    userData = userList.slice(0, PageSize.value);
                } else {
                    userData = userList;
                }
                console.log(total.value);
            } else {
                notification("获取数据失败", 'warning');
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
      const data = userList.slice(end - PageSize.value, end);
      //console.log('data', data);
      userData = data;
    };

// 封禁用户
const ban = (row) => {
    let user = userData.find(item => item.userId === row.userId)
    userId = user.userId;
    console.log(userId);
    banUser(userId)
        .then((res) => {
            console.log(res.data);
            if (res.data.code === 200) {
                notification("成功封禁", 'success');
                // location.reload()
            } else {
                notification("请求失败", 'warning');
        }
        }).catch((err) => {
        console.log(err);
    })
}

// 解禁用户
const pin = (row) => {
    let user = userData.find(item => item.userId === row.userId)
    userId = user.userId;

    console.log(userId);
    pinUser(userId)
        .then((res) => {
            console.log(res.data);
            if (res.data.code === 200) {
                notification("成功解禁", 'success');
                // location.reload()
            } else {
                notification("请求失败", 'warning');
        }
        }).catch((err) => {
        console.log(err);
    })
}

// 多选
const handleSelectionChange = (val) => {
    multipleTableRef = val;
    console.log(multipleTableRef);
}

onMounted(async() => {
   await getAllUser();
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
    margin-top: 40px;
}
</style>