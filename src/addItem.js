/* jshint esversion: 9 */

import React from 'react';

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

export default AddItem;