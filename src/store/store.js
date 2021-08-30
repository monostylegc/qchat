import { signupWithEmail } from "src/boot/boot";

const state = {

}

const mutations = {

}

const actions = {
    registerUser({},payload){
        console.log('hello',  payload);
        signupWithEmail({email:payload.email,password:payload.password});
    }
}

const getters = {

}

export default {
    namespaced : true,
    state, mutations, actions, getters
}