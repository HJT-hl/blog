export  interface User {
    user : string,
    pwd : string,
    photo : string
}

export interface RegistryUser extends Pick<User,"user"|"pwd">{
    svgCode : string
}
export type LoginUser = Pick<User,"user"|"pwd">
