import React, { Component } from 'react';
import MouseOverPopover from './Popover'

class Breakdown extends Component {
    constructor() {
        super()
        this.state = {
          month: null
        }
      }

    sum = (category) => {
        let transactions = this.filterByMonth()
        let sum = 0
        for (let t of transactions) {
            if (t.category === category) {
                sum += t.amount
            }
        }
        return sum
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
        let categories = ["Clothing", "Housing", "Food", "Salary", "Other"]
        let data = categories.map(c => { return { category: c, sum: this.sum(c) } }).filter(d => d.sum !== 0)
        let transactions = this.props.transactions

        return (
            <div>
                <h3>Month:
                    <select onChange={this.setMonth} defaultValue={'DEFAULT'}>
                        <option value="DEFAULT" disabled key={0}>Select Year-Month</option>
                        {this.check_month_year(transactions).map(m => <option value={m} key={m}>{m}</option>)}
                    </select>
                    <button onClick={this.reset}>Reset</button>
                </h3>
                <table>
                    <thead><tr><td>Category</td><td>Sum</td></tr></thead>
                    <tbody>
                        {data.map(d => <tr key={data.indexOf(d)}><td>{d.category}:</td><td>{d.sum}</td></tr>)}
                    </tbody>
                </table>
                <MouseOverPopover></MouseOverPopover>
            </div>
        )
    }

}


export default Breakdown
