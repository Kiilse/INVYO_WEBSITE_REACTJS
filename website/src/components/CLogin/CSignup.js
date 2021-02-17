import React, { useState } from 'react';
import fire from '../../fire';
import { Link, Redirect } from 'react-router-dom';
import {useAuth} from "../../context/auth"
import './authForm.css'

export default function Signup() {
  const [isSignup, setSignup] = useState(false);
  const [isErrorUS, setIsErrorUS] = useState(false);
  const [isErrorPS, setIsErrorPS] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const {setAuthTokens} = useAuth();
  
  const clearErrors = () => {
    setIsErrorUS(false);
    setIsErrorPS(false);
  }

  const handleSignup = () => {
    clearErrors();
    fire
    .auth()
    .createUserWithEmailAndPassword(userName, password)
    .catch(err => {
      switch(err.code) {
        case "auth/email-already-use":
        case "auth/invalid-email":
          setIsErrorUS(err.message);
          break;
        case "auth/weak-password":
          setIsErrorPS(err.message);
          break;
        default:
            break
      }
    })
  }

  if (isSignup) {
    return <Redirect to="/login" />;
  }

  return(
    <div className="card">
      <div className="form">
        <input className="input" type="username" value={userName} onChange={e => { setUserName(e.target.value)}} placeholder="email"/>
        <input className="input" type="password" value={password} onChange={e => { setPassword(e.target.value)}} placeholder="password"/>
        <input className="input" type="password Confirmation" value={passwordConfirm} onChange={e => { setPasswordConfirm(e.target.value)}} placeholder="password Confirmation"/>
        <button onClick={handleSignup}>Sign in</button>
      </div>
      <Link to="/login">Already have an account?</Link>
      {isErrorUS && <div className="error">The username or password provided was incorrect!</div>}
      {isErrorPS && <div className="error">The username or password provided was incorrect!</div>}
    </div>
  );
}