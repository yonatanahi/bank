import React, { Component } from 'react';

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
        let category_transactions = []
        for (let t of transactions) {
            if (t.category === category) {
                sum += t.amount
                category_transactions.push(t)
            }
        }
        return { sum, category_transactions }
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
        if (this.state.month === null) { return this.props.transactions }

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
        let data = categories.map(c => { return { category: c, sum: this.sum(c).sum, transactions: this.sum(c).category_transactions } }).filter(d => d.sum !== 0)
        console.log(data);

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
                <h4><span>Category</span><span>Sum</span></h4>
                <div className="container">{data.map(d => <div key={data.indexOf(d)} className="tooltip category"><span>{d.category}:</span><span>{d.sum}</span><div className="tooltiptext">{d.transactions.map(t => <div ><span>Vendor: {t.vendor}</span><span>Amount: {t.amount}</span><span>Date: {t.date.slice(0, 10)}</span></div>)}</div></div>)}</div>
            </div>
        )
    }

}


export default Breakdown
