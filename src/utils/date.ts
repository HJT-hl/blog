import  {toTwo} from './util'
export  function date(value:string){
    const match = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)
    if(match){
        return match[3]
    }
    return null
}
export  function month(value:string){
    const match = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)
    if(match){
        return match[2]
    }
    return null;
}
export function year(value:string){
    const match = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)
    if(match){
        return match[1]
    }
    return null;
}

export function getTime(val:string){
    let date = new Date(val);

    let YY = toTwo(date.getFullYear()),
        MM = toTwo(date.getMonth()+1),
        DD = toTwo(date.getDate()),
        h = toTwo(date.getHours()),
        m = toTwo(date.getMinutes()),
        s = toTwo(date.getSeconds());

    return `${YY}/${MM}/${DD} ${h}:${m}:${s}`;
}

export function  getD(val:string){
    let date = new Date(val);
    return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
}
