import { computed, defineComponent, Fragment, ref } from 'vue'
import type { PropType } from 'vue'
import type { Placement, Options } from '@popperjs/core'
import type { MenuOption } from './types'
import Tooltip from '../Tooltip/Tooltip.vue'
import type { TooltipInstance } from '../Tooltip/types'

export default defineComponent({
  name: 'LyzDropdown',
  props: {
    placement: {
      type: String as PropType<Placement>,
      default: 'bottom'
    },
    trigger: {
      type: String as PropType<'hover' | 'click'>,
      default: 'hover'
    },
    transition: {
      type: String,
      default: 'fade'
    },
    openDelay: {
      type: Number,
      default: 0
    },
    closeDelay: {
      type: Number,
      default: 0
    },
    popperOptions: {
      type: Object as PropType<Options>,
      default: () => ({})
    },
    menuOptions: {
      type: Array as PropType<MenuOption[]>,
      required: true
    },
    hideAfterClick: {
      type: Boolean,
      default: true
    },
    manual: {
      type: Boolean
    }
  },
  emits: ['visible-change', 'select'],
  setup(props, { slots, emit, expose }) {
    const tooltipRef = ref<TooltipInstance | null>(null)
    const itemClick = (e: MenuOption) => {
      if (e.disabled) return
      emit('select', e)
      if (props.hideAfterClick) {
        tooltipRef.value?.hide()
      }
    }
    const visibleChange = (e: boolean) => {
      emit('visible-change', e)
    }
    const option = computed(() => {
      return props.menuOptions.map((item) => {
        return (
          <Fragment key={item.key}>
            {item.divided && (
              <li
                role="separator"
                class={{
                  'divided-placeholder': true,
                  'is-disabled': item.disabled,
                  'is-divided': item.divided
                }}
              />
            )}
            <li
              class="vk-dropdown__item"
              id={`dropdown-item-${item.key}`}
              onClick={() => itemClick}
            >
              {item.label}
            </li>
          </Fragment>
        )
      })
    })
    expose({
      show: () => tooltipRef.value?.show(),
      hide: () => tooltipRef.value?.hide()
    })
    return () => (
      <div class="lyz-dropdown">
        <Tooltip
          trigger={props.trigger}
          placement={props.placement}
          popperOptions={props.popperOptions}
          openDelay={props.openDelay}
          closeDelay={props.closeDelay}
          manual={props.manual}
          ref={tooltipRef}
          {...{ onVisibleChange: visibleChange }}
        >
          {{
            default: () => slots.default && slots.default(),
            content: () => <ul class="lyz-dropdown__menu">{option.value}</ul>
          }}
        </Tooltip>
      </div>
    )
  }
})
