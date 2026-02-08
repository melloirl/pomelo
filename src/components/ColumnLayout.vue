<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

type ColumnProportions = readonly [number] | readonly [number, number] | readonly [number, number, number]

interface ColumnLayoutProps {
  columns?: number
  proportions?: ColumnProportions
  gapClass?: string
}

const props = withDefaults(defineProps<ColumnLayoutProps>(), {
  columns: 1,
  gapClass: 'gap-8',
})

const columnsTemplate = computed(() => {
  if (props.proportions?.length) {
    return props.proportions.map((value) => `${value}fr`).join(' ')
  }

  return `repeat(${props.columns}, minmax(0, 1fr))`
})

const layoutStyle = computed(
  () =>
    ({
      '--layout-columns': columnsTemplate.value,
    }) as CSSProperties,
)
</script>

<template>
  <div
    class="grid w-full grid-cols-1 sm:grid-cols-(--layout-columns)"
    :class="props.gapClass"
    :style="layoutStyle"
  >
    <slot />
  </div>
</template>
