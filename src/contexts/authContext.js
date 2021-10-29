import axios from "axios";
import { createContext, useState } from "react";
import { destroyCookie, setCookie } from 'nookies'
import Router from 'next/router'

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
    const [user, setUser] = useState();


    const authenticate = !!user;

    async function auth({ email, password }) {
        const { data: { token, user } } = await axios({
            method: 'POST',
            url: 'http://localhost:4000/login',
            data: {
                email: email,
                password: password
            }

        })

        setCookie(null, 'token_lia', token, {
            maxAge: 1800 // 30 minutos
        })

        setUser(user);

        Router.push('/dashboard');
    }

    async function cancelCookie(){
        destroyCookie(null, 'token_lia');

        Router.push('/');
    }

    return (
        <AuthContext.Provider value={{ authenticate, auth, cancelCookie, user }}>
            {children}
        </AuthContext.Provider>
    )
}