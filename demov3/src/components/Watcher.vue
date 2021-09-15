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
  <h3>
    官网:侦听一个响应式对象或数组将始终返回该对象的当前值和上一个状态值的引用。为了完全侦听深度嵌套的对象和数组，可能需要对值进行深拷贝。
    通过诸如 lodash.cloneDeep 这样的实用工具来实现
  </h3>
</template>

<script>
import { ref, watch, reactive } from "vue";
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
    //情况一:监视单个ref数据
    // watch(
    //   msg,
    //   (count, oldCount) => {
    //     console.log(count, oldCount);
    //   },{immediate: true, /*立即执行*/}
    // );
    // watch(count, (count,oldCount) => {
    //   console.log(count,oldCount);
    // });

    //情况二:同时监视2个ref数据
    // watch([count, msg], ([count, msg], [oldcount,oldmsg]) => {
    //   console.log([count, msg], [oldcount,oldmsg]);
    // });

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

    //情况三:监视单个reactive数据:无法正确的获取oldValue,无法关闭深度监视(并非默认开启深度)
    // watch(
    //   person,
    //   (count, oldCount) => {
    //     console.log(count, oldCount);
    //   },
    //   { deep: false }
    // );

    // watch(
    //   // person.age,
    //   //情况四:监视单个reactive数据的某个属性:报提醒,且监视不生效,必须使用函数形式
    //   () => person.age,
    //   (count, oldCount) => {
    //     console.log(count, oldCount);
    //   },
    //   { deep: false }
    // );

    //情况五:监视单个reactive数据的某些属性
    // watch(
    //   [() => person.age, () => person.name],
    //   (count, oldCount) => {
    //     console.log(count, oldCount);
    //   },
    //   { deep: false }
    // );

    //情况六:监视单个reactive数据的某个对象:
    //监听不生效,必须精确到具体属性,或者开启深度(依旧无法正确的获取oldValue)
    watch(
      () => person.jobs,
      // () => person.jobs.j1.salary,
      (count, oldCount) => {
        console.log(count, oldCount);
      },
      { deep: true }
    );

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