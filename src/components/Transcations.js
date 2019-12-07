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
            <div id="transactions-container">
                <h2>Transactions</h2>
                <h3 className="transaction"><span>amount</span> <span>vendor</span> <span>category</span> <span>date</span></h3>
         
                   {transactions_to_display.map(t => <Transaction key={t._id} transaction = {t} delete={this.props.delete}/>)}
             
            </div>
            )
    }
    
}

export default Transactions