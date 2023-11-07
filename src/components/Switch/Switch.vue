<template>
  <div
    class="lyz-switch"
    :class="{
      [`lyz-switch--${size}`]: size,
      'is-disabled': disabled,
      'is-checked': checked
    }"
    @click="switchValue"
  >
    <input
      ref="input"
      class="lyz-switch__input"
      type="checkbox"
      role="switch"
      :name="name"
      :disabled="disabled"
      @keydown.enter="switchValue"
    />
    <div class="lyz-switch__core">
      <div class="lyz-switch__core-inner">
        <span v-if="activeText || inactiveText" class="lyz-switch__core-inner-text">
          {{ checked ? activeText : inactiveText }}
        </span>
      </div>
      <div class="lyz-switch__core-action"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { SwitchProps, SwitchEmits } from './types'

defineOptions({
  name: 'LyzSwitch',
  inheritAttrs: false
})
const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true,
  inactiveValue: false
})
const emits = defineEmits<SwitchEmits>()

const innerValue = ref(props.modelValue)
const input = ref<HTMLInputElement>()
// 现在是否被选中
const checked = computed(() => innerValue.value === props.activeValue)

const switchValue = () => {
  console.log('switchValue')

  if (props.disabled) return
  const newValue = checked.value ? props.inactiveValue : props.activeValue
  innerValue.value = newValue
  emits('update:modelValue', newValue)
  emits('change', newValue)
  console.log('🚀 ~ file: Switch.vue:58 ~ switchValue ~ newValue:', newValue)
}
onMounted(() => {
  input.value!.checked = checked.value
})
watch(checked, (val) => {
  input.value!.checked = val
})
watch(
  () => props.modelValue,
  (newValue) => {
    innerValue.value = newValue
  }
)
</script>
