/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import { Link } from 'react-router-dom';
import './style.css';
import logo from './logo.svg';


const Credits = ({ credits, accountBalance }) => {
  return (
    <>
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

      {/* Credit Page */}
      <div className='container'>

        <div className='left-side'>
          <h3 style={{ fontSize: '1.5vw' }}>Accont Balance: {accountBalance}</h3>
        </div>

        <h2 className='vr'></h2>
        <br />

        <div className='right-side'>
          <h1 style={{ fontSize: '2vw', textAlign: 'left' }}>Credits</h1>

          <ul>
            {credits && credits.map((item, index) => (
              <li className='list' key={index}>
                {item.amount}
                {item.description}
                {item.date}
              </li>
            ))}
          </ul>

          <Link to="/">Return to Home</Link>
        </div>
      </div>
    </>
  );
}

export default Credits;