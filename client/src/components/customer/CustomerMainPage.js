import React, { Component } from "react";
import { CustomerOwnOrders } from "./CustomerOwnOrders";
import { CustomerCreateOrderForm } from "./CustomerCreateOrderForm";

export class CustomerMainPage extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <CustomerCreateOrderForm customerData={this.props.customerData} isOwnOrdersFetching={this.props.isOwnOrdersFetching} />
                <hr />
                <CustomerOwnOrders customerData={this.props.customerData} ownOrders={this.props.ownOrders} />
            </React.Fragment>
        )
    }
}