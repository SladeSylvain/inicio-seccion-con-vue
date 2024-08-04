import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyCmy-r4TH8NABeidEhJ5KZq8YpBlgLtO2o",
    authDomain: "proyectofinal-938c3.firebaseapp.com",
    projectId: "proyectofinal-938c3",
    storageBucket: "proyectofinal-938c3.appspot.com",
    messagingSenderId: "1054481933322",
    appId: "1:1054481933322:web:5af0c23ce54ea7650f6bf3",
    measurementId: "G-5CSTMK2KFX"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta los servicios de Firebase que necesitas
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
