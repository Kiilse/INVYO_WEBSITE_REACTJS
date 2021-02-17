import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBnOEz0hDsmMXavCgw2bXI6RaX0hlqnpiM",
    authDomain: "invyo-test.firebaseapp.com",
    projectId: "invyo-test",
    storageBucket: "invyo-test.appspot.com",
    messagingSenderId: "471812972410",
    appId: "1:471812972410:web:17671c90a33936a01ec0c3"
  };

const fire = firebase.initializeApp(firebaseConfig);

export default fire;