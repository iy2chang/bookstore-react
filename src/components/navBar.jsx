import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          BookStore
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            <NavLink className="nav-link" to="/booklist">
              Book List
            </NavLink>
            {!this.props.user && (
              <React.Fragment>
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </React.Fragment>
            )}

            {this.props.user && (
              <React.Fragment>
                <NavLink className="nav-link" to="/profile">
                  Profile
                </NavLink>
                <NavLink className="nav-link" to="/logout">
                  Logout
                </NavLink>
              </React.Fragment>
            )}
            <NavLink className="nav-link" to="/about">
              About
            </NavLink>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
