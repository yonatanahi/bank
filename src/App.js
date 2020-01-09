import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Transactions from './components/Transcations'
import './App.css';
import Operations from './components/Operations';
import Breakdown from './components/Breakdown';


const axios = require('axios');

class App extends Component {
  constructor() {
    super()
    this.state = {
      transactions: []
    }
  }

  getTransactions = async () => {
    const response = await axios.get("http://localhost:3001/transactions")
    this.setState({ transactions: response.data})
  }

  componentDidMount() {
    this.getTransactions()
  }

  async postTransaction(operation) {
    await axios.post("http://localhost:3001/transaction", operation)
    this.getTransactions()
  }

  async deleteTransaction(id) {
    await axios.delete("http://localhost:3001/transaction", { data: { id: id } })
    this.getTransactions()
  }

  balance = () => {
    let balance = 0
    this.state.transactions.forEach(m => balance += m.amount)
    return balance
  }

  addOperation = (operation) => {        
    if (Object.values(operation).some(v => v === null)) {
      alert("Empty fields are not allowed!")
    } else {
      this.postTransaction(operation)
    }
  }

  delete = (id) => {
    this.deleteTransaction(id)
  }

  render() {

    return (

      <Router>
          <h1>Expense Tracker</h1>
          <h2>Balance: <span className={this.balance() > 500 ? "green" : 'red'}>${this.balance()}</span></h2>

          <Link to="/transactions" className="link">Transactions</Link>
          <Link to="/operations" className="link">Operations</Link>
          <Link to="/breakdown" className="link">Breakdown</Link>
          
        <Route path="/" exact render={() => <Transactions transactions={this.state.transactions} delete={this.delete}/>} />
        <Route path="/transactions" exact render={() => <Transactions transactions={this.state.transactions} delete={this.delete}/>} />
        <Route path="/breakdown" exact render={() => <Breakdown transactions={this.state.transactions} />} />
        <Route path="/operations" exact render={() => <Operations addOperation={this.addOperation} />} />
      </Router>

    );
  }
}

export default App;
