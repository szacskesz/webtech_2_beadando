import React, { Component } from "react";
import { CustomerDataForm } from "./CustomerDataForm"
import { CustomerMainPage } from "./CustomerMainPage"
import CostumerDataStore from "./../../stores/CostumerDataStore"
import CostumerDataActions from "./../../actions/CostumerDataActions"

export class CustomerPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            customerData: CostumerDataStore._costumerData,
            ownOrders: CostumerDataStore._ownOrders,
            isOwnOrdersFetching: false
        };
    }

    onCostumerDataChange = () => {
        this.setState({customerData : CostumerDataStore._costumerData});
    }

    onOwnOrdersChange = () => {
        this.setState({
            ownOrders : CostumerDataStore._ownOrders,
            isOwnOrdersFetching: CostumerDataStore._isOwnOrdersFetching
        });
    }

    componentDidMount() {
        CostumerDataStore.addCostumerDataChangeListener(this.onCostumerDataChange);
        CostumerDataStore.addOwnOrdersChangeListener(this.onOwnOrdersChange);
    }

    componentWillUnmount() {
        CostumerDataStore.removeCostumerDataChangeListener(this.onCostumerDataChange);
        CostumerDataStore.removeOwnOrdersChangeListener(this.onOwnOrdersChange);
    }

    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">
                    
                    <div className="text-center header-text">
                        <h1>
                            Customer page
                            {this.state.customerData !== undefined &&
                                <span>
                                    &nbsp;
                                    <i 
                                        className={this.state.isOwnOrdersFetching
                                            ? "header-icon fas fa-sync disabled"
                                            : "header-icon fas fa-sync"
                                        }
                                        onClick={() => {
                                            if (!this.state.isOwnOrdersFetching) {
                                                CostumerDataActions.refreshCostumerOwnOrders();
                                            }
                                        }}
                                    />
                                    &nbsp;
                                    <i className="header-icon fas fa-sign-out-alt" onClick={() => {CostumerDataActions.unsetCostumerData();}} />
                                </span>
                            }
                        </h1>
                    </div>
                    {
                        (this.state.customerData === undefined)
                        ? <CustomerDataForm
                            isOwnOrdersFetching={this.state.isOwnOrdersFetching}
                        />
                        : <CustomerMainPage
                            customerData={this.state.customerData}
                            ownOrders={this.state.ownOrders}
                            isOwnOrdersFetching={this.state.isOwnOrdersFetching}
                        />
                    }
                </div>
            </React.Fragment>
        )
    }
}