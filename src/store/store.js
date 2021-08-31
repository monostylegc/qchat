import { auth, db } from 'boot/boot';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged,signOut } from 'firebase/auth';
import { set, ref, onValue, update, onChildAdded, onChildChanged } from 'firebase/database';
import Vue from 'vue';


const state = {
    userDetails : {},
    users:{}
}

const mutations = {
    setUserDetails(state, payload){
        state.userDetails = payload;
    },
    addUser(state, payload){
        Vue.set(state.users, payload.userID, payload.userdetail);
    },
    updateUser(state, payload){
        Object.assign(state.users[payload.userID], payload.userDetails)
    }
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
            
        })
        .catch((err)=>{
            console.log(err.message);
        }) 
    },
    logoutUser(){
        signOut(auth);
    },
    handleAuthStateChange({ commit, dispatch, state }){
        onAuthStateChanged(auth, user=>{
            if(user)
            {
                let userID = user.uid;
                let userdb = ref(db, 'users/'+userID)
                onValue(userdb, (snapshot) => {
                    const userdetail = snapshot.val();
                    commit('setUserDetails', {
                        name : userdetail.name,
                        email : userdetail.email,
                        userID : userID,
                    })
                });
                dispatch('firebaseUpdateUser',{
                    userID : userID,
                    updates: {
                        online : true
                    }
                });
                dispatch('firebaseGetUser');
                this.$router.push('/');
            }
            else{
                 dispatch('firebaseUpdateUser',{
                    userID : state.userDetails.userID,
                    updates: {
                        online : false
                    }
                });
                commit('setUserDetails', {});
               
                this.$router.replace('/auth');
            }
        });
    },

    firebaseUpdateUser({}, payload){
        update(ref(db, 'users/'+ payload.userID), payload.updates);
    },

    firebaseGetUser({commit}){
        let users = ref(db, 'users');
        onChildAdded(users, snapshot=>{
            let userdetail = snapshot.val();
            let userID = snapshot.key;
            commit('addUser', {
                userID,
                userdetail
            })
        });
        onChildChanged(users, snapshot=>{
            let userdetail = snapshot.val();
            let userID = snapshot.key;
            commit('addUser', {
                userID,
                userdetail
            })
        });
    }
}

const getters = {
    
    users: state=>{
        let userFiltered ={};
        Object.keys(state.users).forEach(key=>{
            if(key!== state.userDetails.userID){
                userFiltered[key] = state.users[key]
            }
        })
        return userFiltered
    }
}

export default {
    namespaced : true,
    state, mutations, actions, getters
}