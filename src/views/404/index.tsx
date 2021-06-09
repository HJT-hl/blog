import {defineComponent, h} from  "vue"

import "./index.less"
export default defineComponent({
    render(){
        return <div class="page-404">
            <router-link to={"/"}>（￣︶￣）↗　返回首页</router-link>
        </div>
    }
})
