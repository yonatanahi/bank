import React, { Component } from 'react';

class Transaction extends Component{
    

    delete = ()=>{
        let id = this.props.transaction._id
        this.props.delete(id);        
    }

    render(){    
        return(     
            <tr className="transaction">
                <td className={this.props.transaction.amount > 0 ? "green" : "red"}>{this.props.transaction.amount}</td>
                <td>{this.props.transaction.vendor}</td>
                <td>{this.props.transaction.category}</td>
                <td>{this.props.transaction.date.slice(0,10)}</td> 
                <td><button onClick={this.delete}>Delete</button></td>
            </tr>            
            )
    }
  
}

export default Transaction