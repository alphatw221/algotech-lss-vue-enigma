import 'vite/modulepreload-polyfill'
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import globalComponents from "./global-components";
import utils from "./utils";
import axios from 'axios';
import VueAxios from 'vue-axios';
import "./assets/css/app.css";
import 'v-calendar/dist/style.css';
import 'view-ui-plus/dist/styles/viewuiplus.css';
import ViewUIPlus from 'view-ui-plus';
import VCalendar from 'v-calendar';
import VueCookies from 'vue3-cookies';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'


const app = createApp(App).use(createPinia()).component("font-awesome-icon", FontAwesomeIcon);

import router from "./router";
app.use(router).use(ViewUIPlus).use(VCalendar, {});
app.use(VueCookies);
app.use(VueAxios, axios)
library.add(fas, far, fab)

import i18n from './locales/i18n'
app.use(i18n)
app.use(ViewUIPlus, {i18n});
//i18n: (key:string, value: String) => i18n.t(key, value)

//mitt (eventBus)
import mitt from 'mitt'
const eventBus = mitt()
app.config.globalProperties.eventBus = eventBus

globalComponents(app);
utils(app);
console.log(import.meta.env.VITE_APP_ROOT_API)

//axios
app.use(VueAxios, axios)

app.mount("#app");
