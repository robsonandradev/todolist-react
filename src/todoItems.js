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
          <button onClick={ () => props.removeClick( item._id )}>
            Remove
          </button>
        </li>
      )}
    </ul>
  );
};

export default TodoItems;