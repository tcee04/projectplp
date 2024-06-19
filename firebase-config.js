import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC3ttRuBjfsiDRdd-WnxvGtWWoLN-truDs",
    authDomain: "delivery-website-project.firebaseapp.com",
    projectId: "delivery-website-project",
    storageBucket: "delivery-website-project.appspot.com",
    messagingSenderId: "634930739033",
    appId: "1:634930739033:web:51b52e1d57031a59663e48",
    measurementId: "G-Y75BMRJ5ZG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

signInAnonymously(auth).catch((error) => {
    console.error('Error signing in anonymously:', error);
});

window.saveCartToFirestore = function(cart) {
    addDoc(collection(db, "carts"), { cart })
        .then(docRef => {
            console.log("Cart saved with ID: ", docRef.id);
        })
        .catch(error => {
            console.error("Error adding document: ", error);
        });
};
