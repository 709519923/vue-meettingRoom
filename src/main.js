import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import Vuetify from "vuetify";
import "element-ui/lib/theme-chalk/index.css";
// import "vuetify/dist/vuetify.min.css";

import "./assets/main.css";
import axios from "axios";
import router from "./router";

axios.defaults.baseURL = "http://localhost:80";
Vue.prototype.$http = axios;
Vue.use(ElementUI);
Vue.use(Vuetify);
new Vue({
  render: (h) => h(App),
  router,
  vuetify: new Vuetify(),
}).$mount("#app");
