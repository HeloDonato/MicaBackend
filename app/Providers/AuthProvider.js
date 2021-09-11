import React, { createContext, useState, useEffect} from 'react';
import {auth} from '../firebaseConfig';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [usuario, setUsuario] = useState(null);

    useEffect(  () => {
        auth.onAuthStateChanged(usuario => {
            setUsuario(usuario);
        })
    }, []);

    const entrar = async (usuario, senha) => {
        const credenciais = await auth.signInWithEmailAndPassword(usuario, senha);
            setUsuario(credenciais.user),
            console.log(credenciais.user);
    }

    const sair = () => {
        auth.signOut();
        setUsuario(null);
    }

    return (
        <AuthContext.Provider value={{
            entrar, sair, usuario
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;