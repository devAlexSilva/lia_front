import axios from "axios";
import { createContext, useState } from "react";
import { setCookie } from 'nookies'
import Router from 'next/router'

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
    const [user, setUser] = useState();
    
    
    const authenticate = !!user;

    async function auth({email, password}){
       const { data: {token, user} } = await axios({
            method: 'POST',
            url: 'http://localhost:4000/login',
            data: {
                email: email,
                password: password
            }

        })

        setCookie(null, 'token-lia', token, {
            maxAge: 1800 // 30 minutos
        })

        setUser(user);

        Router.push('/home');
    }
    
    return(
        <AuthContext.Provider value={{ authenticate, auth, user }}>
      {children}
    </AuthContext.Provider>
    ) 
}