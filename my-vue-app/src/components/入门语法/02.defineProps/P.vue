<script setup lang="ts">
import {ref}from 'vue'
import C from './C.vue'
const sayHi=ref('大家好')
</script>

<template>
  <C  :msg='sayHi' />
</template>

<style>
</style>
