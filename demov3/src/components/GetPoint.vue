<template>
  <div>
    <p>s鼠标坐标:x:{{ x }},y:{{ y }}</p>
    <p>{{ point.x }}</p>
  </div>
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";
import { getpoint } from "../utlis/getppnit";
export default {
  setup() {
    let x = ref(0);
    let y = ref(0);
    onMounted(() => {
      window.addEventListener("click", (e) => {
        x.value = e.pageX;
        y.value = e.pageY;
      });
    });
    let point = getpoint();
    return { x, y, point };
  },
};
</script>

<style lang="scss" scoped>
</style>