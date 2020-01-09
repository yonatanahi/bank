import React, { Component } from 'react';

class Breakdown extends Component {

    sum = (category) => {
        let transactions = this.props.transactions
        let sum = 0
        for (let t of transactions) {
            if (t.category === category) {
                sum += t.amount
            }
        }
        return sum
    }


    render() {
        let categories = ["Clothing", "Housing", "Food", "Salary", "Other"]
        let data = categories.map(c => { return { category: c, sum: this.sum(c) } }).filter(d => d.sum !== 0)

        return (
                <table>
                    <thead><tr><td>Category</td><td>Sum</td></tr></thead>
                    <tbody>
                        {data.map(d => <tr key={data.indexOf(d)}><td>{d.category}:</td><td>{d.sum}</td></tr>)}
                    </tbody>
                </table>
        )
    }

}


export default Breakdown
