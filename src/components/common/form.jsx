import React, { Component } from "react";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  handleChange = ({ currentTarget: input }) => {
    console.log(input.name);
    console.log("handleChange", input.value);
    const data = { ...this.state.dtat };
    data[input.name] = input.value;
    this.setState({ data });
  };

  renderInput(name, label, type = "text") {
    return (
      <div className="form-group">
        <label htmlFor={label}>{label}</label>
        <input
          type={type}
          name={name}
          className="form-control"
          onChange={this.handleChange}
        />
      </div>
    );
  }

  renderSelect(name, label, option) {
    return (
      <div className="form-group">
        <div>
          <label htmlFor={label}>{label}</label>
        </div>
        <select name={name} onChange={this.handleChange}>
          <option value="" />
          {this.state.genres.map(option => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default Form;
