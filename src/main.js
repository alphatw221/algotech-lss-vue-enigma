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

const app = createApp(App).use(router).use(createPinia()).use(ViewUIPlus);

globalComponents(app);
utils(app);

//axios
app.use(VueAxios, axios)

app.mount("#app");
