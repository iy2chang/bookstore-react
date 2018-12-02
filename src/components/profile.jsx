import React, { Component } from "react";
import { getCurrentUser } from "../services/auth";

class Profile extends Component {
  state = {
    user: {
      name: "",
      email: "",
      isAdmin: ""
    }
  };

  async componentDidMount() {
    const jwt = await getCurrentUser();
    console.log(jwt);
    this.setState({ user: jwt });
  }
  render() {
    const { name, email } = this.state.user;
    return (
      <p>
        Hello {name}, {email}
      </p>
    );
  }
}

export default Profile;
