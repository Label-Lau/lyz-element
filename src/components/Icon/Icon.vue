<script setup lang="ts">
import { computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { omit } from 'lodash-es'
import type { IconProps } from './types'

defineOptions({
  name: 'LyzIcon',
  inheritAttrs: false
})

const props = defineProps<IconProps>()
const iconProps = computed(() => omit(props, ['type', 'color']))
const customStyles = computed(() => {
  return props.color ? { color: props.color } : {}
})
</script>

<template>
  <i class="lyz-icon" v-bind="$attrs">
    <font-awesome-icon v-bind="iconProps" :style="customStyles" />
  </i>
</template>
