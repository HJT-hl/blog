import {h,defineComponent, ref} from "vue"
import { className } from '../../utils'
/* 右上角菜单 */
export default defineComponent({
    name : "HomeBg",
    setup(){
        const ifClick = ref(false)
        function  handleClick(){
            ifClick.value = !ifClick.value;
        }
        return ()=>
        <div class={className(['menu',{'click':ifClick.value}])} >
            <div class="btn" onClick={handleClick}>
                <span></span><span></span><span></span>
            </div>
            <div class="cover">
                <div class="point">
                    <router-link to="/blog/0">博客</router-link>
                    <router-link to="/message">留言</router-link>
                    <router-link to="/about">关于</router-link>
                </div>
                <div class="cover-logo">Jack</div>
            </div>
        </div>
    }
})
