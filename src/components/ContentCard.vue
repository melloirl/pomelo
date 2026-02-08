<script setup lang="ts">
type CardHeadingTag = 'h1' | 'h2' | 'h3'
type CardBorderVariant = 'solid' | 'dashed'

interface ContentCardProps {
  id: string
  title: string
  body: string
  headingTag?: CardHeadingTag
  eyebrow?: string
  active?: boolean
  bodyWidthClass?: string
  paddingClass?: string
  borderVariant?: CardBorderVariant
}

const props = withDefaults(defineProps<ContentCardProps>(), {
  headingTag: 'h2',
  eyebrow: undefined,
  active: false,
  bodyWidthClass: 'max-w-2xl',
  paddingClass: 'p-5 sm:p-8',
  borderVariant: 'solid',
})
</script>

<template>
  <section
    :id="props.id"
    :class="[
      'w-full border-4 bg-white transition-colors',
      props.paddingClass,
      props.active ? 'border-(--color-accent)' : 'border-black',
      props.borderVariant === 'dashed' ? 'border-dashed' : 'border-solid',
    ]"
  >
    <p v-if="props.eyebrow" class="text-xs font-bold uppercase tracking-[0.18em]">
      {{ props.eyebrow }}
    </p>

    <component
      :is="props.headingTag"
      :class="props.headingTag === 'h1' ? 'mt-3 text-4xl leading-none sm:text-6xl' : 'text-2xl sm:text-3xl'"
    >
      {{ props.title }}
    </component>

    <p :class="['mt-3 text-base leading-relaxed sm:text-lg', props.bodyWidthClass]">
      {{ props.body }}
    </p>
  </section>
</template>
