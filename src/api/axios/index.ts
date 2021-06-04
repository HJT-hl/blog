import  axios from "./axios.config"
export * from "./article"
export * from "./login"
export * from "./register"
export * from "./message"

/*日记接口*/
export function getDiary () {
    return axios.get('/diary')
}

/*友链接口*/
export function getLinks () {
    return axios.get('/links')
}


