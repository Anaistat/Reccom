import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDg7MC6xojcZPBsdyi8GcwxVpH2bORDQYU",
    authDomain: "recommendationsystem-15ab6.firebaseapp.com",
    projectId: "recommendationsystem-15ab6",
    storageBucket: "recommendationsystem-15ab6.appspot.com",
    messagingSenderId: "72105957508",
    appId: "1:72105957508:web:40a6c35cb94fb1f8048ad1",
    measurementId: "G-TG8ZHNB1P0"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

