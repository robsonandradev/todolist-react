/* jshint esversion: 9 */

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// import './index.css';

const AddItem = ( props ) => {
  const newItemRef = React.createRef(null);
  return (
    <div>
      <input
        type="text"
        id="newItem"
        ref={ newItemRef }
        onKeyDown={( event ) => {
          if( event.keyCode === 13 ){
            props.onClick( newItemRef.current.value ) 
          }
        }}
      />
      <button 
        onClick={ () => props.onClick( newItemRef.current.value ) }>
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
          <label htmlFor={item._id}
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
    const items = this.state.todoItems.slice();
    let url = todoListApiHost;
    if( done ) {
      url += "/done/";
    } else {
      url += "/undone/";
    }
    url += id;
    let changedItem = await axios.get( url );
    changedItem = changedItem.data;
    items.map( item => {
      if( item._id === changedItem._id ) {
        item.done = changedItem.done;
      }
      return item;
    });
    this.setState({
      todoItems: items
    });
  }

  async addItem( itemText ) {
    const items = this.state.todoItems.slice();
    const now = Date.now();
    await axios.post( `${this.state.todoListApiHost}/add`, {
      name: itemText,
      done: false,
      now: now
    });

    const added = await axios.get( `${this.state.todoListApiHost}/find/${itemText}/${now}` );
    const found = items.find( item => {
      return (
        item._id === added.data._id
      );
    });
    if( !found ){
      this.setState({
        todoItems: items.concat( added.data )
      });
    }
  }

  async removeItem( id ) {
    const todoItems = this.state.todoItems.slice();
    await axios.get( `${this.state.todoListApiHost}/remove/${id}` );
    const tlFiltered = todoItems.filter( item => {
      return  item._id !== id;
    });
    this.setState({
      todoItems: tlFiltered
    });
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
