import React, { Component } from "react";
import { CustomerOwnOrders } from "./CustomerOwnOrders";
import { CustomerCreateOrderForm } from "./CustomerCreateOrderForm";
import OrderActions from "./../../actions/OrderActions"

export class CustomerMainPage extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    createOrder = (order) => {
        let parsedWindows = [...order.windows];
        for (let i = 0; i < parsedWindows.length; i++) {
            parsedWindows[i].width = parseInt(parsedWindows[i].width);
            parsedWindows[i].height = parseInt(parsedWindows[i].height);
            parsedWindows[i].shutter = {
                ...parsedWindows[i].shutter,
                isFinished: false
            }
        }

        const orderToCreate = {
            ...order,
            isInstalled: false,
            customerData: this.props.customerData,
            windows: parsedWindows
        }

        OrderActions.createOrder(orderToCreate);
    }

    render() {
        return (
            <React.Fragment>
                <CustomerCreateOrderForm createOrderCallback={this.createOrder} />
                <hr />
                <CustomerOwnOrders customerData={this.props.customerData} ownOrders={this.props.ownOrders} />
            </React.Fragment>
        )
    }
}