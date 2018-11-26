import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'; //bootstrap (bundled)
import App from './App';

import firebase from 'firebase/app'
import 'firebase/auth';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCTDzxqSCqCZzGzgycdar3lZqOP7_wzHz0",
    authDomain: "info340-firebase-demo.firebaseapp.com",
    databaseURL: "https://info340-firebase-demo.firebaseio.com",
    projectId: "info340-firebase-demo",
    storageBucket: "info340-firebase-demo.appspot.com",
    messagingSenderId: "372293487980"
  };
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));