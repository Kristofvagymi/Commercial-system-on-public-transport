import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: {
            name: "Dashboard"
        }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import("@/views/Dashboard.vue"),
        meta: {
          requiresAuth: true
        }        
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import("@/views/Login.vue")
    }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: "/login"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;