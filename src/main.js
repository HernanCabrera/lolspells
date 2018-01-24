import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import routes from './routes'
import store from './store'

// Componentes Globales
import Select from './components/global/Select'

Vue.use(VueRouter)

Vue.component('AppSelect', Select)

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
