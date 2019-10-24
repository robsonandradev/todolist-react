/* jshint esversion: 9 */

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';

class TodoList extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      todoListApiHost: "http://localhost:8080",
      todoItems: []
    };
  }
  
  getTodoItems() {
    axios.get( `${this.state.todoListApiHost}/list` )
      .then( res => {
        const items = res.data;
        this.setState({
          todoItems: items
        });
      });
  }

  render() {
    this.getTodoItems();
    return (
      <main role="main" className="container">
        <div className="starter-template">
          <h1> This is React and bootstrap working together </h1>
          <ul>
            {this.state.todoItems.map( item => 
              <li key={item._id}>
                <input type="checkbox" value={item.done} /> {item.name}
              </li>
            )}
          </ul>
        </div>
      </main>
    );
  }
}

ReactDOM.render(
  <TodoList />,
  document.getElementById('root')
);
