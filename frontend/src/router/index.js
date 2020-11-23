import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/dashboard/Dashboard.vue'
import Login from '@/login/Login.vue'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
      next()
      return
    }
    next('/dashboard')
  }
  
  const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
      next()
      return
    }
    next('/login')
  }
  

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: {
                name: "Dashboard"
            }
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            beforeEnter: ifAuthenticated
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            beforeEnter: ifNotAuthenticated
        }
    ]
})