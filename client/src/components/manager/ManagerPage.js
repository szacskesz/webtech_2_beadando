import React, { Component } from "react";
import axios from "axios";
import { CreateInvoiceForm } from "./CreateInvoiceForm";
import { OrderStatistics } from "./OrderStatistics";
import { getPriceFormattedString } from "../../util/price-format";

export class ManagerPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allOrders: [],
            filter: ""
        };
    }

    componentDidMount() {
        axios.get("/order/getAllOrders")
        .then((response) => {
            this.setState((prevState) => ({
                ...prevState,
                allOrders: response.data.orders
            }))
        })
    }

    setFilter = (event) => {
        const value = event.target.value;

        this.setState((prevState) => ({
            ...prevState,
            filter: value
        }))
    }

    getOrderStatus = (order) => {
        let isUnassembled = false;
        order.windows.forEach((window) => {
            if(window.shutter.isFinished === false) {
                isUnassembled = true;
            }
        })

        if(isUnassembled === true) {
            return "UNASSEMBLED";
        }

        let isInstalled = (order.isInstalled === true);

        if(isInstalled === false) {
            return "ASSEMBLED";
        }

        let hasInvoice =  (order.invoice !== undefined && order.invoice !== null)

        if(hasInvoice === false) {
            return "INSTALLED";
        }

        let isInvoicePaid = (order.invoice.isPaid === true);

        if(isInvoicePaid === false) {
            return "UNPAID";
        } else {
            return "PAID";
        }
    }

    getFilteredOrders = () => {
        return this.state.allOrders.filter((order) => {
            if(this.state.filter === "") {
                return true;
            } else {
                let status = this.getOrderStatus(order);

                return (this.state.filter === status);
            }
        })
    }

    installShutters = (orderId) => {
        let data = {
            orderId: orderId
        }

        axios.post("/order/finishInstallation", data)
        .then((response) => {
            let orders = [...this.state.allOrders];
            orders.forEach((order) => {
                if(order._id === orderId) {
                    order.isInstalled = true;
                }
            })

            this.setState((prevState) => ({
                ...prevState,
                allOrders: orders
            }))
        })
    }

    createInvoiceForOrder = (invoice, orderId) => {
        let data = {
            orderId: orderId,
            invoice: {
                price: parseInt(invoice.price),
                isPaid: invoice.isPaid
            }
        }

        axios.post("/order/createInvoiceForOrder", data)
        .then((response) => {
            let orders = [...this.state.allOrders];
            orders.forEach((order) => {
                if(order._id === orderId) {
                    order.invoice = invoice;
                }
            })

            this.setState((prevState) => ({
                ...prevState,
                allOrders: orders
            }))
        })
    }

    render() {
        return (
            <React.Fragment>
            <div className="container-fluid">
                
                <div className="text-center header-text">
                    <h1>Manager page</h1>
                </div>

                <OrderStatistics allOrders={this.state.allOrders} />

                <div>
                    <h2>All orders</h2>
                    <div>
                        <label>Filter:</label>
                        <select 
                            className="form-control" 
                            value={this.state.filter}
                            onChange={(event) => this.setFilter(event)}
                        >
                            <option value={""}>Show all</option>
                            <option value={"UNASSEMBLED"}>Show only unassembled</option>
                            <option value={"ASSEMBLED"}>Show only assembled</option>
                            <option value={"INSTALLED"}>Show only installed</option>
                            <option value={"UNPAID"}>Show only unpaid</option>
                            <option value={"PAID"}>Show only paid</option>
                        </select>
                    </div>

                    <ul className="list-group margin-top-30">
                    {
                        this.state.allOrders.length === 0 &&
                        <div>Sorry no orders yet</div>
                    }
                    {
                        this.getFilteredOrders()
                            .map((order, i) => 
                            {
                                const orderStatus = this.getOrderStatus(order);

                                return <li key={i} className="list-group-item">
    
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div>
                                                <div>
                                                    <h3>Order id:</h3>
                                                </div>
                                                <div>
                                                    {order._id}
                                                </div>
                                            </div>

                                            <div>
                                                <div>
                                                    <h3>Customer data:</h3>
                                                </div>
                                                <div>
                                                    <div><label className="details-label">Name: </label>{order.customerData.name}</div>
                                                    <div><label className="details-label">Email: </label>{order.customerData.email}</div>
                                                    <div><label className="details-label">Address: </label>{order.customerData.address}</div>
                                                </div>
                                            </div>

                                            <div>
                                                <div>
                                                    <h3>Comment:</h3>
                                                </div>
                                                <div className={"comment-field"}>
                                                    {order.comment}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div>
                                                <div>
                                                    <h3>Shutters:</h3>
                                                </div>
                                                <div>
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th>Window size(width first)</th>
                                                                <th>Color</th>
                                                                <th>Material</th>
                                                                <th>Type</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                order.windows.map((window, j) =>
                                                                    <tr key={j}>
                                                                        <td>{window.width}mm x {window.height}mm</td>
                                                                        <td>{window.shutter.color}</td>
                                                                        <td>{window.shutter.material}</td>
                                                                        <td>{window.shutter.type}</td>
                                                                    </tr>
                                                                )
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                            <div>
                                                <div><label className="status-label"><h3>Order status: </h3></label><span style={{fontSize: "1.2em"}}>{orderStatus}</span></div>
                                            </div>

                                            {
                                                (orderStatus === "ASSEMBLED") &&
                                                <button 
                                                    type="button" 
                                                    className="btn btn-primary btn-block"
                                                    onClick={() => this.installShutters(order._id)}
                                                >
                                                    Install shutter(s)
                                                </button>
                                            }

                                            {
                                                (orderStatus === "INSTALLED") &&
                                                <CreateInvoiceForm createInvoiceCallback={(invoice) => this.createInvoiceForOrder(invoice, order._id)} />

                                            }

                                            {
                                                (orderStatus === "UNPAID" || orderStatus === "PAID") &&
                                                <div>
                                                    <div>
                                                        <h3>Invoice:</h3>
                                                    </div>
                                                    <div>
                                                        <div><label className="details-label">Name: </label>{order.customerData.name}</div>
                                                        <div><label className="details-label">Price: </label>{getPriceFormattedString(order.invoice.price)} HUF</div>
                                                        <div><label className="details-label">Paid: </label>{order.invoice.isPaid ? "true" : "false"}</div>
                                                    </div>
                                                </div>                                     
                                            }
                                        </div>
                                    </div>
                                </li>

                            }

                        )
                    }
                    </ul>
                </div>


            </div>
            </React.Fragment>
        )
    }
}

