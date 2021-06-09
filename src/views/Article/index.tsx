import {h,defineComponent, ref} from "vue"
import {getArticle,getArticleExtend} from "../../api"
import "./index.less"
import {Nav} from '../../components'
import {year,month,date,getTime} from '../../utils'
import { useRoute, useRouter } from "vue-router"
import { Article } from '../../type/article'
import { mdToHTML } from "../../plugin"
export default defineComponent({
    name : "Article",
    setup(){
        const articleInfo = ref<Article>()
        const extendList = ref<Article[]>([])
        const route = useRoute()
        const router = useRouter()
        //文章信息
        getArticle(String(route.params.id))
            .then(res=>{
                if (res.data.code === 0) {
                    articleInfo.value = res.data.data;
                    //延伸阅读
                    getArticleExtend(res.data.data.tag)
                        .then(res=>{
                            extendList.value = res.data.data;
                        })
                }else{
                    router.push('/404')
                }
            })
            .catch(e=>{
                router.push('/404')
            });
        return ()=> {

            return <div>
                <Nav/>
                <div class="Message">
                    <div class="main">
                        {
                            articleInfo.value && <div>
                                <section class="title">
                                    <h4>{articleInfo.value.title}</h4>
                                    <p>
                                        <small>
                                            作者：<a href="javascript:void(0)">四路闲人</a>
                                        </small>
                                        <small class="ml10">围观群众：<i class="readcount">{articleInfo.value.pv}</i></small>
                                        <small class="ml10">更新于 <label>{ getTime(articleInfo.value.updateDate)}</label> </small>
                                    </p>
                                </section>
                                <section class="time">
                                    <p class="date">{ date(articleInfo.value.date)}</p>
                                    <p class="month">{ month(articleInfo.value.date)}<span>月</span></p>
                                    <p class="year">{year(articleInfo.value.date)}</p>
                                </section>
                                <section class="content markdown" v-html={mdToHTML(articleInfo.value.content)}>
                                </section>
                                <section class="copyright">
                                    <p class="f-toe fc-black">
                                        非特殊说明，本文版权归 四路闲人 所有，转载请注明出处.
                                    </p>
                                    <p class="f-toe">
                                        本文网址：
                                        <a href={articleInfo.value.href}>{articleInfo.value.href}</a>
                                    </p>
                                </section>
                                <section class="extend">
                                    <h6>延伸阅读</h6>
                                    <ol>
                                        {
                                            extendList.value.map(item=><li class="f-toe" >
                                                <router-link to={'/Article/'+item._id}>{item.title}</router-link>
                                            </li>)
                                        }
                                    </ol>
                                </section>
                            </div>
                        }
                    </div>
                </div>
            </div>
        }
    }
})
