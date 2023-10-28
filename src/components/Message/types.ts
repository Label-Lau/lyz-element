import type { VNode } from 'vue'
export interface MessageProps {
  message?: string | VNode
  duration?: number
  showClose?: boolean
  type?: 'success' | 'info' | 'warning' | 'error'
  onDestroy: () => void
}
export interface MessageContext {
  id: string
  vNode: VNode
  props: MessageProps
  offset?: number
}
export type CreateMessageProps = Omit<MessageProps, 'onDestroy'>
