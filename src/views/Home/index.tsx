import {defineComponent, h,onMounted} from  "vue"
import './index.less'
import { getTop} from "../../utils"
import HomeHot from "./HomeHot"
import HomeBg from './HomeBg'
import HomeMenu from './HomeMenu'

export default defineComponent({
    name :"Home",
    setup(){
        //滚轮滚动事件
        function handleScroll(){
            let loadingDom:NodeListOf<HTMLElement> = document.querySelectorAll(".loading");
            let scrollTop = document.documentElement.scrollTop + window.innerHeight;
            loadingDom.forEach(node=>{
                if (scrollTop > getTop(node) + 100){
                    node.classList.remove("loading");
                }
            });
        }
        onMounted(()=>{
            //scroll
            handleScroll();
            window.addEventListener("scroll",handleScroll);
        })

        return ()=> <div class="Home" >
            <HomeBg/>
            <HomeHot/>
            <HomeMenu/>
            {/*关于&友链*/}
            <div class="about">
                <div class="wrap">
                    <ul class="loading">
                        <li><router-link to="/about">关于</router-link></li>
                        <li><router-link to="/links">+友情链接</router-link></li>
                    </ul>
                </div>
            </div>
        </div>
    }

})
