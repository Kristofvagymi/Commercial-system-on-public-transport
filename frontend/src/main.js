import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'

Vue.use(BootstrapVue)
//Vue.use(IconsPlugin)

const base = axios.create({
  baseURL: "http://localhost:8090"
});

Vue.prototype.$http = base;

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  router,
  components: { App }
}).$mount('#app')