import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/main/index.vue'
import Login from '../views/login/index.vue'
import Brand from '../views/brand/index.vue'

Vue.use(VueRouter)
// const originalPush = VueRouter.prototype.push
//
// VueRouter.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// }
const routes = [
    {
        path: '/',
        name: 'Main',
        component: Main,
        redirect:"/index",
        children: [
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
                path: '/good',
                name: 'Good',
                component: () => import('../views/good/index.vue')
            },
            {
                path: '/admin',
                name: 'Admin',
                component: () => import('../views/admin/index.vue')
            },
            {
                path: '/dept',
                name: 'Dept',
                component: () => import('../views/dept/index.vue')
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

            {
                path: 'index',
                name: 'Index',
                component: () => import('../views/index/index.vue')
            },

            {
                path: 'loginLog',
                name: 'LoginLog',
                component: () => import('../views/loginLog/index.vue')
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
