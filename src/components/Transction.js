import React, { Component } from 'react';

class Transaction extends Component{
    

    delete = ()=>{
        let id = this.props.transaction._id
        this.props.delete(id);        
    }

    render(){    
        return(
            <div className="transaction">
                <span className={this.props.transaction.amount > 0 ? "green" : "red"}>{this.props.transaction.amount}</span>
                <span>{this.props.transaction.vendor}</span>
                <span>{this.props.transaction.category}</span>
                <span>{this.props.transaction.date.slice(0,10)}</span> 
                <button onClick={this.delete}>Delete</button>
            </div>
            )
    }
  
}

export default Transaction