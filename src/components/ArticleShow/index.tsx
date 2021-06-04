import  "./index.less"
import {h,defineComponent, ref, computed, watchEffect, onMounted} from "vue"
import {getArticleShow} from "../../api"
import {year,month,date,contentToText} from "../../utils"
import { useRoute } from "vue-router"
import { Article } from "../../type/article"

export default defineComponent({
    name : "ArticleShow",
    setup(){
        //文章数据
        const articleList  = ref<Article[]>([])
        //no-more的显示与否
        const ifNoMore  = ref( false)
        //是否在加载
        const ifLoding  = ref( false )
        const route = useRoute()
        const id = computed(()=>{
            return route.params.id
        })
        watchEffect(()=>{
            getArticleShowFresh()
            document.documentElement.scrollTop = 0;
        })
        function getArticleShowFresh(){
            ifNoMore.value = ifLoding.value = false;
            getArticleShow( Number( id.value),true).then(res=>{
                articleList.value = res.data.data;
            });
        }
        function handleScroll(){
            if (ifNoMore.value || ifLoding.value)return;
            //文档高
            let c = document.documentElement.offsetHeight;
            //滚动高
            let a = document.documentElement.scrollTop;
            //可视区高
            let b = document.documentElement.clientHeight;
            if (a + b >= c - 200) {
                ifLoding.value = true;
                getArticleShow(Number(id.value),false).then(res=>{
                    ifLoding.value = false;
                    let data = res.data.data as Article[];
                    if (data.length){
                        articleList.value.push(...res.data.data);
                    }else{
                        ifNoMore.value = true;
                    }
                });
            }
        }
        onMounted(()=>{
            getArticleShowFresh();
            //监听滚动事件
            window.addEventListener("scroll",handleScroll);
        })
        return ()=>  <div class="articleShow">
            {
                articleList.value.map((item)=><section>
                    <h5>
                        <span>【{item.type}】</span>
                        <router-link to={'/Article/'+item._id}>
                            {item.title}
                        </router-link>
                    </h5>
                    <div class="time">
                        <p class="date">{ date(item.date)} </p>
                        <p class="month">{month(item.date)}<span>月</span></p>
                        <p class="year">{ year(item.date)}</p>
                    </div>
                    <div class="content">
                        <router-link
                            to={'/Article/'+item._id}
                            style={{backgroundImage:'url('+item.surface+')'}}>
                            <i></i>
                        </router-link>
                        { contentToText(item.content)}
                    </div>
                    <div class="read-more">
                        <router-link to={'/Article/'+item._id}>继续阅读</router-link>
                    </div>
                    <div class="footer">
                        <div class="fl">
                            <i class="el-icon-s-promotion"></i>
                            <span>{item.tag}</span>
                        </div>
                        <div class="fr">
                            <span class="pv">
                                <i class="el-icon-view"></i>
                                <i>{item.pv}</i>
                            </span>
                            <span class="comment">
                                <i class="el-icon-chat-dot-round"></i>
                                <i>{item.comment.length}</i>
                            </span>
                        </div>
                    </div>
                </section>)
            }
            {
                ifLoding.value && <div  class="loading">
                    <span>加载中</span>
                    <svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg>
                </div>
            }

            {
                ifNoMore &&  <p  class="no-more">哼╭(╯^╰)╮我也是有底线的！！</p>
            }
        </div>
    }
})

