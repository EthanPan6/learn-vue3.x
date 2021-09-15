<script setup lang="ts">
import C from './C.vue'
function getMsg(msg:String):void{
console.log(msg);
}
</script>

<template>
  <C @hello="getMsg"  />
</template>

<style>
</style>
