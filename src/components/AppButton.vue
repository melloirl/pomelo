<script setup lang="ts">
import { computed } from 'vue'

type ButtonVariant = 'solid' | 'ghost'
type ButtonSize = 'default' | 'compact'

interface AppButtonProps {
  href?: string
  target?: string
  rel?: string
  type?: 'button' | 'submit' | 'reset'
  variant?: ButtonVariant
  size?: ButtonSize
  active?: boolean
}

const props = withDefaults(defineProps<AppButtonProps>(), {
  href: undefined,
  target: undefined,
  rel: undefined,
  type: 'button',
  variant: 'solid',
  size: 'default',
  active: false,
})

const tag = computed(() => (props.href ? 'a' : 'button'))

const resolvedRel = computed(() => {
  if (props.target !== '_blank') {
    return props.rel
  }

  return props.rel ?? 'noreferrer'
})

const sizeClass = computed(() => (props.size === 'compact' ? 'min-w-8 px-2 py-1' : 'px-3 py-2'))

const variantClass = computed(() => {
  if (props.variant === 'ghost') {
    return 'border-black bg-transparent text-black shadow-[4px_4px_0_#000] hover:bg-lime-200'
  }

  if (props.active) {
    return 'border-lime-700 bg-lime-700 text-lime-50 shadow-[4px_4px_0_var(--color-lime-700)] hover:bg-lime-600'
  }

  return 'border-black bg-lime-100 text-black shadow-[4px_4px_0_#000] hover:bg-lime-300'
})
</script>

<template>
  <component
    :is="tag"
    :href="props.href"
    :target="props.target"
    :rel="resolvedRel"
    :type="tag === 'button' ? props.type : undefined"
    :class="[
      'type-action inline-flex cursor-pointer items-center justify-center border-4 transition-[transform,background-color,color,box-shadow] duration-150 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-black hover:-translate-y-0.5 hover:scale-105',
      sizeClass,
      variantClass,
    ]"
  >
    <slot />
  </component>
</template>
