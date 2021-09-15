import React, { createContext, useState, useEffect} from 'react';
import {auth, db} from '../firebaseConfig';

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

    const cadastrar = async ({email, senha, nome, sobrenome}) => {
        await auth.createUserWithEmailAndPassword(email, senha);
        await entrar(email, senha);
        await auth.currentUser.updateProfile({
            displayName: nome
        });
        db.ref(`usuarios/${auth.currentUser.uid}`)
            .update({sobrenome:sobrenome});
    }

    const sair = () => {
        auth.signOut();
        setUsuario(null);
    }

    return (
        <AuthContext.Provider value={{
            entrar, sair, cadastrar, usuario
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;