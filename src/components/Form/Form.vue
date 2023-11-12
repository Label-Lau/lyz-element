<template>
  <form class="lyz-form">
    <slot />
    <button @click.prevent="validate">Validate All</button>
  </form>
</template>
<script setup lang="ts">
import { provide } from 'vue'
import type { FormProps, FormItemContext, FormContext } from './types'
import { formContextKey } from './types'

const props = defineProps<FormProps>()
defineOptions({
  name: 'LyzForm'
})

const fields: FormItemContext[] = []
const addField: FormContext['addField'] = (field) => {
  fields.push(field)
}
const removeField: FormContext['removeField'] = (field) => {
  if (field.prop) {
    fields.splice(fields.indexOf(field), 1)
  }
}
const validate = () => {
  console.log('fields', fields)
}
provide(formContextKey, {
  ...props,
  addField,
  removeField
})
</script>
