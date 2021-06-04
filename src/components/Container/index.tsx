import './index.less'
import { h, defineComponent, ref, computed, onMounted, onUnmounted } from 'vue'
import ArticleShow from '../ArticleShow'
import { useRoute } from 'vue-router'
import { getArticleHot, getArticleInfo, getArticleSearch, getVisitor } from '../../api'
import { ElMain, ElContainer, ElAside } from 'element-plus'
import { className } from '../../utils'
import { Article } from '../../type/article'
import { User } from '../../type/user'

export default defineComponent({
    name: 'Container',

    setup () {
        const route = useRoute()
        /*搜索框 v-model*/
        const searchInput = ref('')
        const searchList = ref<Article[]>([])
        const searchTimer = ref<undefined | number>(undefined)
        /*控制search的clss名字*/
        const ifSearchFixed = ref(false)
        /*文章分类（tags）*/
        const articleTags = ref([])
        /*热门文章列表*/
        const articleHot = ref<Article[]>([])
        /*cover条的top值*/
        const coverIndex = ref(Number(route.params.id))
        /*这是最近访客的数据*/
        const visitor = ref<{user: User}[]>([])
        const getArticleTags = computed(() => {
            return ['全部文章', ...articleTags.value]
        })
        const getArticleRecommend = computed(() => {
            return articleHot.value[0] || {}
        })

        function handleMouseenter (index: number) {
            coverIndex.value = index
        }

        function handleMouseleave () {
            coverIndex.value = Number(route.params.id)
        }

        function handleWindowScroll () {
            ifSearchFixed.value = document.documentElement.scrollTop >= 900
        }

        function handleInput () {
            clearTimeout(searchTimer.value)
            searchTimer.value = setTimeout(() => {
                let keywords = searchInput.value.trim()//去除首位空格
                if (keywords) {
                    getArticleSearch(keywords)
                        .then(res => {
                            searchList.value = res.data.data
                        })
                        .catch(() => {
                            searchList.value = []
                        })
                } else {
                    searchList.value = []
                }
            }, 1000)
        }

        //请求分类
        getArticleInfo().then(res => {
            articleTags.value = res.data.data.tags
        })
        //请求热门文章
        getArticleHot().then(res => {
            articleHot.value = res.data.data
        })
        //请求最近访问者信息
        getVisitor().then(res => {
            visitor.value = res.data.data
        })
        onMounted(() => {
            handleWindowScroll()
            /*监听一下window的滚动事件*/
            window.addEventListener('scroll', handleWindowScroll)
        })
        onUnmounted(() => {
            //离开当前路由之后，就不需要这个事件了
            window.removeEventListener('scroll', handleWindowScroll)
        })


        return () => <div id="Container">
            <ElContainer>
                <ElMain>
                    <ArticleShow/>
                </ElMain>
                <ElAside>
                    <div class={className(['search', { 'fixed': ifSearchFixed.value }])}>
                        <div class="search-main">
                            <input
                                type="text"
                                onInput={handleInput}
                                v-model={searchInput.value}
                                placeholder="请输入搜索内容"/>
                            <i class="el-icon-search"></i>
                            {
                                !!searchList.value.length && <ul>
                                    {
                                        searchList.value.map(item =>
                                            <li>
                                                <router-link to={'/Article/' + item._id}>{item.title}</router-link>
                                            </li>
                                        )
                                    }
                                </ul>
                            }
                        </div>
                        <div class="search-article">
                            <ul onMouseleave={handleMouseleave}>
                                {
                                    getArticleTags.value.map((item, index) =>
                                        <li onMouseenter={() => handleMouseenter(index)}>
                                            <router-link to={'/blog/' + index}>{item}</router-link>
                                        </li>
                                    )
                                }
                            </ul>
                            <div class="cover" style={{ top: coverIndex.value * 40 + 'px' }}>
                            </div>
                        </div>
                    </div>

                    <div class="hot">
                        <h3>热门文章</h3>
                        <ul>{
                            articleHot.value.map((item, index) => <li>
                                <i>{index + 1}</i>
                                <router-link to={'/Article/' + item._id}>{item.title}</router-link>
                            </li>)
                        } </ul>
                    </div>
                    <div class="recommend">
                        <h3>置顶推荐</h3>
                        <ul>
                            {!!getArticleRecommend.value.title && <li>
                                <i>1</i>
                                <router-link
                                    to={'/Article/' + getArticleRecommend.value._id}>
                                    {getArticleRecommend.value.title}
                                </router-link>
                            </li>}
                        </ul>
                    </div>
                    <div class="visitor">
                        <h3>最近访客</h3>
                        <ul>
                            {
                                visitor.value.map(item => <li
                                    style={{ backgroundImage: 'url(' + item.user.photo + ')' }}>
                                    <p>{ item.user.user }</p>
                                </li>)
                            }
                        </ul>
                    </div>
                </ElAside>
            </ElContainer>
        </div>
    }
})



