/*==================================================
src/components/UserProfile.js

The UserProfile component is used to demonstrate the use of Route and Link.
Note: You don't need to work on this file for the Assignment.
==================================================*/
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './style.css';
import logo from './logo.svg';

class UserProfile extends Component {
  render() {
    return (
      <div>
        {/* Navigation Bar */}
        <div className="homeContainer">
          <nav className='nav'>
            <img src={logo} className="logo" alt="logo" />
            <Link to="/userProfile" id="link">User Profile</Link>
            <Link to="/login" id="link">Login</Link>
            <Link to="/credits" id="link">Credits</Link>
            <Link to="/debits" id="link">Debits</Link>
          </nav>
        </div>
        <h1>Login</h1>
        <h1>User Profile</h1>

        <div>Username: {this.props.userName}</div>
        <div>Member Since: {this.props.memberSince}</div>
        <br/>
        <Link to="/">Return to Home</Link>
      </div>
    );
  }
}

export default UserProfile;