<!--
 * @Author: liangtd
 * @Date: 2023-04-12 09:34:24
 * @LastEditors: liangtd
 * @LastEditTime: 2023-04-12 16:22:29
 * @Description: 
-->
<template>
    <div class="login-container">
        <div class="content">
            <div class="left">
                <img src="@/assets/login/img1.png" :class="isPeople ? 'p-other-animtion' : 'p-animtion'" class="people"
                    alt="people" @animationend="handleAnimationend('people')">
                <img src="@/assets/login/img2.png" :class="isSphere ? 's-other-animtion' : 's-animtion'" class="sphere"
                    alt="sphere" @animationend="handleAnimationend('sphere')">
            </div>

            <div class="right">
                <div class="right-content">
                    <h2 class="title">欢迎回来,管理员</h2>
                    <div class="tip">
                        <span class="line"></span>
                        <span>账号登录</span>
                        <span class="line"></span>
                    </div>

                    <!-- 登录表单 -->
                    <div class="flex justify-center items-center" >
                        <el-form :model="form" class="w-[48%]" :rules="rules" ref="formRef">
                          <!-- prop表单规则 -->
                            <el-form-item prop="phone">
                                <el-input v-model="form.phone" size="large" placeholder="请输入电话号码">
                                    <template #prefix>
                                        <el-icon>
                                            <User />
                                        </el-icon>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="code">
                                <el-input v-model="form.code" style="width: 146px;" size="large" placeholder="请输入验证码" >
                                    <template #prefix>
                                        <el-icon>
                                            <Lock />
                                        </el-icon>
                                    </template>
                                </el-input>
                                <el-button color="#4460f1" style="height: 38px;" @click="sendCaptcha()">发送验证码</el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" :loading="loading" @click="submit(form)" class="submit-btn" round color="#4460f1">
                                    登录
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted, onUnmounted } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import { notification } from "@/utils/common.js"
import { User, Lock } from "@element-plus/icons-vue"
import { setToken } from "../utils/token"
import { sendCode, login } from "../api/homePage"

const router = useRouter()
const store = useStore()

// 表单数据
let form = reactive({
    phone: "",
    code: ""
})



// 表单校验
const rules = reactive({
    phone: [
        { required: true, message: '电话号码不能为空', trigger: 'blur' }
    ],
    code: [
        { required: true, message: '验证码不能为空', trigger: 'blur' }
    ]
})

let formRef = ref(null)
let loading = ref(false)

// 发送验证码
const sendCaptcha = () => {
  // 向后端传的表单数据
  let formData = new FormData();
  formData.append('phone', form.phone);
  // axios.post(
  //   "admin/getCode", formData
  // )
  sendCode(formData)
    .then((res) => {
      console.log(res.data.code);
      if (res.data.code === 200) {
        notification("发送成功！","success")
      } else {
        notification("发送失败！","warning")
      }
      console.log(res);
    }).catch((err) => {
      console.log(err);
  })
}

// 表单提交方法
function submit(form) {
    formRef.value.validate(async valid => {
        if (!valid) return
        loading.value = true
      try {
        console.log(form);
        login(form).then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            notification("登陆成功！", "success")
            const token = res.headers['token'];
            setToken(token);
            // 动态路由至首页
            router.push("/")
          } else {
            notification("登录失败！","warning")
          }
        })

        } finally {
            loading.value = false
        }
    })
}
// 添加键盘监听
onMounted(() => {
    document.addEventListener("keyup", onKeyUp)
})
// 移除事件
onUnmounted(() => {
    document.removeEventListener("keyup", onKeyUp)
})
function onKeyUp(event) {
    if (event.key == "Enter") submit(form)
}

// 处理动画结束事件
const isPeople = ref(false)
const isSphere = ref(false)
function handleAnimationend(className) {
    if (className == "people") {
        isPeople.value = true
    } else {
        isSphere.value = true
    }
}
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background-color: #abc6f8;
  background-image: radial-gradient(closest-side, rgb(255, 255, 255), rgba(235, 105, 78, 0)), radial-gradient(closest-side, rgb(250, 203, 203), rgba(243, 11, 164, 0)), radial-gradient(closest-side, rgb(237, 252, 202), rgba(254, 234, 131, 0)), radial-gradient(closest-side, rgb(197, 248, 241), rgba(170, 142, 245, 0)), radial-gradient(closest-side, rgb(206, 200, 243), rgba(248, 192, 147, 0));
  background-size: 130vmax 130vmax, 80vmax 80vmax, 90vmax 90vmax, 110vmax 110vmax, 90vmax 90vmax;
  background-position: -80vmax -80vmax, 60vmax -30vmax, 10vmax 10vmax, -30vmax -10vmax, 50vmax 50vmax;
  background-repeat: no-repeat;
  animation: 10s movement linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  width: 90%;
  height: 90vh;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.18);
  display: flex;
}

.left {
  flex: 1;
  position: relative;
}

.content .left .sphere {
  position: absolute;
  left: 30%;
  width: 90%;
  z-index: 1;
  animation: sphereAnimation 2s;
  animation-fill-mode: forwards;
  animation-timing-function: ease;
}

.content .left .people {
  position: absolute;
  left: -50%;
  top: 20%;
  width: 70%;
  z-index: 2;
}

.content .left .p-animtion {
  animation: peopleAnimation 2s;
  animation-fill-mode: forwards;
  animation-timing-function: ease;
}

.content .left .p-other-animtion {
  animation-name: pOtherAnimation;
  animation-direction: alternate;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-duration: 3s;
}

.content .left .s-animtion {
  animation: sphereAnimation 2s;
  animation-fill-mode: forwards;
  animation-timing-function: ease;
}

.content .left .s-other-animtion {
  animation-name: sOtherAnimation;
  animation-direction: alternate;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-duration: 3s;
}

.content .right {
  flex: 1;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: end;
  align-items: center;
}

.right .right-content {
  width: 90%;
}

.left .tip>div:first-child {
  @apply font-bold text-5xl text-light-50 mb-5;
}

.left .tip>div:last-child {
  @apply text-gray-200 text-sm;
}

.right .tip {
  color: #a0aab6;
  @apply flex items-center justify-center my-5 space-x-2;
}

.right .line {
  background-color: #c9d4e1;
  @apply h-[1px] w-16;
}

.right .right-content .title {
  text-align: center;
  letter-spacing: 3px;
  @apply font-bold text-3xl text-gray-800 my-7;
}

.right .submit-btn {
  border-radius: 25px;
  font-size: 15px;
  color: #fff;
  font-weight: 600;
  margin: 30px auto;
  box-shadow: -20px 28px 42px 0 rgb(62 145 255 / 37%);
  @apply w-80 h-[40px];
}

@keyframes movement {

  0%,
  100% {
    background-size: 130vmax 130vmax, 80vmax 80vmax, 90vmax 90vmax, 110vmax 110vmax, 90vmax 90vmax;
    background-position: -80vmax -80vmax, 60vmax -30vmax, 10vmax 10vmax, -30vmax -10vmax, 50vmax 50vmax;
  }

  25% {
    background-size: 100vmax 100vmax, 90vmax 90vmax, 100vmax 100vmax, 90vmax 90vmax, 60vmax 60vmax;
    background-position: -60vmax -90vmax, 50vmax -40vmax, 0vmax -20vmax, -40vmax -20vmax, 40vmax 60vmax;
  }

  50% {
    background-size: 80vmax 80vmax, 110vmax 110vmax, 80vmax 80vmax, 60vmax 60vmax, 80vmax 80vmax;
    background-position: -50vmax -70vmax, 40vmax -30vmax, 10vmax 0vmax, 20vmax 10vmax, 30vmax 70vmax;
  }

  75% {
    background-size: 90vmax 90vmax, 90vmax 90vmax, 100vmax 100vmax, 90vmax 90vmax, 70vmax 70vmax;
    background-position: -50vmax -40vmax, 50vmax -30vmax, 20vmax 0vmax, -10vmax 10vmax, 40vmax 60vmax;
  }
}

@keyframes sphereAnimation {
  0% {
    width: 10%;
  }

  100% {
    width: 90%;
    transform: translate(-30%, 5%);
  }
}

@keyframes peopleAnimation {
  0% {
    width: 40%;
  }

  100% {
    width: 70%;
    transform: translate(90%, -10%);
  }
}

@keyframes pOtherAnimation {
  0% {
    transform: translate(90%, -10%);
  }

  100% {
    transform: translate(90%, -15%);
  }
}

@keyframes sOtherAnimation {
  0% {
    transform: translate(-30%, 5%);
  }

  100% {
    transform: translate(-30%, 10%);
  }
}
</style>