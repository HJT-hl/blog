export  interface Article {
    _id : string | number;
    type : string;
    title : string;
    brief:string;
    date : string;
    surface : string;
    content : string;
    tag : string;
    pv  : number;
    comment : string[];
    updateDate: string;
    href : string;
}
