import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routes'
import BootstrapVue from 'bootstrap-vue'
import Style from './assets/css/style.css'

/*
	vue-router installation and configuration
*/

const router = new VueRouter({
  routes,
  mode: 'history'
})

Vue.use(Style);
Vue.use(BootstrapVue);
Vue.use(VueRouter)

/*
  vue installation.
*/

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
