<template>
  <h1>我是APP组件</h1>
</template>
<script setup>
export default {
  name: "App",
  setup() {
    let name = "张三";
    let age = 18;
    function sayHi() {
      alert(`我是${name},今年${age}了`);
    }
  },
};
</script>
<style>
</style>
