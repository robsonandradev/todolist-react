import React from 'react';

const TodoItems = ( props ) => {
  return (
    <div className="container floatNone">
      <ul className="">
        {props.todoItems.map( item => 
          <li key={item._id} className="row">
            <div className="col-1">
              <input
                type="checkbox"
                id={item._id}
                checked={ item.done ? "checked" : "" }
                onChange={() => props.onCheckboxChange( item._id, !item.done, props.todoListApiHost )}
              />
            </div>
            <div className="col-6">
              <label htmlFor={item._id}
                onClick={() => props.onCheckboxChange( item._id, !item.done, props.todoListApiHost )}
              >
                {item.name}
              </label>
            </div>
            <div className="col-4">
              <i className="material-icons button edit"  title="Edit item"
                onClick={ () => props.editClick( item._id, item.name )}
              >
                edit
              </i>
              <i className="material-icons button delete" title="Remove item"
                onClick={ () => props.removeClick( item._id )}
              >
                delete
              </i>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default TodoItems;