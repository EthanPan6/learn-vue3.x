<script setup lang="ts">
import {ref,reactive,watch} from 'vue';
const count=ref(0);
function increatment(){
  count.value++
}
watch(count,(n,o)=>{
  console.log(n,o);
  
})
const user=reactive({
  name:'张三',
  age:18
})

 </script>

<template>
<h2>计数器</h2>
<p>{{count}}</p>
<button @click="increatment">增加</button>
</template>

<style>
</style>
