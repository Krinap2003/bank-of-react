/*==================================================
src/components/Home.js

The Home component is used to demonstrate the use of Link.
==================================================*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import logo from './logo.svg';
import AccountBalance from './AccountBalance';

class Home extends Component {
  render() {
    return (
      <div className="homeContainer">
        <nav className='nav'>
          <img src={logo} className="logo" alt="logo" />
          <Link to="/userProfile" id="link">User Profile</Link>
          <Link to="/login" id="link">Login</Link>
          <Link to="/credits" id="link">Credits</Link>
          <Link to="/debits" id="link">Debits</Link>
        </nav>
        <p id="welcome">Welcome to Bank of React</p>
        <img src={logo} className="App-logo" alt="logo" />
        <AccountBalance accountBalance={this.props.accountBalance} />
      </div>
    )
  }
}

export default Home;