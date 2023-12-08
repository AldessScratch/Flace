// FIREBASE

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8i9HXiWElS_KR5wvaAcZ6Je798tq7S_8",
  authDomain: "flacecards.firebaseapp.com",
  projectId: "flacecards",
  storageBucket: "flacecards.appspot.com",
  messagingSenderId: "796361712607",
  appId: "1:796361712607:web:4a20ac6f4b19e93b915a6a",
  measurementId: "G-EEYSL6CXVF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Service Worker pour que flace marche hors connexion
if (navigator.serviceWorker){
 navigator.serviceWorker.register('../sw.js');
}
   

    if (localStorage.getItem("theme")===null){
      localStorage.setItem("theme", "auto")
      location.href = './'
    }

// Script voice


function readtext(){
        
  if (sessionStorage.getItem('api')==='lv1'){
    responsiveVoice.speak(`${localStorage.getItem('popupcontent')}`)
  }
  else{
    responsiveVoice.speak(`${localStorage.getItem('popupcontent')}`, 'French Female')
  }
}