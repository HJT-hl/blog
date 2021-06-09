import {h,defineComponent, reactive, onMounted, ref, onUnmounted, PropType} from "vue"
import {getRegisterVCode,getRegisterCheckVcode,postRegister}  from "../../api"
import {ElMessage,ElMessageBox,ElDialog,ElForm,ElFormItem,ElInput,ElButton} from "element-plus"
import "./index.less"
interface RegisterReactive {
    svgText : string,
    refreshText : string,
    disabled : boolean,
    timer : undefined | number,
    submitDisabled : boolean
}
interface Props {
    dialogVisible: boolean;
    OnHandleClose : (bool:boolean)=>void
}
export default defineComponent({
    name : "Register",
    props: {
        dialogVisible: {
            type: Boolean as PropType<boolean>,
            required: true
        },
        OnHandleClose:{
            type : Function as PropType<(bool:boolean)=>void>,
            required: true
        }
    },
    setup(props:Props,{slots}){
        const form = reactive({
            user : "",
            pwd : "",
            checkPwd : "",
            svgCode : ""
        })
            //注册相关的数据
        const  register = reactive<RegisterReactive>({
            svgText : "loading...",
            refreshText : "刷新",
            disabled : true,
            timer : undefined,
            submitDisabled : false
        })
        const formRef= ref()

        const rules = {
            //用户名验证
            user : [
                { required: true, message: '请输入用户名', trigger: 'blur' },
                {
                    //数据类型
                    type:"string",
                    //正则规则
                    pattern: /^[\w\u4e00-\u9fa5\uac00-\ud7ff\u0800-\u4e00\-]{2,7}$/,
                    message: '2-7位，数字 字母 _ - 中日韩文',
                    trigger: ['blur','change']
                }
            ],
            //密码验证
            pwd : {
                type:"string",
                validator : (rule:null,value:string,cb:(e?:Error)=>{})=>{

                    if (value){
                        //验证密码是否符合规则
                        if (/^[\w<>,.?|;':"{}!@#$%^&*()\/\-\[\]\\]{6,18}$/.test(value)){
                            cb();
                        }else{
                            cb(new Error("6-18位，不允许出现奇怪的字符哦~"));
                        }
                    }else{
                        cb(new Error("请输入密码"));
                    }
                    //在这里还需要触发确认密码的验证
                    form.checkPwd && formRef.value.validateField("checkPwd");
                },
                required: true,
                message: '6-18位，不允许出现奇怪的字符',
                trigger: ['blur','change']
            },
            //再次输入密码验证
            checkPwd : {
                validator : (rule:null,value:string,cb:(e?:Error)=>{})=>{
                    if (value){
                        if (value === form.pwd) {
                            cb();
                        }else{
                            cb(new Error("两次密码不一致"));
                        }
                    }else{
                        cb(new Error("请再次输入密码"));
                    }

                },
                required: true,
                trigger: ['blur','change']
            },
            //验证码
            svgCode : {
                validator : (rule:null,value:string,cb:(e?:Error)=>{})=>{
                    if (!value){
                        cb(new Error("请输入验证码！"));
                    }else{
                        getRegisterCheckVcode(value).then(res=>{
                            if (res.data.code === 0){
                                cb();
                            }else{
                                cb(new Error("验证码错误"));
                            }
                        }).catch(e=>{
                            cb(new Error("未知错误…"));
                        });
                    }
                },
                required: true,
                trigger: 'blur'
            }
        }

        function  getVCode(){
            getRegisterVCode().then(res=>{
                clearTimeout(register.timer);
                let t = 0;
                let fn = ()=>{
                    t+=1000;
                    if (t > res.data.time){
                        clearTimeout(register.timer);
                        register.disabled = false;
                        register.refreshText = "刷新";
                    }else{
                        register.disabled = true;
                        register.refreshText = (((res.data.time - t)/1000)|0) + "s后可以刷新";
                    }
                };
                register.timer = setInterval(fn,1000);
                fn();

                //更新图片
                register.svgText = res.data.data;
            });
        }

        /*注册的点击*/
        function handleClick(){
            register.submitDisabled = true;
            formRef.value.validate((valid:boolean) => {
                if (valid) {
                    //验证都通过
                    postRegister(form).then(res=>{
                        getVCode();
                        if (res.data.code){
                            ElMessage({
                                message: res.data.msg,
                                type: 'error',
                                duration : 2000
                            });
                            register.submitDisabled = false;
                        }else{
                            //注册成功
                            ElMessage({
                                message: '注册成功！',
                                type: 'success',
                                duration : 2000
                            });
                            setTimeout(()=>{
                                register.submitDisabled = false;
                                props.OnHandleClose(true)
                            },1800);
                        }
                    }).catch(e=>{
                        register.submitDisabled = false;
                        getVCode();
                        ElMessage({
                            message: "注册失败请稍后再试~",
                            type: 'error',
                            duration : 2000
                        });
                    });
                } else {
                    register.submitDisabled = false;
                    //验证没通过
                    return false;
                }
            });
        }
        /*关闭的回调*/
        function beforeClose(){
            ElMessageBox.confirm('确认关闭？')
                .then(()=> {
                    props.OnHandleClose(false)
                })
                .catch(()=> {});
        }

        onMounted(()=>{
            getVCode()
        })
        onUnmounted(()=>{
            clearTimeout(register.timer);
        })


        return ()=><ElDialog
            modelValue={props.dialogVisible}
            width="30%"
            beforeClose={beforeClose}
            v-slots={{
                title:()=><div style={{textAlign:"center"}}>注册</div>,
                footer:()=> <div  class="dialog-footer">
                     <ElButton type="primary"
                        // @ts-ignore
                                onClick={handleClick}
                                disabled={register.submitDisabled}
                                style={{width:"200px"}}
                    >
                        立即注册
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
                    <ElInput v-model={form.pwd} showPassword/>
                </ElFormItem>
                <ElFormItem label="确认密码" prop="checkPwd">
                    <ElInput v-model={form.checkPwd} type="password"/>
                </ElFormItem>
                <ElFormItem label="验证码" prop="svgCode" class="vcode">
                    <ElInput v-model={form.svgCode} />
                    <div class="svg" v-html={register.svgText}></div>
                    <ElButton  type="text"
                            // @ts-ignore
                             onClick={getVCode}
                             disabled={register.disabled}
                    >
                        {register.refreshText}
                    </ElButton>
                </ElFormItem>
            </ElForm>

        </ElDialog>
    }
})


