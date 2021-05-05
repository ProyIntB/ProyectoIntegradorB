import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB6xPcFzcRkmQKhrRAN7UZ06o7BIvlsuYY",
    authDomain: "proyectointegradorb.firebaseapp.com",
    databaseURL: "https://proyectointegradorb-default-rtdb.firebaseio.com",
    projectId: "proyectointegradorb",
    storageBucket: "proyectointegradorb.appspot.com",
    messagingSenderId: "473250313960",
    appId: "1:473250313960:web:39df9cf73c4da27595fb5d"
  };

const fire = firebase.initializeApp(firebaseConfig);

   // Initialize Firebase
export default fire;