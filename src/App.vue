<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <div class="min-h-screen bg-white text-black">
    <AppHeader />

    <main class="mx-auto min-h-screen w-full max-w-6xl px-6 pb-12 pt-32 sm:pb-16 sm:pt-36">
      <section class="w-full border-4 border-black p-6 sm:p-10">
        <p class="text-xs font-bold uppercase tracking-[0.18em]">omelodev</p>
        <h1 class="mt-3 text-4xl leading-none sm:text-6xl">Built With Structure.</h1>
        <p class="mt-4 max-w-3xl text-base sm:text-lg">
          Navigation is now fixed, heavy, and explicit: a clear frame that stays visible as the page scrolls.
        </p>
      </section>

      <section
        v-for="panel in 4"
        :key="panel"
        class="mt-8 w-full border-4 border-black p-5 sm:p-8"
      >
        <h2 class="text-2xl sm:text-3xl">Section {{ panel }}</h2>
        <p class="mt-3 max-w-2xl text-base leading-relaxed sm:text-lg">
          Placeholder content to demonstrate the fixed header behavior while scrolling. Routes can be wired later.
        </p>
      </section>
    </main>
  </div>
</template>
