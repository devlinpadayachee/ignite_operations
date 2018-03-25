// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import Papa from 'papaparse'
import JsonExcel from 'vue-json-excel'
import App from './App'
import Lte from './components/Lte'
import Importer from './components/Importer'
import './assets/css/styles.css'
import './assets/css/cardeffects.css'
import './assets/js/scripts.js'

Vue.use(VueRouter)
Vue.component('downloadExcel', JsonExcel)
Vue.component('Papa', Papa)
Vue.config.productionTip = false

// const NotFound = { template: '<p>Page not found</p>' }
const routes = [
  { path: '/', component: App },
  { path: '/lte', component: Lte },
  { path: '/importer', component: Importer }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

/* eslint-disable no-new */
new Vue({
  router,
  components: { App }
}).$mount('#app')
