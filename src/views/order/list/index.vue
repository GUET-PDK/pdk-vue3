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
        <!-- <div class="top">
            搜索框
            <Search 
            class="searchbox"
            :data="orderData"
            ></Search>
            <div class="flex-box"></div>
            <el-button class="deleteBtn" type="danger" @click="delOrder">删除</el-button>
        </div> -->

        <!-- 表格 -->
        <div class="table">
            <el-table 
            style="width: 980px; height: 380px;"
            :data="orderData"
            :cell-style="{ textAlign: 'center' }"
            :header-cell-style="{ 'text-align': 'center' }"
            ref="multipleTableRef"
            @selection-change="handleSelectionChange"
            >
            <el-table-column type="selection" width="50" />
            <el-table-column prop="orderId" label="订单id" width="80" />
            <el-table-column prop="createTime" label="下单时间" width="150" />
            <el-table-column prop="userId" label="用户ID" width="150" />
            <el-table-column prop="remark" label="订单描述" width="300" />
            <el-table-column prop="orderStatus" label="订单状态" width="120" >
                <template v-slot="scope">
                    <el-tag type="warning" v-if="scope.row.orderStatus==0">待接单</el-tag>
                    <el-tag type="danger" v-if="scope.row.orderStatus==1">配送中</el-tag>
                    <el-tag  v-if="scope.row.orderStatus==2">已完成</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="takeUserId" label="骑手ID" width="120" />
            <el-table-column prop="price" label="订金(元)" width="120" />
            <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                    <el-button link type="danger" @click="deleteOrder(scope.row)">删除</el-button>
                </template>
            </el-table-column>
            </el-table>            
        </div>

        <!-- 编辑订单信息弹框 -->
        <!-- <el-dialog v-model="dialogFormVisible" :title="dialogType === 'add' ? '新增' : '编辑'">
            <el-form :model="orderForm">
            <el-form-item label="时间" :label-width="100" :required="!disabled" style="width:300px"
            >
                <el-input v-model="orderForm.date" autocomplete="off" :disabled="disabled"/>
            </el-form-item>

            <el-form-item label="用户Id" :label-width="100" :required="!disabled" style="width:300px">
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
            </el-form> -->

            <!-- 底部确认或取消按钮 -->
            <!-- <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="comfirmForm(orderForm)">确认</el-button>
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
import { onMounted, reactive, ref } from 'vue'
import Search from '@/components/searchBox.vue'
import { getAllOrders, delOrder} from '@/api/order.js'
import { notification } from '@/utils/common.js'


let orderData = reactive([]);
let orderList = reactive([]);
// let dialogFormVisible = $ref(false);
// let dialogType = $ref("编辑");
// let orderForm = $ref([]);
// let disabled = $ref(true);
let multipleTableRef = $ref([]);   //多选
// 分页
let total = ref(1);
// 默认当前页为第一页
let CurrentPage = ref(1);
let PageSize = ref(4);

// 方法

// 获取所有订单信息
const getAllOrderList = async() => {
    await getAllOrders()
        .then((res) => {
            const data = res.data.data;
            if (res.data.code === 200) {
                notification("获取数据成功", 'success');
                orderData = data;
                console.log("orderData", orderData);

                // 进行分页
                total.value = orderData.length;
                orderList = data;
                console.log("orderList", orderList);
                // 分割每页要显示的数据
                if (total.value > 5) {
                    orderData = orderList.slice(0, PageSize.value);
                } else {
                    orderData = orderList;
                }
                console.log(total.value);
            }
        }).catch((err) => {
        console.log(err);
    })
}

// 删除订单
const deleteOrder = (row) => {
    let order = orderData.find(item => item.orderId === row.orderId);
    console.log(order);
    delOrder(order.orderId)
        .then((res) => {
            console.log(res.data);
            if (res.data.code === 200) {
                notification("已删除", "success");
                location.reload()
            } else {
                notification("请求失败", "warning");
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
      const data = orderList.slice(end - PageSize.value, end);
      //console.log('data', data);
      orderData = data;
    };

onMounted(async() => {
    // 获取订单信息
   await getAllOrderList();
})

// 多选
const handleSelectionChange = (val) => {
    multipleTableRef = val;
    console.log(multipleTableRef);
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
    margin-top: 40px;
}

/* 调整底部确认取消 */
.dialog-footer{
    display: flex;
    justify-content: center;
    align-content: center;
}
</style>