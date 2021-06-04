import {h,defineComponent} from  "vue"
import {Nav,Container} from "../../components"
export default defineComponent({
    name : "Blog",
    render(){
        return <div class="Blog">
            <Nav/>
            <Container/>
        </div>
    }
})
