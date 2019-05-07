import React, { Component } from "react";
import axios from "axios";
import { CustomerOwnOrders } from "./CustomerOwnOrders";
import { CustomerCreateOrderForm } from "./CustomerCreateOrderForm";

export class CustomerMainPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ownOrders: []
        };
    }

    componentDidMount() {
        axios.post("/order/getAllOrdersByEmail", {
            "email": this.props.customerData.email
        })
        .then((response) => {
            this.setState((prevState) => ({
                ...prevState,
                ownOrders: response.data.orders
            }))
        })
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

        let data = {
            order: {
                ...order,
                isInstalled: false,
                customerData: this.props.customerData,
                windows: parsedWindows
            }
        }

        axios.post("/order/createOrder", data)
        .then((response) => {
            
            let id = response.data.createdId;
            axios.post("/order/getOrderById", {
                "orderId": id
            })
            .then((response) => {
                this.setState((prevState) => ({
                    ...prevState,
                    ownOrders: [
                        ...prevState.ownOrders,
                        response.data.order
                    ]
                }))
            })
        })

    }

    render() {
        return (
            <React.Fragment>
                <CustomerCreateOrderForm
                    createOrderCallback={this.createOrder}
                />
                <hr />
                <CustomerOwnOrders customerData={this.props.customerData} ownOrders={this.state.ownOrders} />
            </React.Fragment>
        )
    }
}