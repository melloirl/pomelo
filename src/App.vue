<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'
import ColumnLayout from './components/ColumnLayout.vue'
import ContentCard from './components/ContentCard.vue'
import { useHashScroll } from './composables/useHashScroll'
import type { ScrollShape } from './composables/useScrollShapes'
import { useScrollShapes } from './composables/useScrollShapes'

const ACTIVE_LOCK_RELEASE_THRESHOLD = 220
const HEADER_SCROLL_OFFSET = 112
const ENABLE_SECTION_NUMBERING = false

const headerLinks = [
  {
    labelKey: 'header.home',
    hash: 'home',
  },
  {
    labelKey: 'header.work',
    hash: 'work',
  },
  {
    labelKey: 'header.writing',
    hash: 'writing',
  },
  {
    labelKey: 'header.contact',
    hash: 'contact',
  },
] as const

type SectionHash = (typeof headerLinks)[number]['hash']
type ColumnCount = 1 | 2 | 3
type ColumnProportions = readonly [number] | readonly [number, number] | readonly [number, number, number]
type CardHeadingTag = 'h1' | 'h2' | 'h3'
type CardBorderVariant = 'solid' | 'dashed'

interface CardConfig {
  hash: SectionHash
  title: string
  body: string
  eyebrow?: string
  headingTag?: CardHeadingTag
  bodyWidthClass?: string
  paddingClass?: string
  borderVariant?: CardBorderVariant
}

interface LayoutRow {
  id: string
  hashes: readonly SectionHash[]
  columns: ColumnCount
  proportions?: ColumnProportions
  topMarginClass?: string
}

const { t } = useI18n()

const links = computed(() =>
  headerLinks.map((link) => ({
    hash: link.hash,
    label: t(link.labelKey),
  })),
)

const cardsByHash: Record<SectionHash, CardConfig> = {
  home: {
    hash: 'home',
    eyebrow: 'omelodev',
    title: 'Built With Structure.',
    body: 'Navigation is now fixed, heavy, and explicit: a clear frame that stays visible as the page scrolls.',
    headingTag: 'h1',
    bodyWidthClass: 'max-w-3xl',
    paddingClass: 'p-6 sm:p-10',
  },
  work: {
    hash: 'work',
    title: 'Work',
    body: 'Placeholder content to demonstrate the fixed header behavior while scrolling. Routes can be wired later.',
  },
  writing: {
    hash: 'writing',
    title: 'Writing',
    body: 'Placeholder content to demonstrate the fixed header behavior while scrolling. Routes can be wired later.',
  },
  contact: {
    hash: 'contact',
    title: 'Contact',
    body: 'Placeholder content to demonstrate the fixed header behavior while scrolling. Routes can be wired later.',
    borderVariant: 'dashed',
  },
}

const layoutRows: readonly LayoutRow[] = [
  {
    id: 'hero',
    hashes: ['home'],
    columns: 1,
  },
  {
    id: 'primary',
    hashes: ['work', 'writing'],
    columns: 2,
    proportions: [2, 3],
    topMarginClass: 'mt-8',
  },
  {
    id: 'secondary',
    hashes: ['contact'],
    columns: 1,
    topMarginClass: 'mt-8',
  },
]

const { activeHash, onHashClick } = useHashScroll({
  trackedHashes: headerLinks.map((link) => link.hash),
  offset: HEADER_SCROLL_OFFSET,
  lockReleaseThreshold: ACTIVE_LOCK_RELEASE_THRESHOLD,
})

const { shapes } = useScrollShapes()

const getSectionLabel = (hash: SectionHash) => {
  const sectionNumber = headerLinks.findIndex((link) => link.hash === hash) + 1
  return sectionNumber.toString().padStart(2, '0')
}

const getShapeClass = (shape: ScrollShape) => {
  const borderStyleClass = shape.borderVariant === 'dashed' ? 'border-dashed' : 'border-solid'
  const baseClass =
    shape.fill === 'fill'
      ? `bg-(--color-shape-fill) border-black ${borderStyleClass}`
      : `bg-(--color-page) border-black ${borderStyleClass}`

  if (shape.kind === 'diamond') {
    return `${baseClass} rotate-45`
  }

  return `${baseClass} rounded-full`
}

const getShapeStyle = (shape: ScrollShape) => {
  const edgeOffset = Math.round(shape.size * shape.cropRatio)

  return {
    height: `${shape.size}px`,
    left: shape.side === 'left' ? `-${edgeOffset}px` : 'auto',
    right: shape.side === 'right' ? `-${edgeOffset}px` : 'auto',
    top: `${shape.top}px`,
    width: `${shape.size}px`,
  }
}
</script>

<template>
  <div class="relative isolate flex min-h-screen flex-col overflow-x-clip bg-(--color-page) text-black">
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        v-for="shape in shapes"
        :key="shape.id"
        class="absolute stroke-thin"
        :class="getShapeClass(shape)"
        :style="getShapeStyle(shape)"
      >
        <div
          v-if="shape.kind === 'ring'"
          class="absolute inset-[22%] rounded-full stroke-thin border-black bg-(--color-page)"
          :class="shape.borderVariant === 'dashed' ? 'border-dashed' : 'border-solid'"
        ></div>
      </div>
    </div>

    <AppHeader :links="links" :active-hash="activeHash" :on-hash-click="onHashClick" />

    <main class="relative z-10 mx-auto w-full max-w-6xl flex-1 px-6 pb-12 pt-32 sm:pb-16 sm:pt-36">
      <section v-for="row in layoutRows" :key="row.id" :class="row.topMarginClass">
        <ColumnLayout :columns="row.columns" :proportions="row.proportions">
          <ContentCard
            v-for="hash in row.hashes"
            :key="hash"
            :id="hash"
            :title="cardsByHash[hash].title"
            :body="cardsByHash[hash].body"
            :eyebrow="cardsByHash[hash].eyebrow"
            :heading-tag="cardsByHash[hash].headingTag"
            :body-width-class="cardsByHash[hash].bodyWidthClass"
            :padding-class="cardsByHash[hash].paddingClass"
            :border-variant="cardsByHash[hash].borderVariant"
            :section-label="ENABLE_SECTION_NUMBERING ? getSectionLabel(hash) : undefined"
            :active="activeHash === hash"
          />
        </ColumnLayout>
      </section>
    </main>

    <AppFooter />
  </div>
</template>
