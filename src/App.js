/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';
import axios from 'axios';
import { useState } from 'react/cjs/react.development';

class App extends Component {
  constructor() {  // Create and initialize state
    super();
    this.state = {
      accountBalance: 0,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser })
  }

  // Function to fetch credit list from API and update state
  fetchCreditList = () => {
    axios.get('https://johnnylaicode.github.io/api/credits.json')
      .then(response => {
        // Assuming the response data is an array of credit items
        const newCreditList = response.data;
        this.setState({ creditList: newCreditList });

        const totalCredits = this.calculateTotalCredits(newCreditList); // Calculate total credits
        this.setState({ newCreditList, accountBalance: totalCredits }); // Update state with credits and account balance
      })
      .catch(error => {
        console.error('Error fetching credit list:', error);
      });
  }

  async fetchDebitList() {
    // Await for promise (completion) returned from API call
    try {  // Accept success response as array of JSON objects (users)
      let response = await axios.get('https://johnnylaicode.github.io/api/debits.json');
      //console.log(response);  // Print out response
      
      let updatedBalance = (this.state.accountBalance - this.calculateTotalDebits(response.data));
      this.updateAccountBalance(updatedBalance);

      this.setState({debitList: response.data});  // Store received debit list in the state
    } 
    catch (error) {  // Print out errors at console when there is an error response
      console.log('Error fetching debit list:', error);   
    }
  }

  // Function to update account balance with new balance.
  updateAccountBalance = (newBalance) => {
    this.setState({ accountBalance: newBalance });
  }

  // Function to calculate the total number of credits for each credit on the list
  calculateTotalCredits = (credits) => {
    let total = 0;
    for (const credit of credits) {
      total += credit.amount;
    }
    return total;
  }

  // Function to update the creditList state and accountBalance state after a user adds a new credit to the list
  addCreditItem = (newItem) => {
    this.setState(prevState => ({
      creditList: [...prevState.creditList, newItem]
    }));
    // Calculate new balance after a new credit is added
    const newBalance = parseFloat((this.state.accountBalance + parseFloat(newItem.amount)).toFixed(2));
    this.setState({ accountBalance: newBalance });
  };


  // Calculate total number of debits in user account
  calculateTotalDebits = (debits) => {
    let totalDebits = 0;
    for(const debit of debits) {
      totalDebits += debit.amount;
    }

    return totalDebits;
  }

  adjustDebitBalance = (newAmount) => {
    let balance = (this.state.accountBalance) - newAmount;
    balance = Math.round(balance * 100)/100;
    this.setState({ accountBalance: balance });
  }

  addDebit = (debitEntry) => {
    debitEntry.amount = (Math.round(debitEntry.amount * 100)/100);
    this.setState(prevState => ({
      debitList: [...prevState.debitList, debitEntry]
    }))
    this.adjustDebitBalance(debitEntry.amount);
  }

  componentDidMount() {
    // Fetch credit list when component mounts
    this.fetchCreditList();
    // Fetch account balance when component mounts
    this.updateAccountBalance(0);
    // Fetch debit list when component mounts
    this.fetchDebitList();
  }

  // Create Routes and React elements to be rendered using React components
  render() {
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits credits={this.state.creditList} accountBalance={this.state.accountBalance} addCreditItem={this.addCreditItem} />)
    const DebitsComponent = () => (<Debits debits={this.state.debitList} addDebit={this.addDebit} accountBalance={this.state.accountBalance}/>)

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/bank-of-react">
        <div>
          <Route exact path="/" render={HomeComponent} />
          <Route exact path="/userProfile" render={UserProfileComponent} />
          <Route exact path="/login" render={LogInComponent} />
          <Route exact path="/credits" render={CreditsComponent} />
          <Route exact path="/debits" render={DebitsComponent} />
        </div>
      </Router>
    );
  }
}

export default App;