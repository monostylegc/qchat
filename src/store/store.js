import firebase  from 'boot/firebase';

const state = {

}

const mutations = {

}

const actions = {
    registerUser({},payload){
        console.log('hello',  payload);
        firebase.auth()
        .createUseWithEmailAndPassword(payload.email,payload.password)
        .then(response=>{console.log(response)})
        .catch(err=>{console.log(err)});
    }
}

const getters = {

}

export default {
    namespaced : true,
    state, mutations, actions, getters
}