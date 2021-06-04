import  axios from "./axios.config"
import {LoginUser} from "../../type/user"
/*登录的接口*/
export  function postLogin (options:LoginUser) {
    return axios.post('/login', options)
}

export function postIfLogin () {
    return axios.post('/login/ifLogin')
}

export function postLogout () {
    return axios.post('/login/logout')
}

