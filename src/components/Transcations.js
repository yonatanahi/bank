import React, { Component } from 'react';
import Transaction from './Transction';

class Transactions extends Component {

    render() {
        let transactions = this.props.transactions
        
        return (
            <table>
                <thead><tr><td>Amount</td><td>Vendor</td><td>Category</td><td>Date</td></tr></thead>
                <tbody>{transactions.map(t => <Transaction key={t._id} transaction={t} delete={this.props.delete} />)}</tbody>
            </table>
        )
    }

}

export default Transactions