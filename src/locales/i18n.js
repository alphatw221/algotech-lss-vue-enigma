import { createI18n } from 'vue-i18n'

import en from './en-US/index.js'
import zh from './zh-hant/index.js'
// import hans from './locales/zh-hans.json'
// import id from './locales/id.json'

const i18n = createI18n({
  legacy: false,
  locale:'en-US',
  fallbackLocale: 'en-US',
  globalInjection: true,
  messages:{
      //語言包
      "zh-TW": zh,
      "en-US": en
  }
})

export default i18n