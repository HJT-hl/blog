import {h,defineComponent, readonly, ref,  computed, onMounted} from "vue"
import Register from "../Register"
import Login from "../Login"
import Avatar from "../Avatar"
import {postIfLogin,postLogout} from "../../api"
import { useRoute } from "vue-router"
import { ElMessage ,ElPopover,ElButton} from "element-plus"
import "./index.less"
import { useUser } from '../hook/user'

export default defineComponent({
    name : "Nav",
    setup(){
        const { user,setUser } = useUser()
        const routerList = readonly(["Home","Blog","Message","Diary","Links","About"])
        const ifShowLogin = ref(false)
        const ifShowRegister = ref(false)
        const ifShowAvatar = ref(false)
        const route = useRoute()
        const whichActive = computed(()=>{
            let index = routerList.indexOf(route.name as string);
            if (route.name === "Article") index = 1;
            return index + 1;
        })
        function closeRegister(bool:boolean){
            ifShowRegister.value = false;
            ifShowLogin.value = bool;
        }
        function closeLogin(){
            console.log("关闭了吗")
           ifShowLogin.value = false;
        }
        function closeAvatar(){
            ifShowAvatar.value = false;
        }
        function handleLogout(){
            postLogout()
                .then(()=>{
                    ElMessage({
                        message: "退出登录成功",
                        type: 'success',
                        duration : 2000
                    });
                    setUser({
                        user : "",
                        photo : ""
                    })

                })
                .catch(()=>{
                    ElMessage({
                        message: "退出失败…",
                        type: 'error',
                        duration : 2000
                    });
                });
        }
        onMounted(()=>{
            postIfLogin().then(res=>{
                if (res.data.userInfo) {
                    setUser(res.data.userInfo)
                }
            });
        })
        return ()=>  <div>
                <div id="nav">
                    <div class="nav-main" >
                        <div class="n-m-logo">SiXian</div>
                        <div class="n-m-login">
                            {
                                user.value.user !== ""
                                    ?  <ElPopover
                                        placement="top-start"
                                        width="100"
                                        trigger="hover"
                                        v-slots={{
                                            reference : ()=>
                                                <span
                                                    class="img"
                                                    style={{
                                                        backgroundImage : 'url('+user.value.photo+')',
                                                        position: 'absolute',
                                                        top: '10px',
                                                        left: '41px',
                                                        width: '40px',
                                                        height: '40px',
                                                        backgroundPosition: 'center center',
                                                        backgroundSize: 'cover',
                                                        borderRadius: '50%',
                                                        cursor:'pointer'
                                                    }}
                                                />
                                        }}
                                    >
                                        <p>欢迎登陆：{user.value.user}</p>
                                        <ElButton
                                            type="danger"
                                            // @ts-ignore
                                            onClick={handleLogout} plain size="mini">退出登录</ElButton>
                                        <br/>
                                        <ElButton
                                            type="primary"
                                            // @ts-ignore
                                            onClick={()=>ifShowAvatar.value = true}
                                            plain
                                            size="mini"
                                        >
                                            修改头像
                                        </ElButton>

                                    </ElPopover>
                                    : <div class="login">
                                        <ElButton
                                            // @ts-ignore
                                            onClick={()=> ifShowLogin.value = true}
                                            type="primary"
                                        >
                                            登录
                                        </ElButton>
                                        <ElButton
                                            // @ts-ignore
                                            onClick={()=>ifShowRegister.value = true}
                                            type="success"
                                        >
                                            注册
                                        </ElButton>
                                    </div>
                            }


                        </div>
                        <div class="n-m-nav">
                            <ul class={'list'+whichActive.value}>
                                <li><router-link to="/">首页</router-link></li>
                                <li><router-link to="/blog/0">博客</router-link></li>
                                <li><router-link to="/message">留言</router-link></li>
                                <li><router-link to="/diary">日记</router-link></li>
                                <li><router-link to="/links">友链</router-link></li>
                                <li><router-link to="/about">关于</router-link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Login
                    dialogVisible={ifShowLogin.value}
                    OnHandleClose={closeLogin}
                />
                <Register
                    dialogVisible={ifShowRegister.value}
                    OnHandleClose={closeRegister}
                />
                <Avatar
                    dialogVisible={ifShowAvatar.value}
                    OnHandleClose={closeAvatar}
                />
            </div>
    }
})
