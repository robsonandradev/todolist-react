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

  onCheckboxChange( id, done ) {
    let url = this.state.todoListApiHost;
    if( done ) {
      url += "/done/";
    } else {
      url += "/undone/";
    }
    url += id;
    axios.get( url );
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
                <input
                  type="checkbox"
                  id={item._id}
                  checked={ item.done ? "checked" : "" }
                  onChange={() => this.onCheckboxChange( item._id, !item.done )}
                />
                <label onClick={() => this.onCheckboxChange( item._id, !item.done )} >
                  {item.name
                }</label>
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
