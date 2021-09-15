<template>
  <div>
    <h2>生命周期</h2>
    <p>{{ count }}</p>
    <button @click="count++">增加</button>
  </div>
</template>

<script>
import { onBeforeMount } from "vue";
export default {
  data() {
    return { count: 1, timer: null };
  },
  beforeCreate() {
    console.log("beforeCreate");
    console.log("count is: ", this.count); // => "count is: undefined"
  },
  created() {
    console.log("created");
    console.log("count is: ", this.count); // => "count is: 1"
    this.timer = setInterval(() => {
      console.log("定时器执行中");
    }, 1000);
  },
  beforeMount() {
    console.log("beforeMount");
    console.log("$el is: ", this.$el); // => "$el is: null"
    console.log("$parent is: ", this.$parent); //=> "$parent is: Proxy {...}"
  },
  mounted() {
    console.log("mounted");
    console.log(this.$parent);
    console.log("$el is: ", this.$el); // => "$el is: [object HTMLDivElement]"
    console.log("$parent is: ", this.$parent); // => "$parent is: Proxy {...}"
  },
  beforeUpdate() {
    console.log("beforeUpdate");
    console.log("count is: ", this.count); // => "count is: 1"
  },
  updated() {
    console.log("updated");
    console.log("count is: ", this.count); // => "count is: 1"
  },
  beforeUnmount() {
    console.log("beforeUnmount");
    console.log("$el is: ", this.$el); // => "$el is: [object HTMLDivElement]"
    console.log("$parent is: ", this.$parent); // => "$parent is: Proxy {...}"
    clearInterval(this.timer);
  },
  unmounted() {
    console.log("unmounted");
    console.log("$el is: ", this.$el); // => "$el is: [object HTMLDivElement]"
    console.log("$parent is: ", this.$parent); //=> "$parent is: Proxy {...}"
  },
  setup() {
    console.log("setup中的this", this);
    onBeforeMount(() => {
      console.log("onBeforeMount");
    });
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>