export  function  contentToText(value:string){
    const div = document.createElement("div");
    div.innerHTML = value;
    return div.innerText;
}

//得到DOM距离页面顶部的距离
export function getTop(node:HTMLElement){
    let top = 0;
    while(node !== document.body){
        top += node.offsetTop;
        if(node.offsetParent){
            node = node.offsetParent as HTMLElement;
        }
    }
    return top;
}
