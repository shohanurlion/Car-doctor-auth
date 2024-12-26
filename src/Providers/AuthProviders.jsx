import { createContext, useEffect, useState } from "react"
import { auth } from "../firebase.init";
import { createUserWithEmailAndPassword , onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const AuthContext = createContext(null);
const AuthProviders = ({children}) => {
  const [user , setuser]=useState(null);
  const [loading, setLoading] = useState(true);
  const creatUser = (email ,password)=>{
    setLoading(true);
    return createUserWithEmailAndPassword(auth ,email ,password)
  };

  const singOutuser = ()=>{
    setLoading(true);
    return signOut(auth)
  };
  const sigInuser = (email , password)=>{
    setLoading(true);
    return signInWithEmailAndPassword(auth , email , password)
  }

  useEffect(()=>{
    const unSubscribe = onAuthStateChanged(auth , currentuser =>{
      // console.log('currentuser ', currentuser);
      setuser(currentuser);
      setLoading(false);
    })
    return () => {
      unSubscribe();
  }
  },[])
const allInfo = {
  user,
  loading,
  creatUser,
  singOutuser,
  sigInuser
}
  return (
   <AuthContext.Provider value={allInfo}>
    {children}
   </AuthContext.Provider>
  )
}

export default AuthProviders