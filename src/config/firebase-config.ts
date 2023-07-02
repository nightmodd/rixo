import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const config = {
    firebaseConfig: {
        apiKey: 'AIzaSyBCDR7NnxwdTs24vDBRn-yXy6qCIHZMTZM',
        authDomain: 'rixo-7f094.firebaseapp.com',
        projectId: 'rixo-7f094',
        storageBucket: 'rixo-7f094.appspot.com',
        messagingSenderId: '213168493946',
        appId: '1:213168493946:web:b173966d6d180d297732c3',
    },
};
export const app = initializeApp(config.firebaseConfig);
export const auth = getAuth(app);
