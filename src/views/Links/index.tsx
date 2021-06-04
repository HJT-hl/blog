import {h,defineComponent, ref} from "vue"
import "./index.less"
import { getLinks } from "../../api"
import {Nav,XingKong} from '../../components'
import { Link } from '../../type/links'

export default defineComponent({
    name : "Links",
    setup(){
        const linksList = ref<Link[]>([])
        getLinks().then(res=>{
            linksList.value = res.data.data;
        })
        return ()=> <div class="Links">
            <Nav/>
            <div class="canvas" >
                <div class="txt">
                    <h2>友情链接</h2>
                    <p>对影潭兮欲揽月，只为再抚卿柔面。</p>
                </div>
                <XingKong/>
            </div>
            <div class="link-main">
                <div class="rule">
                    <h3>链接申请说明</h3>
                    <p>
                        <i class="fa fa-close"></i>经常宕机&nbsp;
                        <i class="fa fa-close"></i>不合法规&nbsp;
                        <i class="fa fa-close"></i>插边球站&nbsp;
                        <i class="fa fa-close"></i>红标报毒&nbsp;
                        <i class="fa fa-check"></i>原创优先&nbsp;
                        <i class="fa fa-check"></i>技术优先
                    </p>
                    <p>交换友链可在留言板留言.本站链接如下：<br/>
                        名称：燕十三<br/>
                        网址：https://www.yanshisan.cn<br/>
                        图标：https://www.yanshisan.cn/logo.png<br/>
                        描述：燕十三·一个人的江湖</p>

                    <p>申请提交后若无其它原因将在24小时内审核,如超过时间还未通过,请私信我.(各种额外因素)</p>
                </div>
                <div class="container">
                    <ul>
                        {
                            linksList.value.map(item=> <li>
                                <a href={item.href} target="_blank">
                                    <img src={item.icon}/>
                                    <h3>{item.name}</h3>
                                    <p>{item.des}</p>
                                </a>
                            </li>)
                        }
                    </ul>
                </div>
            </div>
    </div>
    }
})
