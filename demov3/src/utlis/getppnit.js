import { onMounted, onBeforeUnmount, reactive } from 'vue';

export function getpoint() {
  let point = reactive({
    x: 0, y: 0
  });

  function savePoint(event) {
    point.x = event.pageX
    point.y = event.pageY
  }
  onMounted(() => {
    window.addEventListener('click', savePoint)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('click', savePoint)
  })
  return point
}