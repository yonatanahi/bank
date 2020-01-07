import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import MomentUtils from '@date-io/moment';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';


class Operations extends Component {
    constructor() {
        super()
        this.state = {
            amount: null,
            vendor: null,
            category: null,
            date: new Date()
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
        this.setState({ [name]: value })
    }


    deposit = () => {
        let state = { ...this.state }
        state.amount = Math.abs(state.amount)
        this.props.addOperation(state)
    }

    withdraw = () => {
        let state = { ...this.state }
        state.amount = -Math.abs(state.amount)
        this.props.addOperation(state)
    }



    getDate = (value) => {
        this.setState({ date: value._d })
    }

    render() {

        return (
            <div>
                <div><input type="number" placeholder="Amount" name="amount" onChange={this.handleInputChange}></input></div>
                <div><input type="text" placeholder="Vendor" name="vendor" onChange={this.handleInputChange}></input></div>
                <select onChange={this.handleChange} name="category" onChange={this.handleInputChange}>
                    <option value="" disabled selected hidden>Category</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Food">Food</option>
                    <option value="Housing">Housing</option>
                    <option value="Salary">Salary</option>
                    <option value="Other">Other</option>
                </select>
                <div>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker value={this.state.date} onChange={this.getDate} />
                    </MuiPickersUtilsProvider>
                </div>

                <Link to="/transactions" className="link" onClick={this.deposit}><button >Deposit</button></Link>
                <Link to="/transactions" className="link" onClick={this.withdraw}><button >Withdraw</button></Link>
            </div >
        )
    }
}

export default Operations

