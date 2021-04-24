import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/main/index.vue'
import Login from '../views/login/index.vue'
import Brand from '../views/brand/index.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Main',
        component: Main,
        children:[
            {
                path: '/brand',
                name: 'Brand',
                component: Brand
            },
            {
                path: '/category',
                name: 'Category',
                component: () => import('../views/category/index.vue')
            },
            {
                path: '/admin',
                name: 'Admin',
                component: () => import('../views/admin/index.vue')
            },
            {
                path: '/role',
                name: 'Role',
                component: () => import('../views/role/index.vue')
            },

            {
                path: '/menu',
                name: 'Menu',
                component: () => import('../views/menu/index.vue')
            },
        ]
    },

    {
        path: '/login',
        name: 'Login',
        component: Login
    },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
