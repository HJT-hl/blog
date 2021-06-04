import { h, defineComponent, ref, onMounted, onUnmounted } from 'vue'
import './index.less'
import { Nav, RichText } from '../../components'
import {
    postIfLogin,
    commitMessage,
    getMessageList,
    commitChildMessage
} from '../../api'
import { toTwo, getTime, className } from '../../utils'
import { ElMessage, ElButton } from 'element-plus'
import { Message } from '../../type/message'

export default defineComponent({
    name: 'Message',
    setup () {
        const commentList = ref<Message[]>([])
        const skip = ref(0)
        const limit = ref(0)
        const ifLoding = ref(false)

        function handleSubmit (val: string) {
            postIfLogin()
                .then(res => {
                    if (res.data.userInfo) {
                        //登陆了，就发送数据到数据库 -- 执行留言提交的ajax
                        commitMessage({
                            user: res.data.userInfo._id,
                            content: val
                        }).then(res => {
                            if (res.data.code === 0) {
                                ElMessage({
                                    type: 'success',
                                    message: '留言成功'
                                })
                                setTimeout(() => {
                                    window.location.reload()
                                }, 1000)
                            } else {
                                ElMessage({
                                    type: 'error',
                                    message: res.data.msg
                                })
                            }

                        }).catch(() => {
                            ElMessage({
                                type: 'error',
                                message: '服务器错误~请稍后再试'
                            })
                        })

                    } else {
                        //未登录
                        ElMessage({
                            type: 'error',
                            message: '请先登录'
                        })
                    }
                })
                .catch(() => {
                    //服务出错
                    ElMessage({
                        type: 'error',
                        message: '服务器错误~请稍后再试'
                    })
                })
        }

        function replyClick (pIndex: number, cIndex?: number) {
            if (pIndex === undefined) return
            let parentData = commentList.value[pIndex]
            //改变placeholder的内容
            if (cIndex !== undefined) {
                //回复的子评论
                commentList.value[pIndex].reply.reUser = commentList.value[pIndex].children[cIndex].user.user
            } else {
                //回复的父评论
                commentList.value[pIndex].reply.reUser = commentList.value[pIndex].user.user
            }
            //两次点的同一个
            //不是同一个
            if ((pIndex === parentData.reply.lastIndexArr[0] && cIndex === parentData.reply.lastIndexArr[1])) {
                parentData.reply.ifShow = false
                parentData.reply.lastIndexArr = []
            } else {
                parentData.reply.ifShow = true
                parentData.reply.lastIndexArr = [pIndex, cIndex]
            }
        }

        function childCommit (pIndex: number) {
            //判断登录
            postIfLogin()
                .then(res => {
                    if (res.data.userInfo) {
                        //登陆了，就发送数据到数据库 -- 执行留言提交的ajax
                        commitChildMessage({
                            parentId: commentList.value[pIndex]._id,
                            user: res.data.userInfo._id,
                            content: commentList.value[pIndex].reply.content,
                            reUser: commentList.value[pIndex].reply.reUser
                        })
                            .then(res => {
                                if (res.data.code) {
                                    //code不为0，评论失败
                                    ElMessage({
                                        type: 'error',
                                        message: res.data.msg
                                    })
                                } else {
                                    //code为0，评论成功
                                    ElMessage({
                                        type: 'success',
                                        message: '评论成功'
                                    })
                                    setTimeout(() => {
                                        window.location.reload()
                                    }, 1000)
                                }
                            })
                    } else {
                        //未登录
                        ElMessage({
                            type: 'error',
                            message: '请先登录'
                        })
                    }
                })
                .catch(() => {
                    //服务出错
                    ElMessage({
                        type: 'error',
                        message: '服务器错误~请稍后再试'
                    })
                })
        }

        function handleScroll () {
            if (ifLoding.value) return

            //文档高
            let c = document.documentElement.offsetHeight
            //滚动高
            let a = document.documentElement.scrollTop
            //可视区高
            let b = document.documentElement.clientHeight

            if (a + b >= c - 200) {
                ifLoding.value = true
                getMessageLists(() => {
                    ifLoding.value = false
                })
            }
        }

        function getMessageLists (cb?: () => void) {
            limit.value += 5
            getMessageList(skip.value, limit.value)
                .then(res => {
                    if (res.data.code === 0) {
                        const data = res.data.data as Message[]
                        data.forEach(item => {
                            item.reply = {
                                user: '',//id
                                content: '',//回复内容
                                reUser: '',//字符串
                                date: '',//日期
                                ifShow: false,
                                lastIndexArr: []
                            }
                        })
                        commentList.value = data
                    }
                    cb && cb()
                })
                .catch(() => {
                    cb && cb()
                })
        }

        getMessageLists()
        onMounted(() => {
            window.addEventListener('scroll', handleScroll)
        })
        onUnmounted(() => {
            window.removeEventListener('scroll', handleScroll)
        })
        return () => <div class="Message">
            <Nav/>
            <div class="main">
                <div class="content">
                    <article>
                        <section>
                            <h2>留言板</h2>
                            <p>沟通交流，拉近你我！</p>
                            <RichText onSub={handleSubmit}/>
                        </section>
                        <section>
                            <ul>
                                {
                                    commentList.value.map((item, index) => <li>
                                        <div class="comment-parent">
                                            <div class="p-img"
                                                 style={{ backgroundImage: 'url(' + item.user.photo + ')' }}>
                                            </div>
                                            <div class="p-info">
                                                <div class="p-name">{item.user.user}</div>
                                                <div class="p-content" v-html={item.content}>
                                                </div>
                                                <div class="p-time">
                                                    <span>{getTime(item.date)}</span>
                                                    <a onClick={() => replyClick(index)}>
                                                        {(item.reply.lastIndexArr[0] === index && item.reply.lastIndexArr[1] === undefined) ? '收起' : '回复'}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            item.children.map((childItem, childIndex) => <div class="comment-child">
                                                <div class="c-img"
                                                     style={{ backgroundImage: 'url(' + childItem.user.photo + ')' }}>
                                                </div>
                                                <div class="c-info">
                                                    <div class="c-name">
                                                        <span class="name">{childItem.user.user}</span>
                                                        回复
                                                        <span class="name">{childItem.reUser}</span>
                                                        <span>{childItem.content}</span>
                                                    </div>
                                                    <div class="c-time">
                                                        <span>{getTime(childItem.date)}</span>
                                                        <a onClick={() => replyClick(index, childIndex)}>
                                                            {(item.reply.lastIndexArr[0] === index && item.reply.lastIndexArr[1] === childIndex) ? '收起' : '回复'}
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>)
                                        }
                                        <div class={className(['comment-reply', { 'show': item.reply.ifShow }])}>
                                            <textarea v-model={item.reply.content}
                                                        placeholder={'回复【' + item.reply.reUser + '】：'}
                                            />
                                            <ElButton
                                                // @ts-ignore
                                                onClick={() => childCommit(index)}
                                            >
                                                提交
                                            </ElButton>
                                        </div>
                                    </li>)
                                }
                            </ul>
                        </section>
                    </article>
                </div>
            </div>
        </div>
    }
})
