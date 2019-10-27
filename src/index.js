/* jshint esversion: 9 */

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// import './index.css';

const AddItem = ( props ) => {
  return (
    <div>
      <input type="text" id="newItem" />
      <button 
        onClick={ () => props.onClick( document.getElementById( "newItem" ).value ) }>
        Add
      </button>
    </div>
  );
};

const TodoItems = ( props ) => {
  return (
    <ul>
      {props.todoItems.map( item => 
        <li key={item._id}>
          <input
            type="checkbox"
            id={item._id}
            checked={ item.done ? "checked" : "" }
            onChange={() => props.onCheckboxChange( item._id, !item.done, props.todoListApiHost )}
          />
          <label
            onClick={() => props.onCheckboxChange( item._id, !item.done, props.todoListApiHost )}
          >
            {item.name}
          </label>
          <button onClick={ () => props.removeClick( item._id )}>
            Remove
          </button>
        </li>
      )}
    </ul>
  );
};

class TodoList extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      todoListApiHost: "http://localhost:8080",
      todoItems: []
    };
    this.getTodoItems();
  }

  async getTodoItems() {
    const res = await axios.get( `${this.state.todoListApiHost}/list` );
    const items = res.data;
    this.setState({
      todoItems: items
    });
  }

  async onCheckboxChange( id, done, todoListApiHost ) {
    let url = todoListApiHost;
    if( done ) {
      url += "/done/";
    } else {
      url += "/undone/";
    }
    url += id;
    await axios.get( url );
    this.getTodoItems();
  }

  async addItem( itemText ) {
    await axios.post( `${this.state.todoListApiHost}/add`, {
      name: itemText,
      done: false
    });
    this.getTodoItems();
  }

  async removeItem( id ) {
    await axios.get( `${this.state.todoListApiHost}/remove/${id}` );
    this.getTodoItems();
  }

  render() {
    const currentItems = this.state.todoItems.slice();
    return (
      <main role="main" className="container">
        <div className="starter-template">
          <h1> This is React and bootstrap working together </h1>
          <AddItem
            onClick={( itemText ) => this.addItem( itemText )}
          />
          <TodoItems
            todoItems={currentItems}
            onCheckboxChange={( id, done, todoListApiHost ) => this.onCheckboxChange(id, done, todoListApiHost)}
            todoListApiHost={this.state.todoListApiHost}
            removeClick={( id ) => this.removeItem( id )}
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
