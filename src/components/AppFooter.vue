<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="mt-20 bg-white" aria-label="Site footer">
    <div class="mx-auto w-full max-w-6xl px-6 py-5 text-left">
      <p class="text-[0.65rem] font-bold uppercase tracking-[0.22em]">CC LICENSE</p>

      <p class="mt-2 font-heading text-lg leading-tight uppercase sm:text-xl">
        Creative Commons Attribution-ShareAlike 4.0 International
      </p>

      <p class="mt-6 text-xs font-bold uppercase tracking-[0.1em]">
        Reuse With Attribution · Omelodev · {{ currentYear }}
      </p>
    </div>
  </footer>
</template>
