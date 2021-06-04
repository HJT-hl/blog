import { User } from "./user";

export  interface CommitMessage {
    parentId: string;
    user: number;
    content:string;
    reUser:string;
}

export interface Message{
    content : string;
    date : string;
    reply : Reply;
    user : User;
    _id : string;
    children: Message[];
    reUser ?: string;
}

export interface Reply{
    user : string;//id
    content : string;//回复内容
    reUser : string;//字符串
    date : string;//日期
    ifShow : boolean;
    lastIndexArr : (number|undefined|null)[];
}
