import { createI18n } from 'vue-i18n';
import en from './en-US/index.js';
import zh from './zh-hant/index.js';


const i18n = createI18n({
  legacy: false,
  locale:'en',
  // locale:'zh_hant',
  fallbackLocale: 'en',
  globalInjection: true,
  messages:{
      //語言包
      "zh_hant": zh,
      "en": en
  }
})

export default i18n