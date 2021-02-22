import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import fire from '../../fire';
import { login, isLogin, logout } from '../../utils'
import { Redirect} from 'react-router-dom';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './authForm.css'

const Login = (props) => {
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
                    logout()
                    return
                
                case "auth/wrong-password":
                    setIsErrorPS(true);
                    logout()
                    return
                default:
                    break
                }
            }
        )
        login();
        window.location.reload()
    }

    return (
        <div>
        {isLogin() ?
        <Redirect to="/todo" /> 
        : 
            <Card>
                <Card.Body>
                    <div className="login">
                    <Card.Title>LogIn</Card.Title>
                        <FormControl className="input" type="username" value={userName} onChange={e => { setUserName(e.target.value)}} placeholder="email"/>
                        <FormControl className="input" type="password" value={password} onChange={e => { setPassword(e.target.value)}} placeholder="password"/>   
                        <Button variant="dark" onClick={handleLogin}>Sign in</Button>
                        <Link to="/signup">Don't have an account?</Link>
                        {isErrorUS && <div className="error">The username was incorrect!</div>}
                        {isErrorPS && <div className="error">Password provided was incorrect!</div>}
                    </div>
                </Card.Body>
            </Card>
        }
        </div>
    );
};

export default Login;