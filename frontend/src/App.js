import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Button} from 'react-bootstrap';
// Import Components
import Header from './Components/Header';
import ToDoList from './Components/ToDoList';
import ToDoInput from './Components/ToDoInput';
import Login from './Components/Login';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleCreateUserButtonClick = this.handleCreateUserButtonClick.bind(this);
    this.handleLoginButtonClick = this.handleLoginButtonClick.bind(this);
    this.addTask = this.addTask.bind(this);
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
    this.toggleToDo = this.toggleToDo.bind(this);
    this.saveToDoList = this.saveToDoList.bind(this);
    this.getToDoListFromDatabase = this.getToDoListFromDatabase.bind(this);
    this.logOut = this.logOut.bind(this);
    this.state = {
      error: null,
      username: "",
      password: "",
      token: "", // Saves the jwt to the empty string when state is set
      loggedIn: false, // Renders the todo list if logged in is true or the login page if false
      toDoList: [] // Saves the todolist retrieved from database
    };
  };

  // Functions below sets the state of the username and password to the value that the user has entered
  handleUserNameChange(e) {
    this.setState({username: e.target.value})
  };

  handlePasswordChange(e) {
    this.setState({password: e.target.value})
  };

  // Function below invoked when the user clicks the login button. The jwt is fetched and stored in state and loggedin set to true
  handleLoginButtonClick() {
    fetch("/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
    })
    .then(res => res.json())
    .then(response => {
      this.setState({loggedIn:true, token:response.token})
    })
    .catch(error => console.log('Error:', error))
  };

  // Function invoked when the user clicks the add user button. New user is added to the database
  handleCreateUserButtonClick() {
    fetch("/add", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
    })
    .then(res => res.json())
    .then(response => {
      alert('The user has been added. Please Log In', JSON.stringify(response));
    })
    .catch(error => console.log('Error:', error))
  };

  /*Takes in newTask (input by user) from AddTaskToToDoList component’s state. 
    Makes a copy of the toDoList so the state is not directly manipulated.
    The copy is reassigned to a new array, with copy spread in and the new list item tagged on the end 
  */
  addTask = (newTask) => {
    let copy = [...this.state.toDoList];
    copy.push({ id: this.state.toDoList.length + 1, task: newTask, complete: false });
    this.setState({toDoList:copy});
  };

  // Function to toggle the checkbox of the todo item. 
  // A copy of the list is created. The id of the selected task is found and the status of the completed is toggled
  toggleToDo = (id) => {
    let copy =[...this.state.toDoList];
    const todoList = copy.find(todoList => todoList.id === id);
    todoList.complete = !todoList.complete;
    this.setState({ toDoList: copy });
  }

  // Function clears the completed items from the todoList
  handleClearCompleted() {
    const uncompletedToDos = this.state.toDoList.filter(todo => !todo.complete);
    this.setState({toDoList:uncompletedToDos});
  };

  // Get TodoList
  getToDoListFromDatabase() {
    fetch("/gettodolist", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + this.state.token
      }
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            toDoList: result
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      );
  };

  // Function saves the todolist in the database
  saveToDoList() {
    fetch("/savetodo", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.state.token
      },
      body: JSON.stringify({
        todoList: this.state.toDoList
      }),
    })
    .then(res => res.json())
    .then(response => {
      alert("Your ToDo List has been saved!", JSON.stringify(response))
    })
    .catch(error => console.log("Error", error));
  };

  // sets the loggedin state to false so the login page is rendered
  logOut() {
    this.setState({ loggedIn: false, token: " ", username: " ", password: " ", });
  }

  // If the state of loggedIn is true then the todolist components will render else if the state is false the login page will render
  render() {
    const { loggedIn, toDoList } = this.state;

    if (!loggedIn) {
      return (
        <div id='loginDiv'>
        <Login
          handleUserNameChange={this.handleUserNameChange}
          handlePasswordChange={this.handlePasswordChange}
          handleCreateUserButtonClick={this.handleCreateUserButtonClick}
          handleLoginButtonClick={this.handleLoginButtonClick}
          />
          </div>
      )
    } else {
      return (  
        <div className='todoListDiv'>
          <Header />
          <ToDoInput addTask={this.addTask}/>
          <ToDoList toDoList={toDoList} toggleToDo={this.toggleToDo} getToDoListFromDatabase={this.getToDoListFromDatabase} />
          <div className='mt-3'>
            <Button variant='outline-dark' className='me-5' onClick={this.handleClearCompleted}>Clear Completed</Button>
            <Button variant='outline-dark' className='me-5' onClick={this.saveToDoList}>Save Changes</Button>
            <Button variant='outline-dark' onClick={this.logOut}>Logout</Button>
          </div>
        </div>
      )
    }
  };
};

export default App;