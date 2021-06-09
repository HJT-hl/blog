import { User } from '../../type/user'
export type UserModule = Pick<User,"user"|"photo">
const state: UserModule= {
    user: '',
    photo: ''
}

const mutation = {
    SET_USER_INFO (state:UserModule,payload:UserModule){
        state.user = payload.user
        state.photo = payload.photo
    }
}
const actions = {

}

export default {
    namespace: true,
    state,
    mutation,
    actions
}
