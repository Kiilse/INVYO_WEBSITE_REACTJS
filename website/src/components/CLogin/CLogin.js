import React, { useState, useEffect } from 'react';
import fire from '../../fire';
import { Link, Redirect } from 'react-router-dom';
import './authForm.css'


export default function Login(props) {
  const {user, setUser} = props
  const [isErrorUS, setIsErrorUS] = useState(false);
  const [isErrorPS, setIsErrorPS] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const clearErrors = () => {
    setIsErrorUS(false);
    setIsErrorPS(false);
  }

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(userName, password)
      .catch(err => {
        switch(err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setIsErrorUS(true);
            break;
          case "auth/wrong-password":
            setIsErrorPS(true);
            break;
          default:
            break  
        }
      })
  }

  const authListener = () => {
    console.log(user)
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(true);
      } else {
        setUser(false);
      }
    })
  }

  useEffect(() => {
    authListener();
  }, [])

  return(
    <div className="card">
      <div className="form">
        <input className="input" type="username" value={userName} onChange={e => { setUserName(e.target.value)}} placeholder="email"/>
        <input className="input" type="password" value={password} onChange={e => { setPassword(e.target.value)}} placeholder="password"/>
        <button onClick={handleLogin}>Sign in</button>
      </div>
      <Link to="/signup">Don't have an account?</Link>
      {isErrorUS && <div className="error">The username or password provided was incorrect!</div>}
      {isErrorPS && <div className="error">The username or password provided was incorrect!</div>}
      {user && <Redirect to="/data" />}
    </div>
  );
}