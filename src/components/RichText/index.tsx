import {h,defineComponent, ref,PropType, onMounted, onBeforeUnmount} from "vue"
import {ElButton} from "element-plus"
import WangEditor from "wangeditor"
export default defineComponent({
    name : "RichText",
    props:{
      onSub:{
          type : Function as PropType<(content:string)=>void>,
          required: true
      }
    },
    setup(props:{
        onSub : (content:string)=>void
    }){
        const editor = ref();
        let instance:WangEditor;
        onMounted(() => {
            instance = new WangEditor(editor.value);
            Object.assign(instance.config, {
                zIndex : 0,
                excludeMenus : [
                    'head',
                    'fontSize',
                    'indent',
                    'lineHeight',
                    'list',
                    'todo',
                    'justify',
                    'quote',
                    'image',
                    'video',
                    'splitLine',
                    'code',
                    'table'
                ]
            });
            instance.create();
        });


        onBeforeUnmount(() => {
            instance.destroy();
        });

        function handleClick(){
            props.onSub(instance.txt.html() as string)
        }

        return ()=><div>
            <div ref={editor}></div>
            <ElButton
                // @ts-ignore
                onClick={handleClick}
            >
                提交留言
            </ElButton>
        </div>
    }
})
