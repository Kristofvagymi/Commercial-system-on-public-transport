import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/dashboard/Dashboard.vue'
import Login from '@/login/Login.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Dashboard',
            component: Dashboard
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        }
    ]
})