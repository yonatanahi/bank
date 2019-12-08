import React, { Component } from 'react';

class SumByCategory extends Component {
    sum = (category) => {
        let transactions_to_display = this.props.transactions_to_display
        let sum = 0
        for (let t of transactions_to_display) {
            if (t.category === category) {
                sum += t.amount
            }
        }
        return sum
    }

    render() {
        let categories = this.props.categories

        return (
            <div>
                <h2>Breakdown</h2>
                {categories.map(c => <div className="breakdown" key={categories.indexOf(c)}><span>{c}:</span> <span>{this.sum(c)}</span></div>)}
            </div>
        )
    }

}

export default SumByCategory