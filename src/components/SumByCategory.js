import React, { Component } from 'react';

class SumByCategory extends Component{
    sum = (category) => {
        let transactions_to_display = this.props.transactions_to_display
        let sum = 0
        for(let t of transactions_to_display){
            if(t.category === category){
                sum += t.amount
            }
        }
        return sum
    }

    render(){
        let categories = this.props.categories

        return(
            <div>
                <h2>Sum By Category</h2>
        {categories.map(c => <div>{c}: {this.sum(c)}</div>)}
            </div>
            )
    }
    
}

export default SumByCategory