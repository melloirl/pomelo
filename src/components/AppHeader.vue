<script setup lang="ts">
interface HeaderLink {
  label: string
  hash: string
}

const props = defineProps<{
  links: readonly HeaderLink[]
  activeHash: string | null
  onHashClick: (hash: string) => (event?: MouseEvent) => void
}>()

const handleHashClick = (hash: string, event: MouseEvent) => {
  props.onHashClick(hash)(event)
}
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 border-b-4 border-black bg-white">
    <div class="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-4">
      <p class="text-xs font-bold uppercase tracking-[0.18em]">omelodev</p>

      <nav aria-label="Primary">
        <ul class="flex flex-wrap items-center gap-2 sm:gap-3">
          <li v-for="link in props.links" :key="link.hash">
            <a
              :href="`#${link.hash}`"
              @click="handleHashClick(link.hash, $event)"
              :class="[
                'inline-block border-4 border-black bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] shadow-[4px_4px_0_#000] transition-colors hover:bg-black hover:text-white focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-black',
                props.activeHash === link.hash
                  ? 'border-(--color-accent) bg-(--color-accent) text-(--color-accent-foreground)'
                  : '',
              ]"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
