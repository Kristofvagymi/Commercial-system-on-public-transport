import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
alert(`Vue version : ${Vue.version}`);
new Vue({
  render: h => h(App),
}).$mount('#app')
