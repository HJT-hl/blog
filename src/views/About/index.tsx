import {defineComponent, h} from  "vue"
import {Nav,XingKong} from "../../components"
import "./index.less"
export default defineComponent({
    name : "About",
    render(){
        return <div class="About">
            <Nav/>
            <div class="canvas" >
                <div class="txt">
                    <h2>关于</h2>
                    <p>兴来每独往，胜事空自知。。</p>
                </div>
                <XingKong/>
            </div>
            <div class="about-main">
                <div class="a-m-content">
                    <article>
                        <section>
                            <h1>关于我</h1>
                            <p>
                                目前是一名大三的学生，热爱前端并投身在其中。做过几个小开源项目，也积极的参与社区的建设。
                            </p>
                            <span>
                                可以通过以下方式联系到我：
                            </span>
                            <ul>
                                <li>邮 箱 ：<a href="mailto:hlalongweb@163.com">hlalongweb@163.com</a></li>
                            </ul>
                        </section>
                        <section>
                            <h1>关于本站</h1>
                            <p>
                                本站 UI 样式借鉴于燕十三博客，地址：https://www.yanshisan.cn/Blog/Index <br/>
                                目前主要是用于分享个人的文章。后面可能会出一些小程序，可能是一些js实现的特效或者是一些新技术的小demo。
                            </p>
                            <span>
                                本站结构：
                            </span>
                            <ul>
                                <li>前 端 ：<code>vue3 + Typescript + jsx + vite</code></li>
                                <li>后 端 ：<code>node + express + mongoodb</code></li>
                            </ul>
                        </section>
                        <section>
                            <h1>项目源码：</h1>
                            <p >
                                github : &nbsp;
                                <a href="https://github.com/HJT-hl/blog">
                                    https://github.com/HJT-hl/blog
                                </a>

                            </p>
                        </section>
                        <section>
                            <h1>关于版权</h1>
                            <p>
                                只要在使用时注明出处，那么您可以可以对本站所有原创内容进行转载、节选、二次创作，但是您不得对其用于商业目的。
                            </p>
                        </section>
                        <section>
                            <h1>特别说明</h1>
                            <ul>
                                <li>本站文章仅代表个人观点，和任何组织或个人无关。</li>
                                <li>本站前端开发代码没有考虑对IE浏览器的兼容。</li>
                                <li>文章会在掘金同步更新 ：https://juejin.cn/user/3966693686125277/posts</li>
                            </ul>
                            <br/><br/>
                                <div>
                                    <img src="https://yssimage.oss-cn-hangzhou.aliyuncs.com/bg9.jpg" style="width:100%;height:320px;"/>
                                </div>
                        </section>

                    </article>
                </div>
            </div>
        </div>
    }
})
