import React, { Component } from "react";
import { deleteBook, getBooks } from "../services/bookServie";

class DeleteBook extends Component {
  state = {
    books: []
  };

  async componentDidMount() {
    const { data: books } = await getBooks();
    this.setState({ books });
  }

  handleDelete = async () => {
    const bookId = this.props.book._id;
    console.log(bookId);
    const originalBooks = this.state.books;
    const books = originalBooks.filter(b => b._id !== bookId);
    this.setState({ books });

    try {
      await deleteBook(bookId);
      window.location = "/booklist";
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        console.log("Movie not found");
      }
      this.setState({ books: originalBooks });
    }
  };

  render() {
    return (
      <button onClick={this.handleDelete} className="btn btn-danger">
        Delete
      </button>
    );
  }
}

export default DeleteBook;
