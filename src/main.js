import Vue from 'vue';
import Vuelidate from 'vuelidate';
import axios from "axios";
import { Model } from "vue-api-query";

import App from './App.vue';
import router from './router';

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(Vuelidate);

Model.$http = axios;

Vue.config.productionTip = false;

new Vue({
	router,
	render: (h) => h(App),
}).$mount('#app');
