<!--
 * @Author: liangtd
 * @Date: 2023-04-11 22:16:39
 * @LastEditors: liangtd
 * @LastEditTime: 2023-04-11 22:59:30
 * @Description: 
-->
<template>
    <div class="bg">
        <div class="box main">
            <div class="error">
                <span class="error-con">哎呀，你访问的页面不存在！</span>
                <span>你输入的网址有误或链接已经过期。 </span>
                <span class="error-home"><a href="">返回首页</a> </span>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.bg {
    /* 脱离文档流方法
    设置页面单独背景色
    */
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    background-color: #fff;
    /*自动撑满整个屏幕*/
    min-height: 100vh;
}

.box {
    position: relative;
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
}

.main .error {
    width: 100%;
    padding: 560px 0 50px;
    background: url(@/assets/404/bgerror.png) no-repeat 50% 150px;
    text-align: center;
    color: #29AAE3;
}

.main .error span {
    display: block;
    font-size: 16px;
    margin: 5px 0;
}

.main .error .error-con {
    font-size: 24px;
}

.main .error .error-home {
    font-size: 24px;
    font-weight: 900;
    margin: 10px 0;
}

.main .error a {
    color: #29AAE3;
    text-decoration: none;
}
</style>