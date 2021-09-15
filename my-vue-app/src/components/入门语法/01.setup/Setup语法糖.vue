
<!-- <script setup lang="ts">
const props=defineProps({
  title:{
    type:String,
    default:()=>'测试内容'
  }
})
console.log(props.title);
alert('888')
</script> -->
<script  lang="ts">
export default{
  props:{
    title:{
      type:String,
      default:()=>'测试信息'
    }
  },
  setup(props:any){
    console.log(props.title);
  }
}
</script>
<template>
<h2>大家好</h2>
</template>

<style>
</style>