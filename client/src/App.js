import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Performance from "./pages/Performance";
import Feedback from "./pages/Feedback";
import Navigation from "./pages/Navigation";
import Employee from "./pages/Employee";
import CreatePerformance from "./pages/CreatePerformance";
import AssignFeedback from "./pages/AssignFeedback";
import "./App.css";
import { client } from "./client";
import { ApolloProvider } from "react-apollo";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ApolloProvider client={client}>
          <Navigation />
          <main className="main-content">
            <Switch>
              <Redirect from="/" to="/login" exact />
              <Route path="/login" component={Login} />
              <Route path="/create-account" component={CreateAccount} />
              <Route path="/employee/:employeeId" component={Employee} />
              <Route path="/performance/:employeeId" component={Performance} />
              <Route path="/create-performance" component={CreatePerformance} />
              <Route path="/feedback" component={Feedback} />
              <Route path="/assign-feedback" component={AssignFeedback} />
            </Switch>
          </main>
        </ApolloProvider>
      </BrowserRouter>
    );
  }
}

export default App;
