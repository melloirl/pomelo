<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const currentYear = new Date().getFullYear()
const { t } = useI18n()
</script>

<template>
  <footer class="mt-20 bg-white" aria-label="Site footer">
    <div class="mx-auto w-full max-w-6xl px-6 py-5 text-left">
      <p class="text-[0.65rem] font-bold uppercase tracking-[0.22em]">{{ t('appFooter.licenseLabel') }}</p>

      <p class="mt-2 font-heading text-lg leading-tight uppercase sm:text-xl">
        {{ t('appFooter.licenseName') }}
      </p>

      <p class="mt-6 text-xs font-bold uppercase tracking-[0.1em]">
        {{ t('appFooter.reuseWithAttribution') }} · {{ t('profile.name') }} · {{ currentYear }}
      </p>
    </div>
  </footer>
</template>
