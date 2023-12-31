<template>
  <Transition :name="transitionName" @after-leave="destroyComponent" @enter="updateHeight">
    <div
      v-show="visible"
      ref="messageRef"
      class="lyz-message"
      :class="{
        [`lyz-message--${type}`]: type,
        'is-close': showClose
      }"
      role="alert"
      :style="cssStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <div class="lyz-message__content">
        <slot>
          {{ offset }} - {{ topOffset }} - {{ height }} - {{ bottomOffset }}
          <RenderVNode v-if="message" :v-node="message" />
        </slot>
      </div>
      <div v-if="showClose" class="lyz-message__close">
        <Icon icon="xmark" @click.stop="visible = false" />
      </div>
    </div>
  </Transition>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { MessageProps } from './types'
import { getLastBottomOffset } from './method'
import useEventListener from '../../hooks/useEventListener'
import RenderVNode from '../Common/RenderVNode'
import Icon from '../Icon/Icon.vue'
const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
  offset: 20,
  transitionName: 'fade-up'
})
const visible = ref(false)

const messageRef = ref<null | HTMLDivElement>()

/* 计算 div 的偏移高度 */
const height = ref(0)
// 上一个实例的最下面的坐标数字，第一个是 0
const lastOffset = computed(() => getLastBottomOffset(props.id))
// 这个元素应该使用的 top
const topOffset = computed(() => props.offset + lastOffset.value)
// 这个元素为下一个元素预留的 offset，也就是它最低端 bottom 的 值
const bottomOffset = computed(() => height.value + topOffset.value)
const cssStyle = computed(() => ({
  top: `${topOffset.value}px`,
  zIndex: props.zIndex
}))

let timer: NodeJS.Timeout
function startTimer() {
  if (props.duration === 0) return
  timer = setTimeout(() => {
    visible.value = false
  }, props.duration)
}
function clearTimer() {
  clearTimeout(timer)
}
onMounted(async () => {
  visible.value = true
  startTimer()
  // await nextTick()
  // height.value = messageRef.value!.getBoundingClientRect().height
})
function keydown(e: Event) {
  const event = e as KeyboardEvent
  if (event.code === 'Escape') {
    visible.value = false
  }
}
// watch(visible, (newValue) => {
//   if (!newValue) {
//     props.onDestroy()
//   }
// })
useEventListener(document, 'keydown', keydown)
function destroyComponent() {
  props.onDestroy()
}
function updateHeight() {
  height.value = messageRef.value!.getBoundingClientRect().height
}
defineExpose({
  bottomOffset,
  visible
})
</script>
<style>
.lyz-message {
  width: max-content;
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  border: 1px solid blue;
}
</style>
