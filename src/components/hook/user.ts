import { computed } from 'vue';
import { useStore} from 'vuex'
import { User } from '../../type/user'

export function useUser(){
    const store = useStore();
    const user = computed(()=>{
        return {
            user : store.state.user,
            photo:store.state.photo
        }
    })
    const setUser = (payload:Pick<User,"user"|"photo" >)=> {
        store.commit('SET_USER_USER', payload.user)
        store.commit('SET_USER_PHOTO', payload.photo)
    }
    const setPhoto = (payload:string)=>{
        store.commit('SET_USER_PHOTO', payload)
    }

    return {
        user,
        setUser,
        setPhoto
    }
}
