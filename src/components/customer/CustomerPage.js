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
                <div className="container-fluid">
                    
                    <div className="text-center header-text">
                        <h1>Customer page</h1>
                    </div>
                    {
                        (this.state.customerData === undefined)
                        ? <CustomerDataForm setCustomerData={this.setCustomerData} />
                        : <CustomerMainPage customerData={this.state.customerData} />
                    }
                </div>
            </React.Fragment>
        )
    }
}