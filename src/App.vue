<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
// import type { Options } from '@popperjs/core'
import Button from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import Item from './components/Collapse/CollapseItem.vue'
import Icon from './components/Icon/Icon.vue'
import Tooltip from './components/Tooltip/Tooltip.vue'
import Dropdown from './components/Dropdown/Dropdown.vue'
import { createMessage } from './components/Message/method'
import type { MenuOption } from './components/Dropdown/types'
import type { ButtonInstance } from './components/Button/types'
import type { TooltipInstance } from './components/Tooltip/types'
const tooltipRef = ref<TooltipInstance | null>(null)
const buttonRef = ref<ButtonInstance | null>(null)
const size = ref<any>('3x')
const trigger = ref<any>('hover')
const openedValue = ref(['a'])
// const options: Partial<Options> = {}

const options: MenuOption[] = [
  { key: 1, label: h('b', 'this is bold') },
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3', divided: true },
  { key: 3, label: 'item3', divided: true },
  { key: 4, label: 'item4' }
]
const open = () => {
  tooltipRef.value?.show()
}
const close = () => {
  tooltipRef.value?.hide()
}
const inlineConsole = (...args: any) => {
  console.log(...args)
}
onMounted(() => {
  // const instance = createMessage({ message: 'hello world' })
  createMessage({ message: 'hello world again', duration: 0 })
  createMessage({ message: 'hello world three', duration: 0 })
  // createMessage({ message: 'hello world three', duration: 0 })
  if (buttonRef.value) {
    console.log('buttonRef', buttonRef.value.ref)
  }
  setTimeout(() => {
    // openedValue.value = ['a', 'b']
    // size.value = '2xl'
    // trigger.value = 'click'
    // instance.destroy()
  }, 2000)
})
</script>

<template>
  <header>
    <Tooltip
      ref="tooltipRef"
      placement="right"
      :trigger="trigger"
      :open-delay="300"
      :close-delay="300"
    >
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
      <template #content>
        <div>Hello tooltip</div>
      </template>
    </Tooltip>
    <Dropdown
      ref="tooltipRef"
      placement="right"
      :menu-options="options"
      manual
      @visible-change="(e) => inlineConsole('visible change', e)"
      @select="(e) => inlineConsole('select', e)"
    >
      <div>Dropdown</div>
      <template #content>
        <div>Hello tooltip</div>
      </template>
    </Dropdown>
  </header>
  <Icon icon="arrow-up" :size="size" type="danger" color="#0e7a0d" />
  <main>
    <Button ref="buttonRef" @click="open"> Test Button </Button>
    <Button plain @click="close"> Plain Button </Button>
    <Button round> Round Button </Button>
    <Button circle> VK </Button>
    <Button disabled> Disabled Button </Button><br /><br />
    <Button type="primary"> Primary </Button>
    <Button type="success"> Success </Button>
    <Button type="info"> Info </Button>
    <Button type="warning"> Warning </Button>
    <Button type="danger"> Danger </Button><br /><br />
    <Button type="primary" plain> Primary </Button>
    <Button type="success" plain> Success </Button>
    <Button type="info" plain> Info </Button>
    <Button type="warning" plain> Warning </Button>
    <Button type="danger" plain> Danger </Button><br /><br />
    <Button size="large"> Large </Button>
    <Button size="small"> Small </Button>
    <Button size="large" loading> Loading </Button>
    <Button size="large" icon="arrow-up"> Icon </Button><br /><br />

    <Collapse v-model="openedValue" accordion>
      <Item name="a">
        <template #title>
          <h1>nice title</h1>
        </template>
        <h1>headline title</h1>
        <div>this is content a aaa</div>
      </Item>
      <Item name="b" title="nice title b item b">
        <div>this is bbbbb test</div>
      </Item>
      <Item name="c" title="nice cccc" disabled>
        <div>this is cccc test</div>
      </Item>
    </Collapse>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    /* margin: 0 2rem 0 0; */
    border: 1px solid green;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
