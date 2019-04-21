import { Component } from "react";
import axios from "axios";

export class CustomerMainPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allShutterColors: [],
            allShutterMaterials: [],
            allShutterTypes: [],
            ownOrders: []
        };
    }

    componentDidMount() {
        axios.get("http://localhost:8080/shutter-data/getAllShutterColors")
        .then((response) => {
            this.setState((prevState) => ({
                ...prevState,
                allShutterColors: response.data.colors
            }))
        })

        axios.get("http://localhost:8080/shutter-data/getAllShutterMaterials")
        .then((response) => {
            this.setState((prevState) => ({
                ...prevState,
                allShutterMaterials: response.data.materials
            }))
        })

        axios.get("http://localhost:8080/shutter-data/getAllShutterTypes")
        .then((response) => {
            this.setState((prevState) => ({
                ...prevState,
                allShutterTypes: response.data.types
            }))
        })

        axios.post("http://localhost:8080/order/getAllOrdersByEmail", {
            "email": this.props.customerData.email
        })
        .then((response) => {
            this.setState((prevState) => ({
                ...prevState,
                ownOrders: response.data.orders
            }))
        })
    }

    render() {
        return (
            "asd"
        )
    }
}