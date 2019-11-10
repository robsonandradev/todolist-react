/* jshint esversion: 9 */

import React from 'react';

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
          <i className="material-icons button edit"  title="Edit item"
            onClick={ () => props.editClick( item._id )}
          >
            edit
          </i>
          <i className="material-icons button delete" title="Remove item"
            onClick={ () => props.removeClick( item._id )}
          >
            delete
          </i>
        </li>
      )}
    </ul>
  );
};

export default TodoItems;