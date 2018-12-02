import React, { Component } from "react";

class About extends Component {
  render() {
    return (
      <React.Fragment>
        <h2>About Page:</h2>
        <p>
          This BookStore application helps a person manage his or her book
          rental shop. When a user is logged in, he or she can do basic CRUD
          operation. Example, see the book list, add a new book, delete a
          existing book, and update a book.
        </p>
        <p>
          <strong>Backend:</strong> I used Node.js with Express.js framework to
          build the API for basic CRUD operation. <br /> MongoDB is used for
          database.
        </p>
        <p>
          <strong>FrontEnd:</strong> I used react.js with bootstrap for the
          frontend.<br />
        </p>
      </React.Fragment>
    );
  }
}

export default About;
