import React, { Component } from "react";
import Joi from "joi-browser";
import { getGenres } from "../services/genreServie";
import { getBookById, updateBook } from "../services/bookServie";

class UpdateBook extends Component {
  state = {
    data: {
      id: "",
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [],
    errors: {}
  };

  schema = {
    id: Joi.string(),
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

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateBook() {
    try {
      const bookId = this.props.match.params.id;
      const { data: book } = await getBookById(bookId);

      this.setState({ data: this.mapToView(book) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  mapToView(book) {
    return {
      id: book._id,
      title: book.title,
      genreId: book.genre._id,
      numberInStock: book.numberInStock,
      dailyRentalRate: book.dailyRentalRate
    };
  }

  handleSubmit = async e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    await updateBook(this.state.data);
    window.location = "/booklist";
  };

  handleChange = input => {
    const data = { ...this.state.data };
    data[input.currentTarget.name] = input.currentTarget.value;
    this.setState({ data });
    console.log("book", this.state.data);
  };

  async componentDidMount() {
    await this.populateGenres();
    await this.populateBook();
  }

  render() {
    const { title, numberInStock, dailyRentalRate, genreId } = this.state.data;
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
            <div className="alert alert-danger">{errors["title"]}</div>
          )}
        </div>
        <div className="form-group">
          <div>
            <label htmlFor="Genre">Genre</label>
          </div>
          <select name="genreId" onChange={this.handleChange} value={genreId}>
            {this.state.genres.map(genre => (
              <option key={genre._id} value={genre._id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="numberInStock">Stock</label>
          <input
            type="number"
            name="numberInStock"
            className="form-control"
            id="numberInStock"
            min="0"
            value={numberInStock}
            onChange={this.handleChange}
          />
          {errors["numberInStock"] && (
            <div className="alert alert-danger">{errors["numberInStock"]}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="rate">Rental Rate</label>
          <input
            type="number"
            name="dailyRentalRate"
            className="form-control"
            id="bookRental"
            min="0"
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
          Update
        </button>
      </form>
    );
  }
}

export default UpdateBook;
