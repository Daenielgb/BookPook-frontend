import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext)
}

const googleProvider = new GoogleAuthProvider();

// authProvider
export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //register a user
  const registerUser = async (email,password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  }

  //login a user
  const loginUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)

  }

  // sign up with google 
  const signInWithGoogle = async () => {
    return await signInWithPopup(auth, googleProvider)

  }

  // logout the user
  const logout = () => {
    return signOut(auth)
  }

  // manage user 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);

      if(user) {
        const {email, displayName, photoURL} = user;
        const userData = {
          email, username: displayName, photo: photoURL
        }
      }
    })

    return () => unsubscribe();
  }, [])







  const value = {
    currentUser,
    loading,
    registerUser,
    loginUser,
    signInWithGoogle,
    logout
  }
  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}












/*// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../supabase/supabase.config'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for changes in auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const registerUser = (email, password) =>
    supabase.auth.signUp({ email, password })

  const login = (email, password) =>
    supabase.auth.signInWithPassword({ email, password })

  const logout = () => supabase.auth.signOut()

  const value = {
    session,
    user,
    loading,
    registerUser,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
*/