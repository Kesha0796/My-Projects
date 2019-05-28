import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'v-slim-dialog/dist/v-slim-dialog.css'
import SlimDialog from 'v-slim-dialog'
import Router from 'vue-router'

import demo from "./components/HelloWorld.vue"
Vue.use(BootstrapVue);
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import product from "./components/products.vue"
import cart from "./components/cart.vue"
Vue.use(SlimDialog)
Vue.config.productionTip = false
Vue.use(Router)
Vue.use(require('vue-cookies'))
const NotFound = { template: '<p>Page not found</p>' }


const routes = {
  '/': demo,
  '/product':product,
  '/cart':cart
}



new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) { return h(this.ViewComponent) }
})
