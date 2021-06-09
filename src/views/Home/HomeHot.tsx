import {h,defineComponent, ref, onMounted} from "vue"
import { date, month, year } from '../../utils'
import { Article } from '../../type/article'
import { getArticleHot } from '../../api'
/* 热门文章*/
export default defineComponent({
    name : "HomeHot",
    setup(){
        const articleHotList = ref<Article[]>([])
        onMounted(()=>{
            getArticleHot(3).then(res=>{
                articleHotList.value = res.data.data;
            })
        })
        return ()=>
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
                            articleHotList.value.map((item) => <li>
                                <div class="img">
                                    <div class="bgImg"
                                         style={{ backgroundImage: 'url(' + item.surface + ')' }}>
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
                                    <div class="content">{item.brief}</div>
                                    <router-link to={`/Article/${item._id}`} className="link">
                                        阅读更多
                                    </router-link>
                                </div>
                            </li>)
                        }
                    </ul>
                </div>
            </div>
    }
})
