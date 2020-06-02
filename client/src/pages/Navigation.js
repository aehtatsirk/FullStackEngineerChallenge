import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";

class Navigation extends Component {
  render() {
    const authToken = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink
          to={authToken ? `/employee/${userId}` : "/login"}
          className="navbar-brand"
        >
          Home <span className="sr-only">(current)</span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {authToken && (
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to={`/employee/${userId}`} className="nav-link">
                  Employee Information
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={`/performance/${userId}`} className="nav-link">
                  Performance Review
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/"
                  className="nav-link"
                  onClick={() => {
                    localStorage.removeItem("token");
                  }}
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </nav>
    );
  }
}

export default withRouter(Navigation);
