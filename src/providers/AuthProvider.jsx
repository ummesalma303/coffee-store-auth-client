import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

export const AuthContext = createContext('null')

const AuthProvider = ({children}) => {
    // state
    const [loader,setLoader]=useState(false)

    const createUser=( email, password)=>{
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }


    const signInUser=(email, password)=>{
        setLoader(true)
       return signInWithEmailAndPassword(auth, email, password)
    }


    useEffect(()=>{
        setLoader(true)
        const subscribe= onAuthStateChanged(auth,user=>{
            console.log(user)
        })
        return ()=> subscribe()
    },[])



    const info ={
        createUser,
        signInUser
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