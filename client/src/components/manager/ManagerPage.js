import React, { Component } from "react";
import { CreateInvoiceForm } from "./CreateInvoiceForm";
import { OrderStatistics } from "./OrderStatistics";
import { getPriceFormattedString } from "../../util/price-format";
import OrderStore from "./../../stores/OrderStore"
import OrderActions from "./../../actions/OrderActions"

export class ManagerPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allOrders: OrderStore._allOrders,
            isAllOrdersFetching: OrderStore._isAllOrdersFetching,
            filter: ""
        };
    }

    onAllOrdersChange = () => {
        this.setState({
            allOrders : OrderStore._allOrders,
            isAllOrdersFetching: OrderStore._isAllOrdersFetching
        });
    }

    componentDidMount() {
        OrderStore.addAllOrdersChangeListener(this.onAllOrdersChange);
        if (OrderStore._isAllOrdersFetched === false) {
            OrderActions.refreshAllOrders();
        }
    }

    componentWillUnmount() {
        OrderStore.removeAllOrdersChangeListener(this.onAllOrdersChange);
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

    createInvoiceForOrder = (invoice, orderId) => {
        const invoiceToCreate = {
            price: parseInt(invoice.price),
            isPaid: invoice.isPaid
        }

        OrderActions.createInvoiceForOrder(orderId, invoiceToCreate);
    }

    render() {
        return (
            <React.Fragment>
            <div className="container-fluid">
                
                <div className="text-center header-text">
                    <h1>
                        Manager page
                        <span>
                            &nbsp;
                            <i 
                                className={this.state.isAllOrdersFetching
                                    ? "header-icon fas fa-sync disabled"
                                    : "header-icon fas fa-sync"
                                }
                                onClick={() => {
                                    if (!this.state.isAllOrdersFetching) {
                                        OrderActions.refreshAllOrders();
                                    }
                                }}
                            />
                        </span>
                    </h1>
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
                                                    onClick={() => {
                                                        if (!this.state.isAllOrdersFetching) {
                                                            OrderActions.finishInstallation(order._id);
                                                        }
                                                    }}
                                                    className={this.props.isAllOrdersFetching 
                                                        ? 'btn btn-primary btn-block disabled' 
                                                        : 'btn btn-primary btn-block'
                                                    }
                                                    disabled={this.props.isAllOrdersFetching}
                                                >
                                                    Install shutter(s)
                                                </button>
                                            }

                                            {
                                                (orderStatus === "INSTALLED") &&
                                                <CreateInvoiceForm
                                                    createInvoiceCallback={(invoice) => this.createInvoiceForOrder(invoice, order._id)}
                                                    isAllOrdersFetching={this.state.isAllOrdersFetching}
                                                />

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

