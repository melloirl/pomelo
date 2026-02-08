<script setup lang="ts">
const links = ['Home', 'Work', 'Writing', 'Contact'] as const
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 border-b-4 border-black bg-white">
    <div class="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-4">
      <p class="text-xs font-bold uppercase tracking-[0.18em]">omelodev</p>

      <nav aria-label="Primary">
        <ul class="flex flex-wrap items-center gap-2 sm:gap-3">
          <li v-for="link in links" :key="link">
            <a
              href="#"
              @click.prevent
              class="inline-block border-4 border-black bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] shadow-[4px_4px_0_#000] transition-colors hover:bg-black hover:text-white focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              {{ link }}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
