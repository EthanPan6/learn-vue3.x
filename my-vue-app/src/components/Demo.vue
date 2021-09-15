
<script setup lang="ts">
const props=defineProps({
  msg:{
    type:String,
    default:()=>'测试内容'
  }
})
console.log(props.msg);
const emits=defineEmits(['hello'])

function send(){
  emits('hello','土豆土豆,我是马铃薯')
}

function childNode(){
  console.log('我被调用了');
  
}
defineExpose({
  child:'不好意思,暴露了',
childNode
})
</script>

<template>
<h2>大家好</h2>
<button @click="send">发送</button>
</template>

<style>
</style>