import React, { Component } from "react";
import { addBook } from "../services/bookServie";
import { getGenres } from "../services/genreServie";
import Joi from "joi-browser";

class AddBook extends Component {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [],
    errors: {}
  };

  async populateGenre() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async componentDidMount() {
    await this.populateGenre();
  }

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .label("Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .label("Rental Rate")
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

  handleSubmit = async e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    try {
      await addBook(this.state.data);
      window.location = "/booklist";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log("add failed", ex);
      }
    }
  };

  render() {
    const { title, genreId, numberInStock, dailyRentalRate } = this.state.data;
    const { errors } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="Title">Book Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            id="bookTitle"
            placeholder="Enter Book Title"
            value={title}
            onChange={this.handleChange}
          />
          {errors["title"] && (
            <div className="alert alert-danger"> {errors["title"]}</div>
          )}
        </div>

        <div className="form-group">
          <div>
            <label htmlFor="Genre">Genre</label>
          </div>
          <select name="genreId" onChange={this.handleChange} value={genreId}>
            <option value="" />
            {this.state.genres.map(genre => (
              <option key={genre._id} value={genre._id}>
                {genre.name}
              </option>
            ))}
          </select>
          {errors["genreId"] && (
            <div className="alert alert-danger"> {errors["genreId"]}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="numberInStock">Stock</label>
          <input
            type="number"
            name="numberInStock"
            className="form-control"
            id="numberInStock"
            value={numberInStock}
            onChange={this.handleChange}
          />
          {errors["numberInStock"] && (
            <div className="alert alert-danger"> {errors["numberInStock"]}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="rate">Rental Rate</label>
          <input
            type="number"
            name="dailyRentalRate"
            className="form-control"
            id="bookRental"
            value={dailyRentalRate}
            onChange={this.handleChange}
          />
          {errors["dailyRentalRate"] && (
            <div className="alert alert-danger">
              {errors["dailyRentalRate"]}
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    );
  }
}

export default AddBook;
