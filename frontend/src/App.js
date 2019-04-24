import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect, NavLink } from "react-router-dom";
import { CustomerPage } from "./components/customer/CustomerPage"
import { WorkerPage } from "./components/worker/WorkerPage"
import { ManagerPage } from "./components/manager/ManagerPage"

class App extends Component {
  render() {
    return (
      <div id="shutterGutterApp">
        <Router>
          <div>

            <nav className="navbar navbar-default" id="my-navbar">
              <div className="container-fluid">
                <div className="navbar-header">
                  <div className="navbar-brand">ShutterGlutter</div>
                </div>
                <ul className="nav navbar-nav">
                  <li>
                    <NavLink to="/customer" activeClassName="active-nav-link"><i class="fas fa-user" style={{color: "#337ab7", marginRight: "5px"}}></i>Costumer page</NavLink>
                  </li>
                  <li>
                    <NavLink to="/worker" activeClassName="active-nav-link"><i class="fas fa-hard-hat" style={{color: "#ecab14", marginRight: "5px"}}></i>Worker page</NavLink>
                  </li>
                  <li>
                    <NavLink to="/manager" activeClassName="active-nav-link"><i class="fas fa-user-tie" style={{color: "black", marginRight: "5px"}}></i>Manager page</NavLink>
                  </li>
                </ul>
              </div>
            </nav>


            <Route path="/" exact render={() => (<Redirect to="/customer" />)} />
            <Route path="/customer" component={CustomerPage} />
            <Route path="/worker" component={WorkerPage} />
            <Route path="/manager" component={ManagerPage} />

          </div>
        </Router>
      </div>
    );
  }
}

export default App;