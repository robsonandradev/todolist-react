/* jshint esversion: 9 */
import axios from 'axios';

class TodoListEvents {
  constructor( todolist ) {
    this.todolist = todolist;
    this.state = todolist.state;
  }

  async getTodoItems() {
    const res = await axios.get( `${this.state.todoListApiHost}/list` );
    const items = res.data;
    this.todolist.setState({
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
    this.todolist.setState({
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
      this.todolist.setState({
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
    this.todolist.setState({
      todoItems: tlFiltered
    });
  }
}

export default TodoListEvents;