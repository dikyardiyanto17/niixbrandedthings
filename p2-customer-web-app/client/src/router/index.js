import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Purchase from '../views/Purchase.vue'
import Favorite from '../views/Favorite.vue'
import NotFound from '../components/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: Favorite
    },
    {
      path: '/products/:id',
      name: 'products',
      component: Purchase
    },
    {
      path: '/:catchAll(.*)',
      name: 'notFound',
      component: NotFound
    },
  ]
})

router.beforeEach((to, from, next) => {
  if ((localStorage.access_token && to.name == "login") || (localStorage.access_token && to.name == "register")) {
    next({ name: "home" })
  }
  else if (!localStorage.access_token && to.name == "favorite") {
    next({name: "login"})
  }
  else {
    next();
  }
});

export default router
