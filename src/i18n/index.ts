import { createI18n } from 'vue-i18n'
import { watch } from 'vue'
import enUs from './messages/en-us'
import ptBr from './messages/pt-br'
import { DEFAULT_LOCALE, useUserLocale } from '../composables/useUserLocale'

const selectedLocale = useUserLocale()

export const i18n = createI18n({
  legacy: false,
  locale: selectedLocale.value,
  fallbackLocale: DEFAULT_LOCALE,
  messages: {
    'en-us': enUs,
    'pt-br': ptBr,
  },
})

watch(selectedLocale, (nextLocale) => {
  i18n.global.locale.value = nextLocale
})
