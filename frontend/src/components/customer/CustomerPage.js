import React, { Component } from "react";
import { CustomerDataForm } from "./CustomerDataForm"

export class CustomerPage extends Component {
    state = {
        costumerData: undefined
    };

    setCustomerData = (customerData) => {
        this.setState({costumerData: customerData});
    }

    render() {
        return (
            <React.Fragment>
                <h1>Customer page</h1>
                {
                    (this.state.costumerData === undefined)
                    ? <CustomerDataForm setCustomerData={this.setCustomerData} />
                    : <div>def</div>
                }
            </React.Fragment>
        )
    }
}