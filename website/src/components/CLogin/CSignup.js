import React, { useState } from 'react';
import fire from '../../fire';
import { Link  } from 'react-router-dom';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './authForm.css'

export default function Signup() {
  const [isErrorUS, setIsErrorUS] = useState('');
  const [isErrorPS, setIsErrorPS] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  
  const clearErrors = () => {
    setIsErrorUS(false);
    setIsErrorPS(false);
  }

  const clearInputs = () => {
    setUserName("");
    setPassword("");
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
          console.log(isErrorUS)
          break;
        case "auth/weak-password":
          setIsErrorPS(err.message);
          console.log(isErrorPS)
          break;
        default:
            break
      }
    })
    clearInputs();
    window.location.reload()
  }

  return (
    <div>
        <Card>
            <Card.Body>              
                <div className="login">
                <Card.Title>Signup</Card.Title>
                    <FormControl className="input" type="username" value={userName} onChange={e => { setUserName(e.target.value)}} placeholder="email"/>
                    <FormControl className="input" type="password" value={password} onChange={e => { setPassword(e.target.value)}} placeholder="password"/>   
                    <Button variant="dark" onClick={handleSignup}>Sign in</Button>
                    <Link to="/Login">Already have an account?</Link>
                    {isErrorUS && <div className="error">The username was incorrect!</div>}
                    {isErrorPS && <div className="error">Password provided was incorrect!</div>}
                </div>
            </Card.Body>
        </Card>
    </div>
);
};