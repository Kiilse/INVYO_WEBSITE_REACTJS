import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AyzaSyBn0Ez0hDsmMXavCgw2bXI6RaX0h1qnpiM",
    authDomain: "invyo-test.firebaseapp.com",
    projectId: "invyo-test",
    storageBucket: "invyo-test.appspot.com",
    messagingSenderId: "471812972410",
    appId: "1:471812972410:web:17671c90a33936a01ec0c3"
};

export const fire = firebase.initializeApp(firebaseConfig);