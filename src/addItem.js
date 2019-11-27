import React from 'react';

const AddItem = ( props ) => {
  const newItemRef = React.createRef(null);
  return (
    <div className="sideBySide">
      <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modalExemplo">
        Add Item
      </button>

      <div className="modal fade" id="modalExemplo" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add New Item</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">

              <input type="text"
                id="newItem"
                ref={ newItemRef }
                onKeyDown={( event ) => {
                  if( event.keyCode === 13 ){
                    props.onClick( newItemRef.current.value );
                    newItemRef.current.value = "";
                  }
                }}
              />
              <button className="material-icons" title="Add new item"
                onClick={ () => {
                  props.onClick( newItemRef.current.value );
                  newItemRef.current.value = "";
                }}>
                playlist_add
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItem;