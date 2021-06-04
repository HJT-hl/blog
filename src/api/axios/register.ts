import { User } from "../../type/user"
import  axios from "./axios.config"
import {RegistryUser} from "../../type/user"

//获取验证码图片
export function getRegisterVCode () {
    return axios.post('/register/vcode')
}

//验证码的提交验证
export function getRegisterCheckVcode (svgCode:string) {
    return axios.post('/register/checkVcode', { svgCode })
}

/*
* 注册接口
* @parmas
*   options ：Object，必须，需要 user、pwd、svgCode 三条属性
* */
export function  postRegister (options:RegistryUser) {
    return axios.post('/register', options)
}
