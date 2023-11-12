<script setup>
import { reactive } from 'vue'
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Form from '@/components/Form/Form.vue'
import FormItem from '@/components/Form/FormItem.vue'
import Input from '@/components/Input/Input.vue'
import Button from '@/components/Button/Button.vue'
const model = reactive({
  email: '',
  password: '',
  test: ''
})
const rules = {
  email: [
    { type: 'email', required: true, trigger: 'blur' },
    { type: 'string', required: true, trigger: 'input' }
  ],
  password: [{ type: 'string', required: true, trigger: 'blur', min: 3, max: 5 }],
  test: [{ type: 'string', required: true, trigger: 'blur' }]
}
</script>

<template>
  <div>
    <Form :model="model" :rules="rules">
      <FormItem label="the email" prop="email">
        <Input v-model="model.email" />
      </FormItem>
      <FormItem label="the password" prop="password">
        <template #label="{ label }">
          <Button>{{ label }}</Button>
        </template>
        <Input v-model="model.password" type="password" />
      </FormItem>
      <FormItem label="test value" prop="test">
        <template #default="{ validate }">
          <input v-model="model.test" type="text" @blur="validate" />
        </template>
      </FormItem>
      <div>
        <Button type="primary">Submit</Button>
        <Button>Reset</Button>
      </div>
    </Form>
    <p>form value:</p>

    <pre>{{ model }}</pre>
  </div>
</template>

<style></style>
