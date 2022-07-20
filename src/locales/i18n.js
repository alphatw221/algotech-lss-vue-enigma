import { createI18n } from 'vue-i18n';

import en from './en/index.js'
import zh_hant from './zh_hant/index.js'
// import vi from './vi/index.js'

// import hans from './locales/zh-hans.json'
// import id from './locales/id.json'

const i18n = createI18n({
  legacy: false,
  locale:'en',
  fallbackLocale: 'en',
  globalInjection: true,
  messages:{
      //語言包
      "zh_hant": zh_hant,
      "en": en,
      // "vi": vi
  }
})

export default i18n