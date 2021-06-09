import { computed } from 'vue';
import { useStore} from 'vuex'
import { UserModule } from '../../store/module/user';

export function useUser(){
    const store = useStore();
    const user = computed(()=>{
        return {
            user : store.state.user,
            photo:store.state.photo
        }
    })
    const setUser = (payload:UserModule)=> {
        store.commit('SET_USER_USER', payload.user)
        store.commit('SET_USER_PHOTO', payload.photo)
    }

    return {
        user,
        setUser,
    }
}
