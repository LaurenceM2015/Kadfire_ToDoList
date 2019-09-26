import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter,  FormGroup, Label, Input } from 'reactstrap';

import './App.css';

class App extends Component {
  // starting with an empty array.
  state = {
    // init the todo array
    todos: [],
    newTodoData: {
      title: ''
    },

    editTodoData: {
      id: '',
      title: '',
      completed: false
    },

    newTodoModal: false,
    editBookModal: false
  }

 // Set the state
  componentWillMount(){
    this._refreshTodos();
  }
  // Defining the method: NewTodoModal.bind(this) to update the state variable called new
  toggleNewTodoModal() {
    this.setState({
      newTodoModal: ! this.state.newTodoModal
    });
  }

  toggleEditTodoModal() {
    this.setState({
      editTodoModal: ! this.state.editTodoModal
    });
  }

  // Create new Todo task
  addTodo() {
    axios.post(' http://localhost:3000/todolist', this.state.newTodosData).then((response) => {
      let { todos } = this.state;

      todos.push(response.data);

      // reset the state hide the modal and
      this.setState({ todos, newTodoModal: false, newTodoData: {
        title: '',
        completed: false

      }});
    });
  }
  
  updateTodo() {
    let { title, completed } = this.state.editTodoData;

    axios.put('http://localhost:3000/' + this.state.editTodokData.id, {
      title, completed
    }).then((response) => {
      this._refreshTodos();

      // to close the modal onClick
      this.setState({
        editTodoModal: false, editTodoData: { id: '', title: '', completed: '' }
      })
     
    });

  }

  editTodo(id, title, completed) {
    this.setState ({
      editTodoData: { id, title, completed}, editTodoModal: ! this.state.editBookModal
    });
  }

  _refreshTodos() {
    axios.get('https://jsonplaceholder.typicode.com/todos').then((response) => {
      this.setState({
        todos: response.data
      })
    });
  }

  deleteTodo(id) {
    axios.delete('http://localhost:3000/' + id).then((response) => {
      this._refreshTodos();
    });
  }


   render () {
     // impliment state in the render method, to map each todoss
     let todos = this.state.todos.map((todo) => {
       // Return a single row
        return (
          <tr key={todo.id}>
            <td>{todo.id}</td>
            <td>{todo.title}</td>
            <td>{todo.completed}</td>
            
            <td>
       
              <Button color="success" size="sm" className="m-2" onClick={this.editTodo.bind(this, todo.id, todo.title, todo.completed)}>Edit</Button>
              <Button color="danger" size="sm" onClick={this.deleteTodo.bind(this, todo.id)}>Delete</Button>
            </td>
          </tr>
        )
     });
    return (
      <div className="App container">
          <h1>Kadfire To Do List with React with reactstrap</h1>

        <Button className="my-3" color="primary" onClick={this.toggleNewTodoModal.bind(this)}>Add A New Task </Button>{' '}
        
        <Modal isOpen={this.state.newTodoModal} toggle={this.toggleNewTodoModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewTodoModal.bind(this)}>Add a new Todo Task</ModalHeader>
          
          <ModalBody>
            <FormGroup>
              
              <Label for="title">Title</Label>
              
              <Input type="text" id="title" value={this.state.newTodoData.title} onChange={(e) => {
                // create unknown function
                // Getting new form data and then setting the title property to the new value of the input, and updating the state
                let { newTodoData } = this.state;
                 newTodoData.title = e.target.value;

                 this.setState({ newTodoData });
              }} />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button className='my-3' color="primary" onClick={this.addTodo.bind(this)}>Add To Do Task</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewTodoModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.editTodoModal} toggle={this.toggleEditTodoModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditTodoModal.bind(this)}>Edit a new Todo</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input id="title" value={this.state.editTodoData.title} onChange={(e) => {
              let { editTodoData } = this.state;

              editTodoData.title = e.target.value;

              this.setState({ editTodoData });
            }} />
          </FormGroup>
        

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateTodo.bind(this)}>Update Todo</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditTodoModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

        <Table responsive>
          <thead>
            <tr>
              
              <th>Id</th>
              <th>Title</th>
              <th>Completed</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {todos}
          </tbody>

        </Table>
      </div>
    );
  }
  
}

export default App;
