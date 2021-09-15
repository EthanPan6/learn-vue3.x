<template>
  <!-- <Counter />
  <Cpn1 msg="大家好" time="2021/09/14" @hello="test">
    <p>大家好(来自插槽的信息)</p>
  </Cpn1> -->
  <LifeCycle />
</template>

<script>
// import { ref, reactive } from "vue";
// import Cpn1 from "./components/Cpn1.vue";
// import Counter from "./components/Counter.vue";
import LifeCycle from "./components/LifeCycle.vue";
export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    //  Cpn1, Counter,
    LifeCycle,
  },
  setup() {
    // console.log(props, context);
    function test(value) {
      console.log("get a emit " + value);
    }
    return { test };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
