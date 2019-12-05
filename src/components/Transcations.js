import React, { Component } from 'react';
import Transaction from './Transction';

class Transactions extends Component{
    // constructor(){
    //     super()
    //     this.state = {
           
    //     }
    // }



    
    render(){
        let transactions_to_display = this.props.transactions_to_display
        let transactions = this.props.transactions
        return(
            <div>
                <h2>Transactions</h2>
                {transactions_to_display.map(t => <Transaction key={transactions.indexOf(t)} transaction = {t} delete={this.props.delete}/>)}
            </div>
            )
    }
    
}

export default Transactions