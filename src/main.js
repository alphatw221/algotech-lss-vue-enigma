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

const app = createApp(App).use(createPinia());

import router from "./router";
app.use(router).use(ViewUIPlus).use(VCalendar, {});
app.use(VueCookies);
app.use(VueAxios, axios)

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
