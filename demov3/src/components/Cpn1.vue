<template>
  <h2>个人信息</h2>
  <p>姓名:{{ name }}</p>
  <p>年龄:{{ age }}</p>
  <p>虚岁:{{ aage }}</p>
  <p>信息:{{ msg }}</p>
  <p>时间:{{ time }}</p>
  <slot></slot>
  <button @click="send">测试</button>
</template>

<script>
import { ref, computed } from "vue";

export default {
  name: "Cpn1",
  props: ["msg", "time"],
  emits: ["hello"],
  setup(props, context) {
    console.log("props", props);
    let name = ref("张三");
    let age = ref(34);
    let aage = computed({
      get: () => age.value.value + 1,
      set: (val) => {
        age.value.value = val - 1;
      },
    });

    function send() {
      context.emit("hello", age.value);
    }
    return {
      name,
      age,
      aage,
      send,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>