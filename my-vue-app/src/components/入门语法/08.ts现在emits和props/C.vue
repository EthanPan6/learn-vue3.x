<script setup lang="ts">
const props = defineProps<{msg:?{string|number}}>();
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
 </script>

<template>
<h3>
  {{props.msg}}
</h3>
<button @click="send"></button>
</template>

<style>

</style>
