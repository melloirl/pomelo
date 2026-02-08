<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { toggleUserLocale, useUserLocale } from '../composables/useUserLocale'
import AppButton from './AppButton.vue'
import PomeloLogo from './PomeloLogo.vue'

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
  <header class="fixed inset-x-0 top-0 z-50 border-black border-b stroke-b-strong bg-lime-100">
    <div class="mx-auto grid w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-6 py-4">
      <a
        href="#home"
        class="justify-self-start"
        :aria-label="t('header.home')"
        @click="handleHashClick('home', $event)"
      >
        <PomeloLogo class="h-8 w-auto text-lime-700" aria-label="omelodev" role="img" />
      </a>

      <nav aria-label="Primary" class="min-w-0">
        <ul class="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <li v-for="link in props.links" :key="link.hash">
            <AppButton
              :href="`#${link.hash}`"
              :active="props.activeHash === link.hash"
              @click="handleHashClick(link.hash, $event)"
            >
              {{ link.label }}
            </AppButton>
          </li>
        </ul>
      </nav>

      <AppButton
        type="button"
        variant="ghost"
        size="compact"
        class="justify-self-end"
        :aria-label="t('header.toggleLanguage')"
        @click="toggleLocale"
      >
        {{ locale === 'pt-br' ? 'PT' : 'EN' }}
      </AppButton>
    </div>
  </header>
</template>
