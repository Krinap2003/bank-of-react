/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import './style.css';
import logo from './logo.svg';

const Debits = (props) => {
  console.log(props.accountBalance);
  // Create the list of Debit items
  let debitsView = () => {
    const { debits } = props;
    return debits.map((debit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = debit.date.slice(0,10);
      return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>
    });
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

      <form onSubmit={props.addDebit}>
        <input type="text" name="description" />
        <input type="number" name="amount" />
        <button type="submit">Add Debit</button>
      </form>
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Debits;