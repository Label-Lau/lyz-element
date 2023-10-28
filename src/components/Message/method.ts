import { render, h } from 'vue'
import type { CreateMessageProps, MessageContext } from './types'
import MessageConstructor from './Message.vue'

let seed = 1
const instances: MessageContext[] = []
export const createMessage = (props: CreateMessageProps) => {
  const id = `message_${seed++}`
  const container = document.createElement('div')
  const destroy = () => {
    const idx = instances.findIndex((ins) => ins.id === id)
    if (idx < 0) return
    instances.splice(idx, 1)
    render(null, container)
  }
  const newProps = {
    ...props,
    onDestroy: destroy
  }
  const vNode = h(MessageConstructor, newProps)
  render(vNode, container)
  document.body.appendChild(container.firstElementChild!)
  const instance = {
    id,
    vNode,
    props: newProps
  }
  instances.push(instance)
  return instance
}

export const getLastInstance = () => {
  return instances[instances.length - 1]
}

export const getLastBottomOffset = () => {
  return 0
}
