import React, { Component } from 'react';
import Transaction from './Transction';

class Transactions extends Component {
    constructor() {
        super()
        this.state = {
          month: null
        }
      }

    reset = () => {
        this.setState({ month: null })
    }


    check_month_year = (transactions) => {
        let month_year = [...new Set(transactions.map(t => t.date.slice(0, 7)))]
        return month_year
    }

    setMonth = (e) => {
        let month = e.target.value
        month = new Date(month)
        this.setState({ month })
    }

    filterByMonth = () => {
        if(this.state.month === null){return this.props.transactions}
    
        let transactions_by_month = []
        for (let t of this.props.transactions) {
          if (new Date(t.date).getMonth() === this.state.month.getMonth()) {
            transactions_by_month.push(t)
          }
        }
        return transactions_by_month
      }

    render() {
        let transactions = this.props.transactions

        return (
            <div>
                <h4>Month:
                    <select onChange={this.setMonth} defaultValue={'DEFAULT'}>
                        <option value="DEFAULT" disabled key={0}>Select Year-Month</option>
                        {this.check_month_year(transactions).map(m => <option value={m} key={m}>{m}</option>)}
                    </select>
                    <button onClick={this.reset}>Reset</button>
                </h4>
            < table >
                    <thead><tr><td>Amount</td><td>Vendor</td><td>Category</td><td>Date</td></tr></thead>
                    <tbody>{this.filterByMonth().map(t => <Transaction key={t._id} transaction={t} delete={this.props.delete} />)}</tbody>
                </table >
            </div>

        )
    }

}

export default Transactions