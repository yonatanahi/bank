import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Transactions from './components/Transcations'
import './App.css';
import Operations from './components/Operations';
import SumByCategory from './components/SumByCategory';
import SortBy from './components/SortBy';

const axios = require('axios');

class App extends Component {
  constructor() {
    super()
    this.state = {
      transactions: [],
      // transactions_by_category:[],
      transactions_to_display: [],
      categories: []
    }
  }

   getTransactions = async () => {
    const response = await axios.get("http://localhost:3001/transactions")
     this.setState({ transactions: response.data })
     this.setState({ transactions_to_display: response.data })
     this.setState({categories: this.getCategories(response.data)})
  }

  // async getTransactionsByCategory() {
  //   const response = await axios.get("http://localhost:3001/transactions_by_category")
  //    this.setState({ transactions_by_category: response.data })
  // }

  async componentDidMount() {
    await this.getTransactions()
    // await this.getTransactionsByCategory()
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
    let transactions_to_display = this.state.transactions_to_display
    let balance = 0
    transactions_to_display.map(m => balance += m.amount)
    return balance
  }

  addOperation = (operation) => {
    this.postTransaction(operation)
  }

  delete = (id) => {
    this.deleteTransaction(id)
  }

   filterByMonth = (e) => {
    let month = e.target.value
    month = new Date(month)
    
    let transactions_by_month = []
    for(let t of this.state.transactions){
      if(new Date(t.date).getMonth()=== month.getMonth()){
        transactions_by_month.push(t)        
      }
    }
     this.setState({transactions_to_display: transactions_by_month})
  }

  reset = () => {
    this.setState({
      transactions_to_display: this.state.transactions
    })
  }

  getCategories = (transactions) => {
    let categories = []
    for(let t of transactions){
      if(!categories.includes(t.category)){
        categories.push(t.category)
      }
    }
    return categories
  }

  render() {
    
    return (
      
      <Router>
        <div>
          <h1>My Account</h1>
          <h2>Balance: ${this.balance()}</h2>
          <h2>Month: </h2><input type="month" onChange={this.filterByMonth}></input><button onClick={this.reset}>Reset</button><br></br>
          

          <Link to="/transactions" className="link">Transactions</Link>
          <Link to="/operations" className="link">Operations</Link>
          <Link to="/sum_by_category" className="link">Sum By Category</Link>
          {/* <Link to="/sort_by" className="link">Sort By</Link> */}


        </div>
        <Route path="/transactions" exact render={() => <Transactions transactions_to_display={this.state.transactions_to_display} delete={this.delete} transactions={this.state.transactions}/>} />
        <Route path="/sum_by_category" exact render={() => <SumByCategory transactions_to_display={this.state.transactions_to_display} categories={this.state.categories}/>} />
        <Route path="/operations" exact render={() => <Operations transactions={this.state.transactions} addOperation={this.addOperation} />} />
        {/* <Route path="/sort_by" exact render={() => <SortBy/>} /> */}
      </Router>

    );
  }
}

export default App;
