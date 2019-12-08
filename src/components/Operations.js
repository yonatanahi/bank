import React, { Component } from 'react';
import { Link } from 'react-router-dom'
// import BasicDatePicker, { Calendar } from './BasicDatePicker';
import MomentUtils from '@date-io/moment';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

class Operations extends Component {
    constructor() {
        super()
        this.state={
            // amount: null,
            vendor: null,
            category: null,
            date: new Date()
        }

        this.amount = null

        this.handleInputChange = this.handleInputChange.bind(this);

    }

    async handleInputChange(event) {
        let target = event.target;
        let value = target.value;
        let name = target.name;

        if (target.name === "amount") {
            this.amount = Number(value)
        }else{
            this.setState({[name]: value})
        }

        

    }


    deposit = () => {        
        this.amount = Math.abs(this.amount)        
        this.props.addOperation({...this.state, amount: this.amount})
        
    }

    withdraw = () => {
        this.amount = -Math.abs(this.amount)
        this.props.addOperation({...this.state, amount: this.amount})        
    }



    getDate = (value) => {
        this.setState({date: value._d})
    }

    render() {

        return (
            <div>
                <h2>Operation</h2>
                <div><input type="number" placeholder="Amount" name="amount" onChange={this.handleInputChange}></input></div>
                <div><input type="text" placeholder="Vendor" name="vendor" onChange={this.handleInputChange}></input></div>
                <div><input type="text" placeholder="Category" name="category" onChange={this.handleInputChange}></input></div>
                <div>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker value = {this.state.date} onChange={this.getDate}  />
                </MuiPickersUtilsProvider>
                </div>

                <Link to="/transactions" className="link" onClick={this.deposit}><button >Deposit</button></Link>
                <Link to="/transactions" className="link" onClick={this.withdraw}><button >Withdraw</button></Link>
            </div >
        )
    }
}

export default Operations

