import React, {Component} from 'react';
import fire from './fire';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import { Redirect, Route } from 'react-router-dom';
import PrivateRoute from './components/route/PrivateRoute'
import PublicRoute from './components/route/PublicRoute'

import CLogin from './components/CLogin/CLogin'
import CSignup from './components/CLogin/CSignup'
import CData from './components/CData/Cdata'
import CTodo from './components/CTodo/Ctodo'

import { isLogin, logout, refreshed, isrefresh, needToRefresh } from './utils';

class Home extends Component {
  render() {
      return (
        isLogin() ?
          <Redirect to="/todo" />
        : <Redirect to="/login" />
      )
  }
}

class App extends Component {
 
  handleLogout = () => {
    fire.auth().signOut();
    logout();
    needToRefresh();
    window.location.reload();
  }
  
  refreshed () {
    if (isrefresh() === false) {
      window.location.reload()
      refreshed()
    }
  }
 
  render() {
    console.log(isLogin())
    console.log(isrefresh())
    return (
      <Router>
        {isLogin() && this.refreshed()}
        {isLogin() ? 
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">INVYO TEST</Navbar.Brand>
            <Nav className="justify-content-end">
                <Nav.Link href="/todo">Mes Tâches</Nav.Link>
                <Nav.Link href="/data">Articles</Nav.Link>
                <Button onClick={() => this.handleLogout()}>Logout</Button>    
            </Nav>
          </Navbar>
          : <Redirect to="/login"/>
        }
        <div className="wrapper">
        <Switch>
          <PrivateRoute restricted={true} component={Home} path="/" exact/> 
            <PublicRoute restricted={false} exact path="/login" component={CLogin}/>
            <PublicRoute restricted={false} exact path="/signup" component={CSignup}/>
            <PrivateRoute path="/data" component={CData}/>
            <PrivateRoute path="/todo" component={CTodo}/>
        </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
