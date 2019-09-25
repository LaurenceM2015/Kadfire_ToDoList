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
      title: '',

    },
    newTodoModal: false
  }

 // Set the state
  componentWillMount(){
    axios.get('https://jsonplaceholder.typicode.com/todos').then((response) => {
      this.setState({
        todos: response.data
      });
      
       
    });
  }
  // Defining the method: NewTodoModal.bind(this) to update the state variable called new
  toggleNewTodoModal() {
    this.setState({
      newTodoModal: ! this.state.new
    });
  }


   render () {
     // impliment state in the render method, to map each todoss
     let todos = this.state.todos.map((todo) => {
       // Return a single row
        return (
          <tr key={todo.userId}>
            <td>{todo.userId}</td>
            <td>{todo.id}</td>
            <td>{todo.title}</td>
            <td>{todo.completed}</td>
            
            <td>
              <Button color="success" size="sm" className="mr-2">Edit</Button>
              <Button color="danger" size="sm">Delete</Button>
            </td>
          </tr>
        )
     });
    return (
      <div className="App container">
        <Button color="primary" onClick={this.toggleNewTodoModal.bind(this)}>Add A New To Do Task </Button>
        
        <Modal isOpen={this.state.newTodoModal} toggle={this.toggleNewTodoModal.bind(this)}>
          

          <ModalHeader toggle={this.toggleNewTodoModal.bind(this)}>Add a new Todo Task</ModalHeader>
          
          <ModalBody>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input type="text" id="title" value={this.state.newTodoData.title} onChange={(e) => {

                // Getting new form data and then setting the title property to the new value of the input, and updating the state
                let { newTodoData } = this.state;
                 newTodoData.title = e.target.value;

                 this.setState({ newTodoData });
              }} />
            </FormGroup>

           

              

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleNewTodoModal.bind(this)}>Add To Do Task</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewTodoModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Id</th>
              <th>Title</th>
              <th>completed</th>
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
