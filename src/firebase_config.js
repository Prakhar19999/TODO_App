import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyA9Ydtn0LIdHaYWnrjsLiLQbr39sI6u1sA",
    authDomain: "todo-9d37b.firebaseapp.com",
    databaseURL: "https://todo-9d37b-default-rtdb.firebaseio.com",
    projectId: "todo-9d37b",
    storageBucket: "todo-9d37b.appspot.com",
    messagingSenderId: "21634605619",
    appId: "1:21634605619:web:2792388e9eeed574257946",
    measurementId: "G-SD1KC37LQC"
  };

  firebase.initializeApp(firebaseConfig);

  const db=firebase.firestore();

  export {db}