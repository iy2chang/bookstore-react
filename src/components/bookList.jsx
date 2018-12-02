import React, { Component } from "react";
import DeleteBook from "./deleteBook";
import { Link } from "react-router-dom";
import { getBooks } from "../services/bookServie";
import { getGenres } from "../services/genreServie";

class BookList extends Component {
  state = {
    books: [],
    genres: []
  };

  async componentDidMount() {
    const { data: genres } = await getGenres();
    const { data: books } = await getBooks();
    this.setState({ books, genres });
  }

  render() {
    const { user } = this.props;

    return (
      <React.Fragment>
        {user && (
          <Link to="/book/new">
            <button type="button" className="btn btn-primary">
              AddBook
            </button>
          </Link>
        )}

        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genres</th>
              <th scope="col">Stock</th>
              <th scope="col">Rental Rate</th>
              {user && <th scope="col>" />}
            </tr>
          </thead>
          <tbody>
            {this.state.books.map(book => (
              <tr key={book._id}>
                {user && (
                  <td>
                    <Link to={`/books/${book._id}`}>{book.title}</Link>
                  </td>
                )}
                {!user && <td>{book.title}</td>}
                <td>{book.genre.name}</td>
                <td>{book.numberInStock}</td>
                <td>{book.dailyRentalRate}</td>
                {user && (
                  <td>
                    <DeleteBook book={book} />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default BookList;
