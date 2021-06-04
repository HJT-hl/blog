import { ElMessage,ElUpload,ElDialog } from "element-plus";
import {h,defineComponent, PropType, ref} from "vue"
import "./index.less"
interface Props {
    dialogVisible: boolean;
    OnHandleClose : ()=>void
}

export default defineComponent({
    name : "Avatar",
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
    setup(props:Props){
        const imageUrl = ref("")
        function handleAvatarSuccess(file:File){
            // @ts-ignore
            imageUrl.value = URL.createObjectURL(file.raw);
            ElMessage({
                message: "头像上传成功",
                type: 'success',
                duration : 2000
            })
            setTimeout(() =>{
                window.location.reload();
            },1700)
        }
        function beforeAvatarUpload(file:File) {
            const isType = /^(image\/jpeg|image\/png|image\/gif)$/.test(file.type);
            const isLt50K = file.size / 1024 < 50;

            if (!isType) {
                ElMessage.error("上传头像图片只能是 JPG/PNG/GIF 格式!")
            }
            if (!isLt50K) {
                ElMessage.error("上传头像图片大小不能超过 50K !")
            }
            return isType && isLt50K;
        }
        function  beforeClose(){
            props.OnHandleClose()
        }
        // @ts-ignore
        return ()=><ElDialog
                title="头像上传"
                modelValue={props.dialogVisible}
                width="30%"
                beforeClose={beforeClose}
                closeOnClickModal={false}
            >
                <ElUpload
                    class="avatar-uploader"
                    action="http://localhost:3000/upload/avatar"
                    show-file-list={false}
                    onSuccess={handleAvatarSuccess}
                    beforeUpload={beforeAvatarUpload}
                    withCredentials={true}
                >
                    {
                        imageUrl.value
                            ? <img  src={imageUrl.value} class="avatar"/>
                            :  <i  class="el-icon-plus avatar-uploader-icon"></i>
                    }
                </ElUpload>
        </ElDialog>
    }
})
