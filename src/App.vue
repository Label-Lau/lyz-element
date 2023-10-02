<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from './components/Button/Button.vue'
import type { ButtonInstance } from './components/Button/types'
import './styles/index.css'

const buttonRef = ref<ButtonInstance | null>(null)
onMounted(() => {
  if (buttonRef.value) {
    console.log('buttonRef', buttonRef.value.ref)
  }
})
</script>

<template>
  <div>
    <Button ref="buttonRef" type="danger" size="large">
      Test Button
    </Button>

    <h1>hello world</h1>

    <h2>hello world</h2>

    <h3>hello world</h3>
    <a href="#">The link</a> +
    <hr>
  </div>
</template>

<style scoped></style>
