export  interface Article {
    _id : string | number;
    type : string;
    title : string;
    date : string;
    surface : string;
    content : string;
    tag : string;
    pv  : number;
    comment : string[];
    updateDate: string;
}
