type IsBoolean = undefined | null| boolean | number
type ClassNameParams = (string | Record<string,IsBoolean>)[] | Record<string,IsBoolean>
export  function  className(params:ClassNameParams):string{
    const res:string[] = []

    if(Array.isArray(params)){
        for(const item of params ){
            if(typeof item === "string"){
                res.push(item)
            }else if(typeof item === "object"){
                for(const [key,value] of Object.entries(item) ){
                    if( value){
                        res.push(key)
                    }
                }
            }
        }
    }else if(typeof params === "object"){
        for(const [key,value] of Object.entries(params) ){
            if( value){
                res.push(key)
            }
        }
    }

    return res.join(" ")
}

export function toTwo(num:number):string{
    return (num<10?"0":"") + num;
}
