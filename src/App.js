import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import BooksList from "./components/books-list.component";
import EditBook from "./components/edit-book.component";
import CreateBook from "./components/create-book.component";
import CreateAuthor from "./components/create-author.component";
import CreateCategory from "./components/create-category.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="https://sujata-book-list.onrender.com/" exact component={BooksList} />
      <Route path="https://sujata-book-list.onrender.com/edit/:id" component={EditBook} />
      <Route path="https://sujata-book-list.onrender.com/create" component={CreateBook} />
      <Route path="https://sujata-book-list.onrender.com/author" component={CreateAuthor} />
      <Route path="https://sujata-book-list.onrender.com/category" component={CreateCategory} />
      </div>
    </Router>
  );
}

export default App;
