// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import axios from "axios";
import Vuex from "vuex";
// vuetify
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
//import vuetify from "@/plugins/vuetify"; // path to vuetify export
//import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import * as VeeValidate from "vee-validate";
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);

Vue.config.productionTip = false;

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(Vuex);
Vue.use(Vuetify);
//Vue.use(BootstrapVue);

Vue.prototype.$validator = VeeValidate;
Vue.prototype.$axios = axios.create({
  timeout: 5000,
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*"
  }
});

extend("required", {
  ...required,
  message: "This field is required"
});

extend("email", email);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  vuetify: new Vuetify(),
  VeeValidate,
  components: { App, ValidationObserver, ValidationProvider },
  template: "<App/>"
});
