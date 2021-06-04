import {createRouter,createWebHashHistory} from "vue-router"
import startRouterGuard from "./router-guard"
const routes = [
    {
        path: '/',
        name: 'Home',
        component: ()=>import("../views/home")
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About')
    },
    {
        path: '/blog/:id',
        name: 'Blog',
        component: () => import('../views/Blog')
    },
    {
        path: '/Article/:id',
        name: 'Article',
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
        component: () => import('../views/Diary')
    },
    {
        path: '/links',
        name: 'Links',
        component: () => import('../views/Links')
    },
    {
        path: "/",
        name: 'NotFound',
        component: () => import('../views/404')
    }
]

export default startRouterGuard(createRouter({
    history: createWebHashHistory("/"),
    routes,
}));


