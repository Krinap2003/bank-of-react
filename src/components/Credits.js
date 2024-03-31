/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import { Link } from 'react-router-dom';
import './style.css';
import logo from './logo.svg';
import React, { useState } from 'react';

const Credits = ({ credits, accountBalance, addCreditItem }) => {
  //Get Current Date
  const currentDate = new Date().toISOString().substring(0, 10);

  // Initialize state
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: currentDate
  });

  // Function to update form data when user inputs something
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Check the name of the input field
    if (name === 'description') {
      setFormData(prevData => ({
        ...prevData,
        description: value
      }));
    }
    else if (name === 'amount') {
      // Validate input to allow only decimal numbers or empty string
      if (/^\d*\.?\d*$/.test(value) || value === '') {
        setFormData(prevData => ({
          ...prevData,
          amount: value
        }));
      }
    }
  };

  // Function that calls the addCreditItem function in App.js once user hits the submit button
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if either description or amount is not empty
    if (formData.description.trim() !== '' && formData.amount.trim() !== '') {
      // Call the addCreditItem function passed from props with the form data
      addCreditItem(formData);
    }
    // Clear the form fields
    setFormData({
      description: '',
      amount: '',
      date: currentDate
    });
  };

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
        <h2 className='vr'>&nbsp;</h2>
        <br />

        <div className='right-side'>
          <h1 style={{ fontSize: '2vw', textAlign: 'left' }}>Credits</h1>
          {/* Display Credit List */}
          <ul>
            {credits && credits.map((item, index) => (
              <li className='list' key={index}>
                {item.amount}
                &nbsp;&nbsp;&nbsp;
                {item.description}
                &nbsp;&nbsp;&nbsp;
                {new Date(item.date).toISOString().substring(0, 10)}
              </li>
            ))}
          </ul>
          {/* Form Input Boxes */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
            />
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Amount"
            />
            <button type="submit">Add Credit</button>
          </form>

          <Link to="/">Return to Home</Link>
        </div>
      </div>
    </>
  );
}

export default Credits;