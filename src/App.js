import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import Register from "./components/register";
import Login from "./components/login";
import Logout from "./components/logout";
import BookList from "./components/bookList";
import NotFound from "./components/notFound";
import AddBook from "./components/addBook";
import Profile from "./components/profile";
import UpdateBook from "./components/updateBook";
import About from "./components/about";
import { getCurrentUser } from "./services/auth";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    //console.log("user ", user);
    return (
      <React.Fragment>
        <div className="navBar">
          <NavBar user={user} />
        </div>
        <main className="container">
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route
              exact
              path="/profile"
              render={props => <Profile {...props} user={user} />}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/about" component={About} />
            <Route path="/books/:id" component={UpdateBook} />
            <Route
              exact
              path="/booklist"
              render={props => <BookList {...props} user={user} />}
            />
            <Route exact path="/book/new" component={AddBook} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/booklist" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
