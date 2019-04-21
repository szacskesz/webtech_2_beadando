import React, { Component } from "react";

export class CustomerDataForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            customerData: {
                name: "",
                email: "",
                address: ""
            },
            error: {
                customerData: {
                    name: false,
                    email: false,
                    address: false
                }
            }
        };
    }

    handleNameChange = (event) => {
        const newValue = event.target.value;
        this.setState((prevState) => ({
                ...prevState,
                customerData: {
                    ...prevState.customerData,
                    name: newValue
                }
            }),
            () => this.validateName()
        )
    }

    handleEmailChange = (event) => {
        const newValue = event.target.value;
        this.setState((prevState) => (
            {
                ...prevState,
                customerData: {
                    ...prevState.customerData,
                    email: newValue
                }
            }
            ),
            () => this.validateEmail()
        )
    }

    handleAddressChange = (event) => {
        const newValue = event.target.value;
        this.setState((prevState) => (
            {
                ...prevState,
                customerData: {
                    ...prevState.customerData,
                    address: newValue
                }
            }
            ),
            () => this.validateAddress()
        )
    }

    validateName = () => {
        if(this.state.customerData.name === "") {
            this.setState((prevState) => (
                {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        customerData: {
                            ...prevState.error.customerData,
                            name: true
                        }
                    }
                }
            ))

            return false;
        } else {
            this.setState((prevState) => (
                {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        customerData: {
                            ...prevState.error.customerData,
                            name: false
                        }
                    }
                }
            ))

            return true;
        }
    }

    validateEmail = () => {
        if(this.state.customerData.email === "") {
            this.setState((prevState) => (
                {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        customerData: {
                            ...prevState.error.customerData,
                            email: true
                        }
                    }
                }
            ))

            return false;
        } else {
            this.setState((prevState) => (
                {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        customerData: {
                            ...prevState.error.customerData,
                            email: false
                        }
                    }
                }
            ))

            return true;
        }
    }

    validateAddress = () => {
        if(this.state.customerData.address === "") {
            this.setState((prevState) => (
                {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        customerData: {
                            ...prevState.error.customerData,
                            address: true
                        }
                    }
                }
            ))

            return false;
        } else {
            this.setState((prevState) => (
                {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        customerData: {
                            ...prevState.error.customerData,
                            address: false
                        }
                    }
                }
            ))

            return true;
        }
    }

    validateForm = () => {
        let isValid = true;

        isValid = this.validateName() && isValid;
        isValid = this.validateEmail() && isValid;
        isValid = this.validateAddress() && isValid;

        return isValid;
    }

    saveForm = (event) => {
        event.preventDefault();
        if(this.validateForm()) {
            this.props.setCustomerData(this.state.customerData);
        }
    }

    render() {
        return (
            <form onSubmit={(e) => this.saveForm(e)} >
                <div>
                    <label>Name:</label>
                    <input 
                        type="text"
                        name="name"
                        value={this.state.customerData.name}
                        onChange={this.handleNameChange}
                        className={ this.state.error.customerData.name ? "hasError" : ""}
                    />
                </div>
                {
                    this.state.error.customerData.name &&
                    <div className="errorDesc">Invalid value!</div>
                }

                <div>
                    <label>Email:</label>
                    <input 
                        type="text"
                        name="email"
                        value={this.state.customerData.email}
                        onChange={this.handleEmailChange}
                        className={ this.state.error.customerData.email ? "hasError" : ""}
                    />
                </div>
                {
                    this.state.error.customerData.email &&
                    <div className="errorDesc">Invalid value!</div>
                }

                <div>
                    <label>Address:</label>
                    <input 
                        type="text"
                        name="name"
                        value={this.state.customerData.address}
                        onChange={this.handleAddressChange}
                        className={ this.state.error.customerData.address ? "hasError" : ""}
                    />
                </div>
                {
                    this.state.error.customerData.address &&
                    <div className="errorDesc">Invalid value!</div>
                }

                <div>
                    <input type="submit" value="Submit" />
                </div>
            </form>
        )
    }
}