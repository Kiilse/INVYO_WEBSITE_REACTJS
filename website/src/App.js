import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import PrivateRoute from './Route/PrivateRoute'
import CDashboard from './components/CDashboard/CDashboard'
import CLogin from './components/CLogin/CLogin'
import CSignup from './components/CLogin/CSignup'
import CData from './components/CData/Cdata'
import CTodo from './components/CTodo/Ctodo'

import {AuthContext} from './context/auth'

export default function App() {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={{authTokens, setAuthTokens: setTokens}} >
      <Router>     
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">INVYO TEST</Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/data">Data</Nav.Link>
            <Nav.Link href="/todo">Todo</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Navbar>
        <div className="wrapper">
          <Switch>
            <Route exact path="/" component={CDashboard}/>
            <Route exact path="/login" component={CLogin}/>
            <Route exact path="/signup" component={CSignup}/>
            <PrivateRoute path="/data" component={CData}/>
            <PrivateRoute path="/todo" component={CTodo}/>
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}