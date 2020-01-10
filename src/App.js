import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Transactions from './components/Transcations'
import './App.css';
import Operations from './components/Operations';
import Breakdown from './components/Breakdown';
import SimpleSnackbar from './components/Snackbar'


const axios = require('axios');

class App extends Component {
  constructor() {
    super()
    this.state = {
      transactions: [],
      status: null
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

  addOperation = async (operation) => {      
    await this.setState({status: null})  
    if (Object.values(operation).some(v => v === null)) {
       this.setState({status: "empty"})
    } else if(this.balance() + operation.amount < 500){
       this.setState({status: "insufficient"})
    }else{
      this.postTransaction(operation)
      this.setState({status: "success"})
    }
  }

  delete = (id) => {
    this.deleteTransaction(id)
  }

  resetStatus = () => {
    this.setState({status: null})
  }

  render() {
    return (

      <Router>
          <h2>Expense Tracker</h2>
          <h3>Balance: <span className={this.balance() > 500 ? "green" : 'red'}>${this.balance()}</span></h3>

          <Link to="/transactions" className="link">Transactions</Link>
          <Link to="/operations" className="link">Operations</Link>
          <Link to="/breakdown" className="link">Breakdown</Link>
          
          {this.state.status === "success" ? <SimpleSnackbar message="Expense was added!"/> : null}
          {this.state.status === "empty" ? <SimpleSnackbar message="Empty fields are not allowed!"/> : null}
          {this.state.status === "insufficient" ? <SimpleSnackbar message="Insufficient Funds"/> : null}

        <Route path="/" exact render={() => <Transactions transactions={this.state.transactions} delete={this.delete}/>} />
        <Route path="/transactions" exact render={() => <Transactions transactions={this.state.transactions} delete={this.delete}/>} />
        <Route path="/breakdown" exact render={() => <Breakdown transactions={this.state.transactions} />} />
        <Route path="/operations" exact render={() => <Operations addOperation={this.addOperation} />} />
      </Router>

    );
  }
}

export default App;
