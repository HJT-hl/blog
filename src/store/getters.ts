import { UserModule } from "./module/user";

const getters = {
    user : (state:UserModule) => state.user,
    photo:(state:UserModule) => state.photo
}

export default getters
