/* jshint esversion: 9 */

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';

class TodoItems extends React.Component {
  render() {
    return (
      <ul>
        {this.props.todoItems.map( item => 
          <li key={item._id}>
            <input
              type="checkbox"
              id={item._id}
              checked={ item.done ? "checked" : "" }
              onChange={() => this.props.onCheckboxChange( item._id, !item.done, this.props.todoListApiHost )}
            />
            <label
              onClick={() => this.props.onCheckboxChange( item._id, !item.done, this.props.todoListApiHost )}
            >
              {item.name}
            </label>
          </li>
        )}
      </ul>
    );
  }
}

class TodoList extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      todoListApiHost: "http://localhost:8080",
      todoItems: []
    };
  }

  componentDidMount() {
    axios.get( `${this.state.todoListApiHost}/list` )
      .then( res => {
        const items = res.data;
        this.setState({
          todoItems: items
        });
      });
  }

  onCheckboxChange( id, done, todoListApiHost ) {
    let url = todoListApiHost;
    if( done ) {
      url += "/done/";
    } else {
      url += "/undone/";
    }
    url += id;
    axios.get( url );
  }

  render() {
    const currentItems = this.state.todoItems;
    return (
      <main role="main" className="container">
        <div className="starter-template">
          <h1> This is React and bootstrap working together </h1>
          <TodoItems
            todoItems={currentItems}
            onCheckboxChange={this.onCheckboxChange}
            todoListApiHost={this.state.todoListApiHost}
          />
        </div>
      </main>
    );
  }
}

ReactDOM.render(
  <TodoList />,
  document.getElementById('root')
);
