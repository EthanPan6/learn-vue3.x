<script setup lang="ts">
import {ref,onMounted}from 'vue'

import C from './C.vue'
const propsEmitRef=ref()

onMounted(()=>{
console.log(propsEmitRef.value.child);
propsEmitRef.value.childNode()
})
</script>

<template>
  <C ref="propsEmitRef"  />
</template>

<style>
</style>