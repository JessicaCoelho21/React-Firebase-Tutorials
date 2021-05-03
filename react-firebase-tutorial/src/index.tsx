import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase/app";
import "firebase/firestore";

let config = {
  apiKey: "AIzaSyDa9uWQosTODdmiT47pk92ltb-9prOSK7c",
  authDomain: "react-firebase-tutorial-6a9ce.firebaseapp.com",
  //projectId: "react-firebase-tutorial-6a9ce",
  databaseURL:
    "https://react-firebase-tutorial-6a9ce-default-rtdb.firebaseio.com/",
  storageBucket: "react-firebase-tutorial-6a9ce.appspot.com",
  messagingSenderId: "987401070225",
  //appId: "1:987401070225:web:80a756ae073ffd90898130",
  //measurementId: "G-DZM1C4J71V"
};

firebase.initializeApp(config);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
