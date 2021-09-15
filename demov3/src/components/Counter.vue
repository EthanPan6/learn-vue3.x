<template>
  <h2>{{ title }}</h2>
  <p>{{ count }}</p>
  <button @click="click">增加</button>
  <button @click="change">修改</button>
</template>

<script>
import { ref, watch } from "vue";
export default {
  setup() {
    let count = ref(0);
    function click() {
      count.value += 1;
    }

    let title = ref("计数器组件");
    function change() {
      title.value = "计数器";
    }
    //监视单个数据
    // watch(title, (count, prevCount) => {
    //   console.log(count, prevCount);
    // });
    // watch(count, (count, prevCount) => {
    //   console.log(count, prevCount);
    // });

    //同时监视2个
    watch([count, title], ([count, title], [prevcount, prevtitle]) => {
      console.log([count, title], [prevcount, prevtitle]);
    });
    return { count, click, title, change };
  },
};
</script>

<style lang="scss" scoped>
</style>