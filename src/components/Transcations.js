import React, { Component } from 'react';
import Transaction from './Transction';

class Transactions extends Component {

    render() {
        let transactions_to_display = this.props.transactions_to_display
        return (
            <table>
                <thead><tr><td>Amount</td><td>Vendor</td><td>Category</td><td>Date</td></tr></thead>
                <tbody>{transactions_to_display.map(t => <Transaction key={t._id} transaction={t} delete={this.props.delete} />)}</tbody>
            </table>
        )
    }

}

export default Transactions