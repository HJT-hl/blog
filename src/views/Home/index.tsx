import {defineComponent, h,ref,onUnmounted, onMounted} from  "vue"
import './index.less'
import { getArticleHot } from '../../api'
import {date,year,month,className, getTop} from "../../utils"
import { Article } from '../../type/article'


export default defineComponent({
    name :"Home",
    setup(){
        const bgHeight = ref(0)
        const ifClick = ref(false)
        const articleHotList = ref<Article[]>([])
        function  getWindowHeight(){
            bgHeight.value = window.innerHeight;
        }

        function  handleClick(){
            ifClick.value = !ifClick.value;
        }

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
        function handleScrollToHot(){
            const hot:HTMLElement = document.querySelector(".hot") as HTMLElement;
            const location = getTop(hot) + 1
            window.scrollTo({
                top : location,
                behavior : "smooth"
            })
        }


        getWindowHeight()
        onMounted(()=>{
            getArticleHot(3).then(res=>{
                articleHotList.value = res.data.data;
            })
            //resize
            window.addEventListener("resize",getWindowHeight);

            //scroll
            handleScroll();
            window.addEventListener("scroll",handleScroll);
        })
        onUnmounted(()=>{
            window.removeEventListener("resize",getWindowHeight);
        })

        return ()=> <div class="Home" >
            {/* 背景图 */}
            <div class="bg" style={{height:bgHeight.value+'px'}} >
                <div class="bg-content loading">
                    <h1>四 路 闲 人</h1>
                    <h2> 晓月过残垒，繁星宿故关 </h2>
                    <router-link to="/blog/0">进入博客</router-link>
                </div>
                <i class="bg-icon el-icon-arrow-down" onClick={handleScrollToHot}></i>
            </div>
            {  /* 右上角菜单 */}
            <div class={className(['menu',{'click':ifClick.value}])} >
                <div class="btn" onClick={handleClick}>
                <span></span><span></span><span></span>
                </div>
                <div class="cover">
                    <div class="point">
                        <router-link to="/">首页</router-link>
                        <router-link to="/blog/0">博客</router-link>
                        <router-link to="/message">留言</router-link>
                    </div>
                    <div class="cover-logo">Jack</div>
                </div>
            </div>

            {/* 热门文章*/}
            <div class="hot">
                <div class="hot-main">
                    <div class="text loading">
                        <h2>热门文章</h2>
                        <p>
                            很想给你写封信,告诉你这里的天气.<br/>
                            昨夜的那场电影,还有我的心情.
                        </p>
                    </div>
                    <ul class="loading">
                        {
                            articleHotList.value.map((item)=><li>
                                <div class="img">
                                    <div class="bgImg"
                                         style={{backgroundImage:'url('+item.surface+')'}}>
                                    </div>
                                    <div class="link">
                                        <router-link to={`/Article/${item._id}`}>
                                            <i class="el-icon-link"></i>
                                        </router-link>
                                    </div>
                                </div>
                                <div class="info">
                                    <div class="title"><a href="">{item.title}</a></div>
                                    <div class="time">{year(item.date)}年{month(item.date)}月{date(item.date)}日</div>
                                    <div class="content">{item.content}</div>
                                    <router-link to={`/Article/${item._id}`} class="link">
                                        阅读更多
                                    </router-link>
                                </div>
                            </li>)
                        }
                    </ul>
                </div>
            </div>
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
