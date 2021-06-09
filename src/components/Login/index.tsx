import { ElMessage,ElDialog,ElForm,ElInput,ElFormItem,ElButton } from 'element-plus'
import './index.less'
import { h, defineComponent, reactive, PropType, ref } from 'vue'
import { postLogin } from '../../api'
import { useUser } from '../hook/user'

interface Props {
    dialogVisible: boolean;
    OnHandleClose : ()=>void
}

export default defineComponent({
    name: 'Login',
    props: {
        dialogVisible: {
            type: Boolean as PropType<boolean>,
            required: true
        },
        OnHandleClose:{
            type : Function as PropType<()=>void>,
            required: true
        }
    },
    setup (props: Props, { slots }) {
        const { setUser } = useUser()
        const form = reactive({
            user: '',
            pwd: '',
            checkPwd: ''
        })
        const formRef = ref()
        //登录过程禁用
        const submitDisabled = ref(false)
        const rules = {
            //用户名验证
            user: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
                {
                    //数据类型
                    type: 'string',
                    //正则规则
                    pattern: /^[\w\u4e00-\u9fa5\uac00-\ud7ff\u0800-\u4e00\-]{2,7}$/,
                    message: '请输入正确格式用户名',
                    trigger: ['blur', 'change']
                }
            ],

            //密码验证
            pwd: {
                type: 'string',
                validator: (rule: null, value: string, cb: (e?: Error) => void) => {
                    if (value) {
                        //验证密码是否符合规则
                        if (/^[\w<>,.?|;':"{}!@#$%^&*()\/\-\[\]\\]{6,18}$/.test(value)) {
                            cb()
                        } else {
                            cb(new Error('请输入正确格式密码'))
                        }
                    } else {
                        cb(new Error('请输入密码'))
                    }

                    //在这里还需要触发确认密码的验证
                    form.checkPwd && formRef.value.validateField('checkPwd')
                },
                required: true,
                trigger: ['blur', 'change']
            }
        }

        function handleClick () {
            submitDisabled.value = true
            formRef.value.validate((valid: boolean) => {
                if (valid) {
                    //验证都通过
                    postLogin(form).then(res => {
                        if (res.data.code) {
                            submitDisabled.value = false
                            //登录失败
                            ElMessage({
                                message: res.data.msg,
                                type: 'error',
                                duration: 2000
                            })
                        } else {
                            //登录成功
                            ElMessage({
                                message: res.data.msg,
                                type: 'success',
                                duration: 2000
                            })
                            setUser( res.data.data)
                            submitDisabled.value = false
                            props.OnHandleClose()

                        }
                    }).catch(e => {
                        ElMessage({
                            message: '登录失败请稍后再试~',
                            type: 'error',
                            duration: 2000
                        })
                        submitDisabled.value = false
                    })
                } else {
                    submitDisabled.value = false
                    //验证没通过
                    return false
                }
            })
        }

        function  beforeClose(){
            props.OnHandleClose()
        }
        return ()=>  <ElDialog
                modelValue={props.dialogVisible}
                width="30%"
                beforeClose={beforeClose}
                closeOnClickModal={false}
                v-slots={{
                    title :()=><div style={{textAlign:"center"}}>登录</div>,
                    footer:()=>  <div class="dialog-footer">
                            <ElButton
                                type="primary"
                                // @ts-ignore
                                onClick={handleClick}
                                disabled={submitDisabled.value}
                                style={{width:"200px"}}
                            >
                                登录
                            </ElButton>
                </div>
                }}
            >
            <ElForm
                ref={formRef}
                model={form}
                labelWidth="80px"
                rules={rules}
            >
                <ElFormItem label="用户名" prop="user">
                    <ElInput v-model={form.user}/>
                </ElFormItem>
                <ElFormItem label="密码" prop="pwd">
                    <ElInput v-model={form.pwd} show-password/>
                </ElFormItem>

            </ElForm>
        </ElDialog>
    }
})
