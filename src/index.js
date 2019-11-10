/* jshint esversion: 9 */

import React from 'react';
import ReactDOM from 'react-dom';
import AddItem from './addItem';
import TodoItems from './todoItems' ;
import TodoListEvents from './todolistEvents';

class TodoList extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      todoListApiHost: "http://localhost:8080",
      todoItems: []
    };
    new TodoListEvents( this ).getTodoItems();
  }
  
  render() {
    const currentItems = this.state.todoItems.slice();
    const todolistEvents = new TodoListEvents( this );
    return (
      <main role="main" className="container">
        <div className="starter-template">
          <h1> This is React and bootstrap working together </h1>
          <AddItem
            onClick={( itemText ) => todolistEvents.addItem( itemText )}
          />
          <TodoItems
            todoItems={currentItems}
            onCheckboxChange={( id, done, todoListApiHost ) => todolistEvents.onCheckboxChange(id, done, todoListApiHost)}
            todoListApiHost={this.state.todoListApiHost}
            removeClick={( id ) => todolistEvents.removeItem( id )}
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
