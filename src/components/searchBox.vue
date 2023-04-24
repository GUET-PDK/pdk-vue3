<template>
  <div class="searchbox">
    <input type="text" placeholder="搜索" @input="searchText">
    <button class="icon-button" @click="searchOrder">
      <i class="iconfont icon-sousuo"></i>
    </button>
  </div>
</template>

<script setup>


</script>

<style scoped>
.searchbox{
    @apply bg-light-50 rounded-2xl shadow-lg;
    position: relative;
    width: 180px;
    padding: 3px;
    height: 37px;
}

.searchbox input{
    height: 30px;
    color: #9ca3af;
    border: 0;
    outline: none;
    background-color: transparent;
    padding-left: 6px;
    font-size: 14px;
}
/* 
.searchbox input::placeholder{
    color: #262729;
} */

.searchbox .icon-button{
  width: 22px;
  height: 22px;
  display: flex;
  position: absolute;
  right: 8px;
  top: 6px;
}
.searchbox .icon-button i{
  color: #9ca3af;
}
</style>