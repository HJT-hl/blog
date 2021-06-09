import {h,defineComponent, ref, onMounted, onUnmounted, onBeforeUnmount, watchEffect} from "vue"
class Bubble {
    x:number
    y:number
    vx:number
    vy:number
    r:number
    dead:boolean
    color:string
    constructor (x:number, y:number) {
        this.x = x
        this.y = y
        this.vx = Math.random() * 3 - 1.5
        this.vy = Math.random() * 3 - 1.5
        this.r = Math.random() * 3 + 3
        this.dead = false
        this.color = '#' + Math.random().toString(16).slice(2, 8)
    }
    render (ctx:CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.globalCompositeOperation = 'lighter'
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fill()
    }
    update () {
        this.r *= 0.96
        this.x += this.vx
        this.y += this.vy
        if (this.r < 0.01) {
            this.dead = true
        }
    }
}
export default defineComponent({
    name : "Xingkong",
    setup(){
        const canvasRef = ref();
        const bubbles = ref<Bubble[]>([])
        const timer = ref<number|undefined>(undefined)
        const animateState =  ref(true)
        let ctx : CanvasRenderingContext2D
        function init () {
            ctx = canvasRef.value.getContext('2d')
            canvasRef.value.width = document.documentElement.offsetWidth;
            canvasRef.value.height = 260;
            auto()
        }
        function auto(){
            clearInterval(timer.value);
            timer.value = setInterval(()=>{
                bubbles.value.push(new Bubble(canvasRef.value.width * Math.random(), canvasRef.value.height * Math.random()))
            },30)
        }
        function register () {
            window.addEventListener("resize",handleResize);
            canvasRef.value.addEventListener('mousemove',handleMousemove)
        }
        function render () {
            if(!canvasRef.value) return ;
            ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
            bubbles.value.forEach(bubble => {
                bubble.render(ctx)
                bubble.update()
            })
            bubbles.value = bubbles.value.filter(bubble => {
                return !bubble.dead
            })
            animateState && requestAnimationFrame(() => render())
        }
        function handleResize(){
            canvasRef.value.width = document.documentElement.offsetWidth;
        }
        function handleMousemove(e:MouseEvent){
            bubbles.value.push(new Bubble(e.offsetX, e.offsetY))
        }
        onMounted(()=>{
            init()
            register()
            render()
        })
        onBeforeUnmount(()=>{
            clearInterval(timer.value);
            window.removeEventListener("resize",handleResize);
            canvasRef.value.removeEventListener('mousemove',handleMousemove)
            animateState.value = false;
        })

        return ()=><canvas
            style={{backgroundColor: "#222"}}
            height="260"
            ref={canvasRef}>
        </canvas>
    }
})
