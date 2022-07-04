import { createI18n } from 'vue-i18n'
import messages from '@intlify/vite-plugin-vue-i18n/messages'

import en from './locales/en.json'
import hant from './locales/zh-hant.json'
// import hans from './locales/zh-hans.json'
// import id from './locales/id.json'

export default createI18n({
  legacy: false,
  locale: 'en',
  globalInjection: true,
  messages: {
    en,
    hant
  }
})