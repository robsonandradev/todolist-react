import React from 'react';
import ReactDOM from 'react-dom';
import AddItem from './addItem';
import TodoItems from './todoItems' ;
import TodoListEvents from './todolistEvents';
import './index.css';

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
      <main role="main" className="container-fluid">
        <div className="starter-template">
          <h3 className="sideBySide">TodoList</h3>
          <AddItem
            onClick={( itemText ) => todolistEvents.addItem( itemText )}
          />
          <TodoItems
            todoItems={currentItems}
            onCheckboxChange={( id, done, todoListApiHost ) => todolistEvents.onCheckboxChange(id, done, todoListApiHost)}
            todoListApiHost={this.state.todoListApiHost}
            removeClick={( id ) => todolistEvents.removeItem( id )}
            editClick={( id, text ) => todolistEvents.editItem( id, text )}
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
