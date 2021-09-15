<script setup lang="ts">
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
</template>

<style>

</style>