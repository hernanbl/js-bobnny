import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItem: {text:'', key:''},
    }
    this.handleInput = this.handleInput.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }

  handleInput(e) {
    const itemText = e.target.value;
    const currentItem = { text: itemText, key: Date.now() }
    this.setState({
      currentItem,
    })
  }

  addItem(e) {
    e.preventDefault();
    const newItem = this.state.currentItem;
    if (newItem.text !== '') {
      const items = [...this.state.items, newItem];
      this.setState({
        items: items,
        currentItem: {text:'', key:''},
      })
    }
  }

  deleteItem(key) {
    const filteredItems = this.state.items.filter(item => item.key !== key);
    this.setState({
      items: filteredItems,
    })
  }

  setUpdate(text, key) {
    const items = this.state.items;
    items.map(item => {
      if (item.key === key) {
        item.text = text;
      }
      return items;
    })
    this.setState({
      items: items,
    })
  }

  render() {
    return (
      <div className="todoListMain">
        <div className="header">
          <form onSubmit={this.addItem}>
            <input type="text" placeholder="Ingresa una tarea" value={this.state.currentItem.text} onChange={this.handleInput}></input>
            <button type="submit">Agregar</button>
          </form>
        </div>
        <TodoItems items={this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate}/>
      </div>
    );
  }
}

class TodoItems extends React.Component {
  constructor(props) {
    super(props);
    this.createTasks = this.createTasks.bind(this);
  }

  createTasks(item) {
    return <li key={item.key}>{item.text} <button onClick={() => this.props.deleteItem(item.key)}>Eliminar</button> <button onClick={(e) => this.editItem(e, item)}>Editar</button></li>
  }

  editItem(e, item) {
    const text = prompt('Edita la tarea', item.text);
    if (text !== null && text !== '') {
      this.props.setUpdate(text, item.key);
    }
  }

  render() {
    const todoEntries = this.props.items;
    const listItems = todoEntries.map(this.createTasks);

    return (
      <ul className="theList">
        {listItems}
      </ul>
    );
  }
}

ReactDOM.render(<TodoList />, document.getElementById('root'));
