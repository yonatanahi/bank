import React, { Component } from 'react';

class Transaction extends Component{
    

    delete = ()=>{
        let id = this.props.transaction._id
        this.props.delete(id);        
    }

    render(){
        return(
            <div>
                {this.props.transaction.amount}-{this.props.transaction.vendor}-{this.props.transaction.category}-{this.props.transaction.date}
                <button onClick={this.delete}>Delete</button>
            </div>
            )
    }
  
}

export default Transaction