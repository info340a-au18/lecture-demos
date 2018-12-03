import React, { Component } from 'react';

import * as Action from './actions'

export default class App extends Component {
  constructor(props){
    super(props); //pass up to parent

    //initialize state
    this.state = this.props.store.getState();
  }

  componentDidMount() {
    this.props.store.subscribe(() => { //on update
      this.setState(this.props.store.getState())
    })
  }

  addTask = (newDescription) => {
    let action = Action.addTask(newDescription);
    this.props.store.dispatch(action);
  }

  toggleComplete = (taskId) => {
    this.props.store.dispatch(Action.toggleTask(taskId));
  }

  render() {
    console.log("store", this.props.store.getState());

    let incomplete = this.state.tasks.filter((task) => !task.complete);
    //console.log("Number of tasks:", incomplete.length);

    return (
      <div className="container">
        <h2>Things I have to do: ({incomplete.length})</h2>
        <TaskList 
          tasks={this.state.tasks}
          howToToggle={this.toggleComplete} 
        />
        <AddTaskForm howToAdd={this.addTask} />
      </div>
    );
  }
}

class TaskList extends Component {  
  render() {
    if(this.props.tasks == null) return null; //if no tasks, show nothing

    //do data processing
    let taskComponents = this.props.tasks.map((eachTask) => {
      return (
        <Task 
          key={eachTask.id} 
          task={eachTask} 
          howToToggle={this.props.howToToggle}
        />
      );
    })

    return (
      <ol>
        {taskComponents}
      </ol>
    );
  }
}

class Task extends Component {
  handleClick = () => {
    this.props.howToToggle(this.props.task.id);
  }

  render() {
    let thisTask = this.props.task; //can give local name for readability
    let className = this.props.task.complete ? 'font-strike' : '';
    return (
      <li className={className} onClick={this.handleClick}>
        {thisTask.description}
      </li>
    );
  }
}

class AddTaskForm extends Component {
  constructor(props){
    super(props);
    this.state = {newTask: ''}; //what is typed in
  }

  handleChange = (event) => {    
    let value = event.target.value;
    this.setState({newTask: value})
  }

  handleClick = (event) => {
    event.preventDefault(); //don't actually submit the form
    //take this.state.newTask and add it to the list
    this.props.howToAdd(this.state.newTask);
    this.setState({newTask: ''});
  }

  render() {
    return (
      <form>
        <input 
          className="form-control mb-3"
          placeholder="What else do you have to do?"
          value={this.state.newTask}
          onChange={this.handleChange}
          />
        <button className="btn btn-primary" onClick={this.handleClick}>
          Add task to list
        </button>
      </form>
    );
  }
}