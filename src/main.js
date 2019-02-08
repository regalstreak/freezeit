import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "./plugins/vuetify";


Vue.config.productionTip = false;

var VueAwesomeSwiper = require('vue-awesome-swiper')
Vue.use(VueAwesomeSwiper)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

require("../node_modules/firebaseui/dist/firebaseui.css")