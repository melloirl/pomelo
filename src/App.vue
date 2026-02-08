<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import { useHashScroll } from './composables/useHashScroll'

const ACTIVE_LOCK_RELEASE_THRESHOLD = 220
const HEADER_SCROLL_OFFSET = 112

const links = [
  {
    label: 'Home',
    hash: 'home',
  },
  {
    label: 'Work',
    hash: 'work',
  },
  {
    label: 'Writing',
    hash: 'writing',
  },
  {
    label: 'Contact',
    hash: 'contact',
  },
] as const

const sections = links.filter((link) => link.hash !== 'home')

const { activeHash, onHashClick } = useHashScroll({
  trackedHashes: links.map((link) => link.hash),
  offset: HEADER_SCROLL_OFFSET,
  lockReleaseThreshold: ACTIVE_LOCK_RELEASE_THRESHOLD,
})
</script>

<template>
  <div class="min-h-screen bg-white text-black">
    <AppHeader :links="links" :active-hash="activeHash" :on-hash-click="onHashClick" />

    <main class="mx-auto min-h-screen w-full max-w-6xl px-6 pb-12 pt-32 sm:pb-16 sm:pt-36">
      <section
        id="home"
        :class="[
          'w-full border-4 p-6 transition-colors sm:p-10',
          activeHash === 'home' ? 'border-[var(--color-accent)]' : 'border-black',
        ]"
      >
        <p class="text-xs font-bold uppercase tracking-[0.18em]">omelodev</p>
        <h1 class="mt-3 text-4xl leading-none sm:text-6xl">Built With Structure.</h1>
        <p class="mt-4 max-w-3xl text-base sm:text-lg">
          Navigation is now fixed, heavy, and explicit: a clear frame that stays visible as the page scrolls.
        </p>
      </section>

      <section
        v-for="section in sections"
        :id="section.hash"
        :key="section.hash"
        :class="[
          'mt-8 w-full border-4 p-5 transition-colors sm:p-8',
          activeHash === section.hash ? 'border-[var(--color-accent)]' : 'border-black',
        ]"
      >
        <h2 class="text-2xl sm:text-3xl">{{ section.label }}</h2>
        <p class="mt-3 max-w-2xl text-base leading-relaxed sm:text-lg">
          Placeholder content to demonstrate the fixed header behavior while scrolling. Routes can be wired later.
        </p>
      </section>
    </main>
  </div>
</template>
