import React, { useEffect, useState } from 'react';

import { auth } from '../config/firebase-config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  fetchSignInMethodsForEmail,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';

const AuthContext = React.createContext({
  currentUser: null,
  signup: (email: string, password: string, userName: string): Promise<any> => {
    console.log(email + '\n' + password + '\n' + userName);
    return Promise.resolve();
  },
  signin: (email: string, password: string): Promise<any> => {
    console.log(email + '\n' + password);
    return Promise.resolve();
  },
  logout: () => {
    console.log('signout');
  },
  googleSignIn: (): Promise<void> => {
    return Promise.resolve();
  },
});

export default AuthContext;

interface AuthContextProviderProps {
  children: React.ReactNode;
}
export const AuthContextProvider = (props: AuthContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<any>('');

  /*   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user.displayName);
      } else {
        setCurrentUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [currentUser]); */

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
      .then(async (userCredential) => {
        const user = userCredential.user;
        if (user) {
          updateProfile(user, {
            displayName: user.displayName,
          });
        }
        setCurrentUser(user.displayName);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const checkEmailExists = async (email: string) => {
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    return signInMethods.length > 0;
  };

  const signup = async (email: string, password: string, userName: string) => {
    try {
      const emailExists = await checkEmailExists(email);
      if (emailExists) {
        alert('This email already exists');
        throw TypeError('This email already exists');
      }
      return createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          setCurrentUser(userName);
          const user = userCredential.user;
          updateProfile(user, {
            displayName: userName,
          });
        }
      );
    } catch (error: any) {
      alert(error.message);
    }
  };

  const signin = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const user = userCredential.user;
        setCurrentUser(user?.displayName);
      }
    );
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
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
