import Vue from "vue";
import VueCompositionAPI from "@vue/composition-api";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//import { Button } from "element-ui";
import ElementUI from "element-ui"; // 追加！
//import locale from 'element-ui/locale/lang/ja' // 追加！
import "element-ui/lib/theme-chalk/index.css"; // 追加！

Vue.use(ElementUI);
Vue.use(VueCompositionAPI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
