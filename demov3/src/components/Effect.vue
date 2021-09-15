<template>
  <h2>个人信息</h2>
  <p>姓名:{{ person.name }}<button @click="changeName">增加</button></p>
  <p>年龄:{{ person.age }}<button @click="addAge">增加</button></p>
  <p>
    薪资:{{ person.jobs.j1.salary
    }}<button @click="person.jobs.j1.salary++">加薪</button>
  </p>

  <p>数量:{{ count }}<button @click="click">增加</button></p>
  <p>数量:{{ msg }}<button @click="change">增加</button></p>
</template>

<script>
import { ref, watchEffect, reactive } from "vue";
export default {
  setup() {
    let count = ref(0);
    function click() {
      count.value += 1;
    }

    let msg = ref("大家好");
    function change() {
      msg.value += "!";
    }

    let person = reactive({
      name: " 张三",
      age: 18,
      jobs: {
        j1: {
          salary: 18,
          type: "fe",
        },
        j2: {
          salary: 8,
          type: "be",
        },
      },
    });

    watchEffect(() => {
      const watchCount = count.value;
      const watchSalary = person.jobs.j1.salary;
      console.log("watchEffect执行了", watchCount, watchSalary);
    });

    function changeName() {
      person.name += "_";
    }
    function addAge() {
      person.age++;
    }
    return { count, click, msg, change, person, changeName, addAge };
  },
};
</script>

<style lang="scss" scoped>
</style>