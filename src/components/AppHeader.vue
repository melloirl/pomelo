<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { toggleUserLocale, useUserLocale } from '../composables/useUserLocale'
import AppButton from './AppButton.vue'
import PomeloLogo from './PomeloLogo.vue'

interface HeaderLink {
  label: string
  hash: string
}

const ENABLE_POMELO_LOGO_RAINBOW_CYCLE = false

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
    <div class="mx-auto grid w-full max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-2 px-3 py-2 sm:grid-cols-[1fr_auto_1fr] sm:gap-3 sm:px-6 sm:py-4">
      <a
        href="#home"
        :class="['min-w-0 justify-self-start', ENABLE_POMELO_LOGO_RAINBOW_CYCLE && 'logo-hover-trigger']"
        :aria-label="t('header.home')"
        @click="handleHashClick('home', $event)"
      >
        <PomeloLogo
          :full-color="ENABLE_POMELO_LOGO_RAINBOW_CYCLE"
          class="h-5 w-auto text-lime-700 sm:h-8"
          :class="ENABLE_POMELO_LOGO_RAINBOW_CYCLE && 'logo-rainbow-on-hover'"
          aria-label="omelodev"
          role="img"
        />
      </a>

      <nav aria-label="Primary" class="min-w-0 overflow-x-auto">
        <ul class="flex min-w-max flex-nowrap items-center justify-start gap-1.5 sm:min-w-0 sm:flex-wrap sm:justify-center sm:gap-3">
          <li v-for="link in props.links" :key="link.hash">
            <AppButton
              :href="`#${link.hash}`"
              size="compact"
              class="sm:px-3 sm:py-2"
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
