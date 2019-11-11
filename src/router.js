import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import admin from './admin/views/home'
import categories from './admin/views/categories'
import editor from './admin/views/editor'
import create from './admin/views/create'
import selectedCategory from './admin/views/selected-category'
import login from './admin/views/login'
import register from './admin/views/register'
import Category from './views/category-list'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/category/:id',
      name: 'category',
      component: Category
    },
    {
      path: '/admin',
      name: 'home-admin',
      component: admin,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/admin/categories',
      name: 'selected-category',
      component: selectedCategory,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/admin/category/:id',
      name: 'admin-categories',
      component: categories,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/admin/create',
      name: 'admin-create',
      component: create,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/admin/editor',
      name: 'admin-editor',
      component: editor,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/admin/register',
      name: 'admin-register',
      component: register,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: login
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
// me toco colocar esta dentro de un setTimeout ya que firebase.auth().currentUser aveces tarda en llegar
// setTimeout(() => {
  router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta.requiresAuth)) { // preguntamos si hay rutas privadas
      if (localStorage.getItem('userName')) { // la condicion para ver las rutas privadas
        next();
      } else {
        next({ name: 'admin-login' }); // si no cumple la codición se envia a esta direccion de url
      }
    } else { // y si no hay nada ps no pasa ada sigue normal
      next();
    }
// },0)
});

export default router
