import React, { useState } from 'react';
import fire from './fire';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import PrivateRoute from './Route/PrivateRoute'
import CDashboard from './components/CDashboard/CDashboard'
import CLogin from './components/CLogin/CLogin'
import CSignup from './components/CLogin/CSignup'
import CData from './components/CData/Cdata'
import CTodo from './components/CTodo/Ctodo'

export default function App() { 
  const [user, setUser] =useState(false);

  const handleLogout = () => {
    fire.auth().signOut().then( () => {
      setUser(false)
    })
    .catch(error => console.log('Error: ', error));
  }
  return (
      <Router>     
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">INVYO TEST</Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Link href="/data">Data</Nav.Link>
            <Nav.Link href="/todo">Todo</Nav.Link>
            <Button onClick={handleLogout}>Logout</Button>
          </Nav>
        </Navbar>
        <div className="wrapper">
          <Switch>
            <Route exact path="/login">
              <CLogin user={user} setUser={setUser}/>
            </Route>
            <Route exact path="/signup" component={CSignup}/>
            <Route path="/data">
              <CData user={user}/>
            </Route>
            <Route path="/todo">
              <CTodo user={user} setUser={setUser}/>
            </Route>
          </Switch>
        </div>
      </Router>
  );
}