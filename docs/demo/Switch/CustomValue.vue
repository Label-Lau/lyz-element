<script setup>
import { ref } from 'vue'
import Switch from '@/components/Switch/Switch.vue'
const test = ref('right')
</script>
<template>
  <Switch v-model="test" active-value="right" inactive-value="wrong" />
  <h4>model-value: {{ test }}</h4>
</template>
