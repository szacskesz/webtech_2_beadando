import React, { Component } from "react";
import { CustomerDataForm } from "./CustomerDataForm"
import { CustomerMainPage } from "./CustomerMainPage"

export class CustomerPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            customerData: undefined
        };
    
    }

    setCustomerData = (customerData) => {
        this.setState({customerData: customerData});
    }

    render() {
        return (
            <React.Fragment>
                <h1>Customer page</h1>
                {
                    (this.state.customerData === undefined)
                    ? <CustomerDataForm setCustomerData={this.setCustomerData} />
                    : <CustomerMainPage customerData={this.state.customerData}  />
                }
            </React.Fragment>
        )
    }
}