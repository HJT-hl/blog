import {createRouter,createWebHashHistory} from "vue-router"
import startRouterGuard from "./router-guard"
const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {
            keepAlive : true
        },
        component: ()=>import("../views/home")
    },
    {
        path: '/about',
        name: 'About',
        meta: {
            keepAlive : true
        },
        component: () => import('../views/About')
    },
    {
        path: '/blog/:id',
        name: 'Blog',
        meta: {
            keepAlive : true
        },
        component: () => import('../views/Blog')
    },
    {
        path: '/Article/:id',
        name: 'Article',
        meta: {
            keepAlive : true
        },
        component: () => import('../views/Article')
    },
    {
        path: '/message',
        name: 'Message',
        component: () => import('../views/Message')
    },
    {
        path: '/diary',
        name: 'Diary',
        meta: {
            keepAlive : true
        },
        component: () => import('../views/Diary')
    },
    {
        path: '/links',
        name: 'Links',
        component: () => import('../views/Links')
    },
    {
        path: "/:W+",
        name: 'NotFound',
        meta: {
          keepAlive : true
        },
        component: () => import('../views/404')
    }
]

export default startRouterGuard(createRouter({
    history: createWebHashHistory("/"),
    routes,
}));


