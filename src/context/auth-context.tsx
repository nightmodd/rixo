import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase-config';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    fetchSignInMethodsForEmail,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
} from 'firebase/auth';

const AuthContext = React.createContext({
    currentUser: null,
    signup: (email: string, password: string, wholeData: any) => {
        console.log('signup');
    },
    signin: (email: string, password: string) => {
        console.log('signin');
    },
    logout: () => {
        console.log('signout');
    },
    googleSignIn: () => {
        console.log('googleSignIn');
    },
});

export default AuthContext;

interface AuthContextProviderProps {
    children: React.ReactNode;
}
export const AuthContextProvider = (props: AuthContextProviderProps) => {
    const [currentUser, setCurrentUser] = useState<any>('');
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user.email);
            } else {
                setCurrentUser(null);
            }
        });
        return () => {
            unsubscribe();
        };
    }, [currentUser]);

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };

    const checkEmailExists = async (email: string) => {
        const signInMethods = await fetchSignInMethodsForEmail(auth, email);
        return signInMethods.length > 0;
    };

    const signup = async (email: string, password: string) => {
        try {
            const emailExists = await checkEmailExists(email);
            if (emailExists) {
                alert('This email already exists');
                throw TypeError('This email already exists');
            }
            return createUserWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
            alert(error.message);
        }
    };

    const signin = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = async () => {
        return signOut(auth);
    };

    const value = {
        currentUser,
        signup,
        signin,
        logout,
        googleSignIn,
    };
    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
};
