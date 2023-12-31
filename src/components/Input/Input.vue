<template>
  <div
    class="lyz-input"
    :class="{
      [`lyz-input--${type}`]: type,
      [`lyz-input--${size}`]: size,
      'is-disabled': disabled,
      'is-prepend': $slots.prepend,
      'is-append': $slots.append,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix,
      'is-focus': isFocus
    }"
  >
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <div v-if="$slots.prepend" class="lyz-input__prepend">
        <slot name="prepend" />
      </div>
      <div class="lyz-input__wrapper">
        <!-- prefix slot -->
        <span v-if="$slots.prefix" class="lyz-input__prefix">
          <slot name="prefix" />
        </span>
        <input
          ref="inputRef"
          v-bind="attrs"
          v-model="innerValue"
          class="lyz-input__inner"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          :disabled="disabled"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :autofocus="autofocus"
          :form="form"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <!-- suffix slot -->
        <span
          v-if="$slots.suffix || showClear || showPasswordArea"
          class="lyz-input__suffix"
          @click="keepFocus"
        >
          <slot name="suffix" />
          <Icon
            v-if="showClear"
            icon="circle-xmark"
            class="lyz-input__clear"
            @click="clear"
            @mousedown.prevent="() => {}"
          />
          <Icon
            v-if="showPasswordArea && passwordVisible"
            icon="eye"
            class="lyz-input__password"
            @click="togglePasswordVisible"
          />
          <Icon
            v-if="showPasswordArea && !passwordVisible"
            icon="eye-slash"
            class="lyz-input__password"
            @click="togglePasswordVisible"
          />
        </span>
      </div>
      <!-- append slot -->
      <div v-if="$slots.append" class="lyz-input__append">
        <slot name="append" />
      </div>
    </template>
    <!-- textarea -->
    <template v-else>
      <textarea
        v-bind="attrs"
        ref="inputRef"
        v-model="innerValue"
        class="lyz-textarea__wrapper"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :form="form"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </template>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, computed, useAttrs, nextTick, inject } from 'vue'
import type { Ref } from 'vue'
import type { InputProps, InputEmits } from './types'
import Icon from '../Icon/Icon.vue'
import { formItemContextKey } from '../Form/types'

defineOptions({
  name: 'LyzInput',
  inheritAttrs: false
})
const props = withDefaults(defineProps<InputProps>(), { type: 'text', autocomplete: 'off' })
const emits = defineEmits<InputEmits>()
const attrs = useAttrs()

const formItemContext = inject(formItemContextKey)
const runValidation = (trigger?: string) => {
  formItemContext?.validate(trigger).catch((e: any) => console.log(e.errors))
}

const innerValue = ref(props.modelValue)
const isFocus = ref(false)
const passwordVisible = ref(false)
const inputRef = ref() as Ref<HTMLInputElement>

const showClear = computed(
  () => props.clearable && !props.disabled && !!innerValue.value && isFocus.value
)
const showPasswordArea = computed(() => props.showPassword && !props.disabled && !!innerValue.value)
const togglePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value
}
const keepFocus = async () => {
  await nextTick()
  inputRef.value.focus()
}
const handleInput = () => {
  emits('update:modelValue', innerValue.value)
  emits('input', innerValue.value)
  runValidation('input')
}
const handleChange = () => {
  emits('change', innerValue.value)
  runValidation('change')
}
const handleFocus = (event: FocusEvent) => {
  isFocus.value = true
  emits('focus', event)
}
const handleBlur = (event: FocusEvent) => {
  isFocus.value = false
  emits('blur', event)
  runValidation('blur')
}
const clear = () => {
  innerValue.value = ''
  emits('update:modelValue', '')
  emits('clear')
  emits('input', '')
  emits('change', '')
}
watch(
  () => props.modelValue,
  (newValue) => {
    innerValue.value = newValue
  }
)
defineExpose({
  ref: inputRef
})
</script>
