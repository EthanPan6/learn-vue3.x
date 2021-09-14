<template>
  <h2>个人信息</h2>
  <p>姓名:{{ name }}</p>
  <p>姓名:{{ age }}</p>
  <p>类型:{{ job.type }}</p>
  <p>薪资:{{ job.salary }}</p>
  <p><button @click="changeInfo">修改信息</button></p>
</template>

<script>
import { ref, reactive } from "vue";
export default {
  name: "App",
  data() {
    return {
      text: "占位",
    };
  },
  components: {},
  setup() {
    let name = ref("张三");
    let age = ref(34);
    let job = reactive({
      type: "fe",
      salary: 20,
    });
    let job2 = ref({
      type: "fe",
      salary: 20,
    });
    console.log(job, job2);
    function changeInfo() {
      name.value = "李斯";
      setInterval(() => age.value++, 800);
      job.salary++;
    }
    return {
      name,
      age,
      changeInfo,
      job,
    };
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
