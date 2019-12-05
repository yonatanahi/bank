import React, { Component } from 'react';

class SortBy extends Component {

    render() {


        return (
            <div>
                <h2>Sort By:</h2>
                <select>
                    <option value="amount">Amount</option>
                    <option value="category">Category</option>
                    <option value="date">Date</option>
                    <option value="vendor">vendor</option>
                </select>
            </div>
        )
    }

}

export default SortBy