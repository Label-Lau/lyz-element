<script setup lang="ts">
import { ref } from 'vue'
import type { ButtonProps } from './types'
import Icon from '../Icon/Icon.vue'

withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button'
})

defineOptions({
  name: 'LyzButton'
})

const _ref = ref<HTMLButtonElement>()

defineExpose({
  ref: _ref
})
</script>

<template>
  <button
    ref="_ref"
    class="lyz-button"
    :class="{
      [`lyz-button--${type}`]: type,
      [`lyz-size--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled
    }"
    :disabled="disabled || loading"
    :type="nativeType"
    :autofocus="autofocus"
  >
    <Icon v-if="loading" icon="spinner" spin />
    <Icon v-if="icon" :icon="icon" />
    <span>
      <slot />
    </span>
  </button>
</template>

<style scoped></style>
