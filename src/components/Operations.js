import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Operations extends Component {
    constructor() {
        super()
        this.state = {
            amount: null,
            vendor: null,
            category: null
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    async handleInputChange(event) {
        let target = event.target;
        let value = target.value;
        let name = target.name;

        if (target.name === "amount") {
            value = Number(value)
        }

        await this.setState({
            [name]: value
        });
    }

    deposit = (e) => {        
        if (this.state.amount > 0) {
            this.props.addOperation(this.state)
        } else {
            let positive = this.state.amount * -1
            this.setState({
                amount: positive
            })
        }
    }

    withdraw = (e) => {
        if (this.state.amount < 0) {
            this.props.addOperation(this.state)
        } else {
            let negative = this.state.amount
            negative = -1 * negative
            this.setState({
                amount: negative
            })
        }
    }


    render() {
        return (
            <div>
                <h2>Operation</h2>
                <input type="number" placeholder="Amount" name="amount" onChange={this.handleInputChange}></input><br></br>
                <input type="text" placeholder="Vendor" name="vendor" onChange={this.handleInputChange}></input><br></br>
                <input type="text" placeholder="Category" name="category" onChange={this.handleInputChange}></input><br></br>
                <input type="date" name="date" onChange={this.handleInputChange}></input><br></br>
                <Link to="/transactions" className="link"><button onClick={this.deposit}>Deposit</button></Link>
                <Link to="/transactions" className="link"><button onClick={this.withdraw}>Withdraw</button></Link>
            </div>
        )
    }
}

export default Operations

