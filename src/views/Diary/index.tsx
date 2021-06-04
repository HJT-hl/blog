import  "./index.less"
import {h,defineComponent, ref} from "vue"
import {getDiary} from "../../api"
import {Nav} from "../../components"
import {ElTimeline,ElTimelineItem,ElCard} from "element-plus"
import { getD } from "../../utils"
import { Diary } from '../../type/diary'
export default defineComponent({
    name : "Diary",
    setup(){
        const diaryList  = ref<Diary[]>([])
        getDiary()
            .then(res=>{
                diaryList.value = res.data.data;
            })
        return  ()=><div class="Diary">
            <Nav/>
            <div class="diary-main">
                <ElTimeline>
                    {
                        diaryList.value.map(item=><ElTimelineItem
                            timestamp={ getD(item.date) }
                            placement="top"
                        >
                            <ElCard>
                                <p>{item.txt}</p>
                                <img src={item.img}
                                width="100%"
                                alt=""/>
                            </ElCard>
                        </ElTimelineItem>)
                    }
                </ElTimeline>
            </div>
        </div>
    }
})
