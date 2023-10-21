<script lang="ts" setup>
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { DropdownProps, DropdownInstance, DropdownEmits, MenuOption } from './types'
import Tooltip from '../Tooltip/Tooltip.vue'
import type { TooltipInstance } from '../Tooltip/types'
import RenderVNode from '../Common/RenderVNode'

defineOptions({
  name: 'LyzDropdown'
})
withDefaults(defineProps<DropdownProps>(), {
  hideAfterClick: true
})
const emits = defineEmits<DropdownEmits>()
const tooltipRef = ref<TooltipInstance | null>(null)
const visibleChange = (e: boolean) => {
  emits('visible-change', e)
}
const itemClick = (e: MenuOption) => {
  if (e.disabled) {
    return
  }
  emits('select', e)
}

defineExpose<DropdownInstance>({
  show: () => tooltipRef.value?.show(),
  hide: () => tooltipRef.value?.hide()
})
</script>

<template>
  <div class="lyz-dropdown">
    <Tooltip
      ref="tooltipRef"
      :trigger="trigger"
      :placement="placement"
      :popper-options="popperOptions"
      :open-delay="openDelay"
      :close-delay="closeDelay"
      :manual="manual"
      @visible-change="visibleChange"
    >
      <slot />
      <template #content>
        <ul class="lyz-dropdown__menu">
          <template v-for="item in menuOptions" :key="item.key">
            <li v-if="item.divided" role="separator" class="divided-placeholder" />
            <li
              :id="`dropdown-item-${item.key}`"
              class="lyz-dropdown__item"
              :class="{ 'is-disabled': item.disabled, 'is-divided': item.divided }"
              @click="itemClick(item)"
            >
              <RenderVNode :v-node="item.label" />
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>
