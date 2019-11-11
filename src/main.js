import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import EventBus from './plugins/busEvent' 

Vue.config.productionTip = false

Vue.use(EventBus)

new Vue({
  router,
  store,
  // Swal,
  render: h => h(App)
}).$mount('#app')
