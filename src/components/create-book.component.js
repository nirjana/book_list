import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateBook extends Component {
  constructor(props) {
    super(props);

    this.onChangeAuthorname = this.onChangeAuthorname.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      authorname: '',
      description: '',
      duration: 0,
      date: new Date(),
      authors: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/authors/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            authors: response.data.map(author => author.authorname),
            authorname: response.data[0].authorname
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeAuthorname(e) {
    this.setState({
      authorname: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const book = {
      authorname: this.state.authorname,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(book);

    axios.post('http://localhost:5000/books/add', book)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Create New Book Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Authorname: </label>
          <select ref="authorInput"
              required
              className="form-control"
              value={this.state.authorname}
              onChange={this.onChangeAuthorname}>
              {
                this.state.authors.map(function(author) {
                  return <option 
                    key={author}
                    value={author}>{author}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Book Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}