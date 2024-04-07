/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import './style.css';
import logo from './logo.svg'; 
import React, { useState } from 'react';


const Debits = ({debits, addDebit, accountBalance}) => {
  //console.log(props);
  // Declare a single state object to keep track of new form entries
  const [debitEntry, setDebitEntryVals] = useState({description: '', amount: '', date: new Date().toISOString().substring(0, 10)});
  
  // Create the list of Debit items
  let debitsView = () => {
    return debits.map((debit, index) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = debit.date.slice(0,10);
      return <li className='list' key={index}> {debit.amount} {debit.description} {date}</li>
    });
  }

  // Captures debit form values that user enters and updates state
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDebitEntryVals({...debitEntry, [event.target.name]: event.target.value});
    
  }

  // Stored user debit entry is sent to App.js
  const handleSubmit = (event) => {
    event.preventDefault() // prevent page from refreshing
    if (!(debitEntry.description === '' || debitEntry.amount === '')){
      addDebit(debitEntry) // will update debit list state in the top-level component (App.js)
    }
    let resetEntry = {description: '', amount: '', date: new Date().toISOString().substring(0, 10)};
    setDebitEntryVals(resetEntry);
  
  }

    // Render the list of Debit items and a form to input new Debit item
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
  
        <div className='container'>
          <div className='left-side'>
            <h3 style={{ fontSize: '1.5vw' }}>Account Balance: {accountBalance}</h3>
          </div>
          <h2 className='vr'>&nbsp;</h2>
          <br />
          
          <div className='right-side'>
            <h1 id='debits-title'>Debits</h1>
            <div className='d-list'>
              {debitsView()}
            </div>
  
            <form onSubmit={handleSubmit}>
              <div style={{fontWeight: 'bold'}}>
                Description:
                <input type="text" value = {debitEntry.description} name="description" onChange={handleChange}/>
                Amount:
                <input type="number" step = "any" value = {debitEntry.amount} name="amount" onChange={handleChange}/>
                <button type="submit">Add Debit</button>
              </div>
            </form>
            <br/>
            <Link to="/">Return to Home</Link>
          </div>
          </div>
      </div>
    );
  }
  
  export default Debits;