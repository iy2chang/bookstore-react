import { Component } from "react";
import { logout } from "../services/auth";

class Logout extends Component {
  state = {};

  componentDidMount() {
    logout();
    window.location = "/";
  }
  render() {
    return null;
  }
}

export default Logout;
