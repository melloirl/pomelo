<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { toggleUserLocale, useUserLocale } from '../composables/useUserLocale'

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

const locale = useUserLocale()

const toggleLocale = () => {
  toggleUserLocale()
}

const { t } = useI18n()
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 border-black border-b stroke-b-strong bg-white">
    <div class="mx-auto grid w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-6 py-4">
      <p class="type-identity justify-self-start">omelodev</p>

      <nav aria-label="Primary" class="min-w-0">
        <ul class="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <li v-for="link in props.links" :key="link.hash">
            <a
              :href="`#${link.hash}`"
              @click="handleHashClick(link.hash, $event)"
              :class="[
                'inline-block border-4 border-black bg-white px-3 py-2 shadow-[4px_4px_0_#000] transition-colors hover:bg-black hover:text-white focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-black',
                'type-action',
                props.activeHash === link.hash
                  ? 'border-(--color-accent) bg-(--color-accent) shadow-[4px_4px_0_var(--color-accent)]'
                  : '',
              ]"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>
      </nav>

      <button
        type="button"
        :aria-label="t('header.toggleLanguage')"
        @click="toggleLocale"
        class="type-action justify-self-end inline-flex min-w-8 cursor-pointer items-center justify-center px-2 py-1 text-black transition-transform duration-150 hover:-translate-y-0.5 hover:scale-105"
      >
        {{ locale === 'pt-br' ? 'PT' : 'EN' }}
      </button>
    </div>
  </header>
</template>
