
<script setup lang="ts">
const props=defineProps({
  msg:{
    type:String,
    default:()=>'测试内容'
  }
})
console.log(props.msg);
</script>

<template>
<h2>大家好</h2>
</template>

<style>
</style>