import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import globalComponents from "./global-components";
import utils from "./utils";
import axios from 'axios';
import VueAxios from 'vue-axios';
import "./assets/css/app.css";

import 'view-ui-plus/dist/styles/viewuiplus.css'
import ViewUIPlus from 'view-ui-plus'

import VueCookies from 'vue3-cookies'

const app = createApp(App).use(router).use(createPinia()).use(ViewUIPlus);
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
