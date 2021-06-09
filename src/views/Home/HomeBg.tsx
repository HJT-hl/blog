import {h,defineComponent, ref, onMounted, onUnmounted} from "vue"
import {  getTop } from '../../utils'
/* 背景图 */
export default defineComponent({
    name : "HomeBg",
    setup(){
        const bgHeight = ref(0)
        function  getWindowHeight(){
            bgHeight.value = window.innerHeight;
        }
        getWindowHeight()
        onMounted(()=>{
            //resize
            window.addEventListener("resize",getWindowHeight);
        })
        onUnmounted(()=>{
            window.removeEventListener("resize",getWindowHeight);
        })
        function handleScrollToHot(){
            const hot:HTMLElement = document.querySelector(".hot") as HTMLElement;
            const location = getTop(hot) + 1
            window.scrollTo({
                top : location,
                behavior : "smooth"
            })
        }
        return ()=>
        <div class="bg" style={{height:bgHeight.value+'px'}} >
            <div class="bg-content loading">
                <h1>四 路 闲 人</h1>
                <h2> 晓月过残垒，繁星宿故关 </h2>
                <router-link to="/blog/0">进入博客</router-link>
            </div>
            <i class="bg-icon el-icon-arrow-down" onClick={handleScrollToHot}></i>
        </div>

    }
})
