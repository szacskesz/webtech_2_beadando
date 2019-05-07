import React, { Component } from "react";
import axios from "axios";

export class WorkerPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allOrders: [],
            filterUnfinished: false,
            selectedShutter: {
                orderId: undefined,
                shutterId: undefined
            }
        };
    }

    componentDidMount() {
        axios.get("http://localhost:8080/order/getAllOrders")
        .then((response) => {
            this.setState((prevState) => ({
                ...prevState,
                allOrders: response.data.orders
            }))
        })
    }

    finishShutter = (orderId, shutterId) => {
        let data = {
            orderId: orderId,
            shutterId: shutterId
        }

        axios.post("http://localhost:8080/order/finishShutter", data)
        .then((response) => {
            let orders = [...this.state.allOrders];
            orders.forEach((order) => {
                if(order._id === orderId) {
                    order.windows.forEach((window) => {
                        if(window.shutter.id === shutterId) {
                            window.shutter.isFinished = true;
                        }
                    })
                }
            })

            this.setState((prevState) => ({
                ...prevState,
                allOrders: orders
            }))
        })
    }

    setSelectedShutter = (orderId, shutterId) => {
        if(this.state.selectedShutter.orderId === orderId && this.state.selectedShutter.shutterId === shutterId ) {
            this.setState((prevState) => ({
                ...prevState,
                selectedShutter: {
                    orderId: undefined,
                    shutterId: undefined
                }
            }))
        } else {
            this.setState((prevState) => ({
                ...prevState,
                selectedShutter: {
                    orderId: orderId,
                    shutterId: shutterId
                }
            }))
        }
    }

    toggleFilterUnfinished = () => {
        this.setState((prevState) => ({
            ...prevState,
            filterUnfinished: !prevState.filterUnfinished
        }))
    }

    render() {
        return (
            <React.Fragment>
            <div className="container-fluid">
                
                <div className="text-center header-text">
                    <h1>Worker page</h1>
                </div>


                <div>
                    <h2>All orders</h2>
                    <div className="checkbox">
                        <label><input type="checkbox" value={this.state.filterUnfinished} onChange={this.toggleFilterUnfinished} />Show only unassembled orders</label>
                    </div>

                    <ul className="list-group">
                    {
                        this.state.allOrders.length === 0 &&
                        <div>Sorry no orders yet</div>
                    }
                    {
                        this.state.allOrders
                            .filter((order) => {
                                if(this.state.filterUnfinished) {
                                    let hasUnfinished = false;
                                    order.windows.forEach((window) => {
                                        if(window.shutter.isFinished === false) {
                                            hasUnfinished = true;
                                        }
                                    })

                                    return hasUnfinished;
                                } else {
                                    return true;
                                }
                            })
                            .map((order, i) => 
                            <li key={i} className="list-group-item">

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
                                                            <th>Assembled</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            order.windows.map((window, j) =>
                                                            {
                                                                const isSelectedShutter = (order._id === this.state.selectedShutter.orderId 
                                                                    && window.shutter.id === this.state.selectedShutter.shutterId);

                                                                return <React.Fragment key={j}>
                                                                    <tr>
                                                                        <td>{window.width}mm x {window.height}mm</td>
                                                                        <td>{window.shutter.color}</td>
                                                                        <td>{window.shutter.material}</td>
                                                                        <td>{window.shutter.type}</td>
                                                                        <td>{window.shutter.isFinished ? "true" : "false"}</td>
                                                                        <td>
                                                                        <button 
                                                                            type="button" 
                                                                            className="btn btn-primary btn-block"
                                                                            onClick={() => this.setSelectedShutter(order._id, window.shutter.id)}
                                                                        >
                                                                            {isSelectedShutter ? "Hide parts" : "List parts"}
                                                                        </button>
                                                                        </td>
                                                                    </tr>
                                                                    {
                                                                        isSelectedShutter &&
                                                                        <tr>
                                                                            <td colSpan={6} className="no-top-border">
                                                                                <div className="col-sm-offset-1 col-sm-11">
                                                                                    <div>
                                                                                        <h3>Parts:</h3>
                                                                                    </div>
                                                                                    <div>
                                                                                        <table className="table">
                                                                                            <thead>
                                                                                                <tr>
                                                                                                    <th>Count</th>
                                                                                                    <th>Description</th>
                                                                                                </tr>
                                                                                            </thead>
                                                                                            <tbody>
                                                                                            {
                                                                                                window.shutter.parts.map((part, k) =>
                                                                                                    <tr key={k}>
                                                                                                        <td>{part.count}</td>
                                                                                                        <td>{part.description}</td>
                                                                                                    </tr>
                                                                                                )
                                                                                            }
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </div>
                                                                                    {
                                                                                        !window.shutter.isFinished &&
                                                                                        <div>
                                                                                            <button 
                                                                                                type="button" 
                                                                                                className="btn btn-primary btn-block"
                                                                                                onClick={() => this.finishShutter(order._id, window.shutter.id)}
                                                                                            >
                                                                                                Finish job
                                                                                            </button>
                                                                                        </div>
                                                                                    }
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    }
                                                                </React.Fragment>

                                                            }
                                                            )
                                                        }

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )
                    }
                    </ul>
                </div>


            </div>
            </React.Fragment>
        )
    }
}

