import React, { Component } from "react";
import { login, getCurrentUser } from "../services/auth";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";

class Login extends Component {
  state = {
    data: {
      email: "",
      password: ""
    },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  validate = () => {
    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false
    });
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleSubmit = async e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    try {
      await login(this.state.data.email, this.state.data.password);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = input => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input.currentTarget);
    if (errorMessage) errors[input.currentTarget.name] = errorMessage;
    else delete errors[input.currentTarget.name];

    const data = { ...this.state.data };
    data[input.currentTarget.name] = input.currentTarget.value;
    this.setState({ data, errors });
  };

  render() {
    if (getCurrentUser()) return <Redirect to="/" />;

    const { errors } = this.state;
    return (
      <React.Fragment>
        <h2 style={{ marginBottom: 20, marginTop: 20 }}>Login Page</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="eamil">Email address</label>
            <input
              onChange={this.handleChange}
              name="email"
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
            />

            {errors["email"] && (
              <div className="alert alert-danger"> {errors["email"]}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={this.handleChange}
              name="password"
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
            />
            {errors["password"] && (
              <div className="alert alert-danger"> {errors["password"]}</div>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default Login;
