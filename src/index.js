import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCUVCbfPbEHTcP45Xjc4aly2XxnAxli1eo',
    authDomain: 'cfbookmentor.firebaseapp.com',
    projectId: 'cfbookmentor',
    databaseURL:
        'https://cfbookmentor-default-rtdb.europe-west1.firebasedatabase.app/',
    storageBucket: 'cfbookmentor.appspot.com',
    messagingSenderId: '229496005028',
    appId: '1:229496005028:web:76579244b94ca14f45e131',
}

firebase.initializeApp(firebaseConfig)

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
