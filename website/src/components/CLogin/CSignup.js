import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import {useAuth} from "../../context/auth"
import './authForm.css'

export default function Signup() {
  const [isSignup, setSignup] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const {setAuthTokens} = useAuth();
  
  function postLogin() {
    axios.post("https://www.somePlace.com/auth/signup", {
      userName, 
      password
    }).then(result => {
      if (result.status === 200) {
        setAuthTokens(result.data);
        setSignup(true);
      } else {
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    });
  }

  if (isSignup) {
    return <Redirect to="/" />;
  }

  return(
    <div className="card">
      <div className="form">
        <input className="input" type="username" value={userName} onChange={e => { setUserName(e.target.value)}} placeholder="email"/>
        <input className="input" type="password" value={password} onChange={e => { setPassword(e.target.value)}} placeholder="password"/>
        <input className="input" type="password Confirmation" value={passwordConfirm} onChange={e => { setPasswordConfirm(e.target.value)}} placeholder="password Confirmation"/>
        <button onClick={postLogin}>Sign in</button>
      </div>
      <Link to="/login">Already have an account?</Link>
      {isError && <div className="error">The username or password provided was incorrect!</div>}
    </div>
  );
}