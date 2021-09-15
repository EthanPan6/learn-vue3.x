<script setup lang="ts">

const emits=defineEmits(['hello'])

function send(){
  emits('hello','土豆土豆,我是马铃薯')
}
</script>

<template>
<h2>大家好</h2>
<button @click="send">发送</button>
</template>

<style>
</style>
