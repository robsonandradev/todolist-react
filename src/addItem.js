import React from 'react';

const AddItem = ( props ) => {
  const newItemRef = React.createRef(null);
  return (
    <div className="sideBySide">
      <button type="button" className="btn btn-primary" id="btnNewItem" data-toggle="modal" data-target="#newItemModal">
        +
      </button>

      <div className="modal fade" id="newItemModal" tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">Add New Item</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body container">
              <div className="row">
                <div className="col-1"></div>
                <input type="text"
                  className="col-7"
                  id="newItem"
                  ref={ newItemRef }
                  onKeyDown={( event ) => {
                    if( event.keyCode === 13 ){
                      props.onClick( newItemRef.current.value );
                      newItemRef.current.value = "";
                    }
                  }}
                />
                <div className="col-1"></div>
                <button className="btn material-icons col-1" title="Add new item"
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
    </div>
  );
};

export default AddItem;