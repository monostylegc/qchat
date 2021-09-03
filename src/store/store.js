import { auth, db } from 'boot/boot';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged,signOut } from 'firebase/auth';
import { set, ref, onValue, update, onChildAdded, onChildChanged, off, push } from 'firebase/database';
import Vue from 'vue';

let messagesRef;

const state = {
    userDetails : {},
    users: {},
    messages: {},
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
    },
    addMessages(state, payload){
        Vue.set(state.messages, payload.messageID, payload.messageDetails)
    },
    clearMessages(state){
        state.messages = {}
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
            console.log(resp);
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
            else {
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
    },

    firebaseGetMessages({ commit, state }, otherUserID){
        let userID = state.userDetails.userID;
        messagesRef =ref(db, 'chats/'+userID+'/'+otherUserID);
        onChildAdded(messagesRef, snapshot=>{
            let messageDetails = snapshot.val();
            let messageID = snapshot.key;
            
            commit('addMessages',{
                messageID,
                messageDetails
            })
        })
    },
    firebaseStopGettingMessages({ commit }){
        if(messagesRef){
            off(messagesRef)
            commit('clearMessages')
        }
        
    },
    firebaseSendMessages({}, payload){
        push(ref(db, 'chats/'+state.userDetails.userID+'/'+payload.otherUserID), payload.message)

        payload.message.from = 'them'
        push(ref(db, 'chats/'+payload.otherUserID+'/'+state.userDetails.userID), payload.message)
    }
}

const getters = {
    
    users: state=>{
        let userFiltered ={};
        Object.keys(state.users).forEach(key=>{
            if(key!== state.userDetails.userID && key !== 'undefined'){
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