import React, { Component } from "react";
import { getPriceFormattedString } from "../../util/price-format";

export class OrderStatistics extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    getFinishedOrdersCount = () =>{
        return this.props.allOrders.filter((order) => {
            return (order.isInstalled !== undefined && order.isInstalled === true)
        }).length
    }

    getUnfinishedOrdersCount = () =>{
        return this.props.allOrders.filter((order) => {
            return (order.isInstalled === undefined || order.isInstalled === false)
        }).length
    }

    getCurrentIncome = () =>{
        let income = 0;

        this.props.allOrders.forEach(order => {
            if(order.invoice !== undefined && order.invoice !== null && order.invoice.isPaid === true) {
                income += order.invoice.price;
            }
        });

        return income;
    }

    getPendingIncome = () =>{
        let income = 0;

        this.props.allOrders.forEach(order => {
            if(order.invoice !== undefined && order.invoice !== null && order.invoice.isPaid === false) {
                income += order.invoice.price;
            }
        });

        return income;
    }

    render() {
        const totalOrdersCount = this.props.allOrders.length;
        const finishedOrdersCount = this.getFinishedOrdersCount();
        const unfinishedOrdersCount = this.getUnfinishedOrdersCount();
        const currentIncome = this.getCurrentIncome()
        const pendingIncome = this.getPendingIncome();

        return (

            <div>
                <h2>Statistics</h2>
                <div>
                    <div><label className="details-label">Total orders count: </label>{totalOrdersCount}</div>
                    <div><label className="details-label">Finished (installed) orders: </label>{finishedOrdersCount}</div>
                    <div><label className="details-label">Unfinished orders: </label>{unfinishedOrdersCount}</div>
                    <div><label className="details-label">Current income: </label>{getPriceFormattedString(currentIncome)} HUF</div>
                    <div><label className="details-label">Pending income: </label>{getPriceFormattedString(pendingIncome)} HUF</div>
                </div>
            </div>
        )
    }
}

