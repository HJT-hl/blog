import { h, defineComponent ,KeepAlive, DefineComponent } from 'vue'
import { RouteLocationNormalizedLoaded } from 'vue-router'
import './App.less'

export default defineComponent({
    name: 'App',
    setup () {

        const slots = {
            default:({ Component ,route}:{Component : DefineComponent,route:RouteLocationNormalizedLoaded})=>{
                return  <>
                    <KeepAlive>
                        {route.meta.keepAlive && <Component />}
                    </KeepAlive>
                    {route.meta.keepAlive || <Component />}
                </>
            }
        }
        return () =>  <router-view v-slots={slots}/>
    }

})

