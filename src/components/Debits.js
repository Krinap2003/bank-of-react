

/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import './style.css';
import logo from './logo.svg'; 
import React, { useState } from 'react';


const Debits = (props) => {
  //console.log(props);
  // Declare a single state object to keep track of new form entries
  const [debitEntry, setDebitEntryVals] = useState({description: '', amount: '', date: new Date().toISOString().substring(0, 10)});
  
  // Create the list of Debit items
  let debitsView = () => {
    const { debits } = props;
    return debits.map((debit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = debit.date.slice(0,10);
      return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>
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
    props.addDebit(debitEntry) // will update debit list state in the top-level component (App.js)
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
      <h1>Debits</h1>
      <h2>Account Balance: {props.accountBalance}</h2>

      {debitsView()}

      <form onSubmit={handleSubmit}>
        <input type="text" value = {debitEntry.description} placeholder = "Description" name="description" onChange={handleChange}/>
        <input type="number" value = {debitEntry.amount} placeholder = "Amount" name="amount" onChange={handleChange}/>
        <button type="submit">Add Debit</button>
      </form>
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Debits;