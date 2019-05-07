import React, { Component } from "react";

export class CustomerOwnOrders extends Component {

    render() {
        return (
            <div>
                <h2>Own orders ({this.props.customerData.email})</h2>
                <ul className="list-group">
                {
                    this.props.ownOrders.length === 0 &&
                    <div>Sorry no orders yet</div>
                }
                {
                    this.props.ownOrders.map((order, i) => 
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
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        order.windows.map((window, i) =>
                                                        <tr key={i}>
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
                                </div>
                            </div>
                        </li>
                    )
                }
                </ul>
            </div>
        )
    }
}