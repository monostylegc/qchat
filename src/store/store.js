import { auth, db } from 'boot/boot';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { set, ref } from 'firebase/database';

const state = {

}

const mutations = {

}

const actions = {
    async registerUser({},payload){
        createUserWithEmailAndPassword(auth, payload.email, payload.password)
      .then((credential) => {
        const user = credential.user;
        let userID = user.uid;
        const users = ref(db, 'users/' + userID);
        set((users), {
            name: payload.name,
            email: payload.email,
            online : true
        });
        console.log(user);
      })
      .catch((error) => {
        console.error('Error ', error.message);
      });
    },

    async loginUser({}, payload){
        signInWithEmailAndPassword(auth, payload.email, payload.password)
        .then((resp)=>{
            console.log(resp);
        })
        .catch((err)=>{
            console.log(err.message);
        }) 
    }
}

const getters = {

}

export default {
    namespaced : true,
    state, mutations, actions, getters
}