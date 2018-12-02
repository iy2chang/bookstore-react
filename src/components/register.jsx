import React, { Component } from "react";
import { register } from "../services/userService";
import Joi from "joi-browser";

class Register extends Component {
  state = {
    user: {
      email: "",
      password: "",
      name: ""
    },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  validate = () => {
    const { error } = Joi.validate(this.state.user, this.schema, {
      abortEarly: false
    });
    if (!error) return null;

    const errors = {};
    console.log(error.details);
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = input => {
    const obj = { [input.name]: input.value };
    const schema = { [input.name]: this.schema[input.name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const errors = this.validate();

    this.setState({ errors: errors || {} });

    if (errors) return;

    // submitting the form
    try {
      await register(this.state.user);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  handleChange = input => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input.currentTarget);
    if (errorMessage) errors[input.currentTarget.name] = errorMessage;
    else delete errors[input.currentTarget.name];

    const user = { ...this.state.user };
    user[input.currentTarget.name] = input.currentTarget.value;
    this.setState({ user, errors });
  };

  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            onChange={this.handleChange}
            type="email"
            name="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
          {errors["email"] && (
            <div className="alert alert-danger">{errors["email"]} </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            onChange={this.handleChange}
            name="password"
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
          />
          {errors["password"] && (
            <div className="alert alert-danger">{errors["password"]} </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            onChange={this.handleChange}
            name="name"
            type="text"
            className="form-control"
            id="name"
            placeholder="Name"
          />
          {errors["name"] && (
            <div className="alert alert-danger">{errors["name"]} </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    );
  }
}

export default Register;
