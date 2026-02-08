<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const currentYear = new Date().getFullYear()
const { t } = useI18n()
</script>

<template>
  <footer class="mt-20 bg-white" aria-label="Site footer">
    <div class="mx-auto w-full max-w-6xl px-6 py-5 text-left">
      <p class="type-evidence-label">{{ t('appFooter.licenseLabel') }}</p>

      <p class="type-declaration type-declaration-section mt-2">
        {{ t('appFooter.licenseName') }}
      </p>

      <p class="type-evidence-label mt-6">
        {{ t('appFooter.reuseWithAttribution') }} · {{ t('profile.name') }} · {{ currentYear }}
      </p>
    </div>
  </footer>
</template>
