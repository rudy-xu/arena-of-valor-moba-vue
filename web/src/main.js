import Vue from 'vue'
import App from './App.vue'
import router from './router'

import "./assets/iconfont/iconfont.css";
import "./assets/scss/style.scss";

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

import Card from "./components/Card.vue";
Vue.component("m-card", Card);

import ListCard from "./components/ListCard.vue";
Vue.component("m-list-card", ListCard);

import axios from "axios";
Vue.prototype.$http= axios.create({
  baseURL: "http://localhost:3000/web/api/"
});


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
