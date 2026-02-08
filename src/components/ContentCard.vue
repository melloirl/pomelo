<script setup lang="ts">
type CardHeadingTag = 'h1' | 'h2' | 'h3'
type CardBorderVariant = 'solid' | 'dashed'

interface ContentCardProps {
  id: string
  title: string
  body?: string
  sectionLabel?: string
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
      'w-full bg-white border-black',
      props.paddingClass,
      props.active ? 'stroke-strong' : 'stroke-thin',
      props.borderVariant === 'dashed' ? 'border-dashed' : 'border-solid',
    ]"
  >
    <div :class="props.sectionLabel ? 'grid grid-cols-[auto_1fr] gap-4 sm:gap-6' : ''">
      <p v-if="props.sectionLabel" class="type-identity pt-1 text-black/65">
        {{ props.sectionLabel }}
      </p>

      <div class="border-l border-black/50 pl-4 sm:pl-6">
        <p v-if="props.eyebrow || $slots.eyebrow" class="type-identity">
          <slot name="eyebrow">{{ props.eyebrow }}</slot>
        </p>

        <component
          :is="props.headingTag"
          :class="[
            'type-declaration',
            props.headingTag === 'h1' ? 'mt-3 type-declaration-major' : 'type-declaration-section',
          ]"
        >
          <slot name="title">{{ props.title }}</slot>
        </component>

        <p v-if="props.body || $slots.body" :class="['type-explanation mt-3', props.bodyWidthClass]">
          <slot name="body">{{ props.body }}</slot>
        </p>

        <slot />
      </div>
    </div>
  </section>
</template>
