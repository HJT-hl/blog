import axios from "./axios.config"
import {CommitMessage} from "../../type/message"
export function  commitMessage(options:Pick<CommitMessage,"user"|"content">){
    return axios.post("/message/commit",options);
}
/*留言的留言接口 options => {parentId:"id",user:"id",content:"",reuser:""}*/
export function commitChildMessage (options:CommitMessage) {
    return axios.post('/message/childCommit', options)
}

/*获取留言列表 options => */
export function getMessageList (skip = 0, limit = 5) {
    return axios.post('/message/getList', { skip, limit })
}

/*最近访问接口*/
export function getVisitor () {
    return axios.post('/visitor')
}

