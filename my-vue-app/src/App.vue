<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import  Demo from './components/Demo.vue'
import {ref,onMounted}from 'vue'
function getMsg(msg:String):void{
console.log(msg);
}
const sayHi=ref('大家好')
const propsEmitRef=ref()

onMounted(()=>{
console.log(propsEmitRef.value.child);

propsEmitRef.value.childNode()
})
</script>

<template>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <Demo @hello="getMsg" :msg='sayHi' ref="propsEmitRef"/>
</template>

<style>
</style>
