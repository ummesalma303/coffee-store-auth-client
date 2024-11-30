import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import Swal from 'sweetalert2';

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    // state
    const [loader,setLoader]=useState(false)
    const [user,setUser]=useState('')

    const createUser=( email, password)=>{
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

// sign in user
    const signInUser=(email, password)=>{
        setLoader(true)
       return signInWithEmailAndPassword(auth, email, password)
    }



// sign out user
const signOutUser=()=>{
    setLoader(true)

    signOut(auth).
    then((res) => {
       
        Swal.fire({
            title: "Sign Out",
            text: "Successfully signout user",
            icon: "success"
          });
      }).catch((error) => {
      
      });
}
    useEffect(()=>{
        const subscribe= onAuthStateChanged(auth,user=>{
            setLoader(false)
            setUser(user)
        })
        return ()=> subscribe()
    },[])



    const info ={
        createUser,
        signInUser,
        user,
        setUser,
        signOutUser,
        loader
    }
    return (
        <div>
            <AuthContext.Provider value={info}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;