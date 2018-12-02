import React, { Component } from "react";
import DeleteBook from "./deleteBook";
import { Link } from "react-router-dom";
import { getBooks } from "../services/bookServie";
import { getGenres } from "../services/genreServie";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class BookList extends Component {
  state = {
    books: [],
    genres: [],
    pageSize: 5,
    currentPage: 1
  };

  async componentDidMount() {
    const { data: genres } = await getGenres();
    const { data: books } = await getBooks();
    this.setState({ books, genres });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  render() {
    const { user } = this.props;
    const { length: count } = this.state.books;
    const { pageSize, currentPage, books: allBooks } = this.state;

    if (count === 0) return <p>There are no books in the database.</p>;

    const books = paginate(allBooks, currentPage, pageSize);

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
            {books.map(book => (
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
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default BookList;
