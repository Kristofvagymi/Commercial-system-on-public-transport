import Vue from 'vue'
import App from './App'
import router from './router'

import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'

Vue.use(BootstrapVue)
//Vue.use(IconsPlugin)

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  router,
  components: { App }
}).$mount('#app')