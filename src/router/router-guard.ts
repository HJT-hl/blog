import { Router } from "vue-router";
import 'nprogress/nprogress.css'
import nprogress from 'nprogress'

export default function  start(router:Router){
    router.beforeEach((to,from,next)=>{
        nprogress.start();
        next();
    })

    router.afterEach((to,from)=>{
        nprogress.done();
    })

    return router
}
