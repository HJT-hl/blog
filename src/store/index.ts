import {createStore} from "vuex"
import { User } from '../type/user'
export type UserModule = Pick<User,"user"|"photo">

export default createStore({
    state : {
        user: '',
        photo: ''
    },
    mutations : {
        SET_USER_USER(state:UserModule,payload:string){
            state.user = payload
        },
        SET_USER_PHOTO(state:UserModule,payload:string){
            state.photo = payload
        }
    }

})
