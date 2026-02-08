import { createI18n } from 'vue-i18n'
import enUs from './messages/en-us'
import ptBr from './messages/pt-br'

export const i18n = createI18n({
  legacy: false,
  locale: 'en-us',
  fallbackLocale: 'en-us',
  messages: {
    'en-us': enUs,
    'pt-br': ptBr,
  },
})
