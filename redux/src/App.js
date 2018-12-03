import React, { Component } from 'react';

export default class App extends Component {
  constructor(props){
    super(props); //pass up to parent

    //initialize state
    this.state = {
      tasks: this.props.initialTasks
    };
  }

  addTask = (newDescription) => {
    //add additional task
    this.setState((currentState) => {
      let newTask = {
        id: currentState.tasks.length+1,
        description: newDescription,
        complete: false
      }
      let updatedTasks = currentState.tasks.concat(newTask); //returns new array
      return {tasks: updatedTasks}
    })
  }

  toggleComplete = (taskId) => {
    //toggle task completion
    this.setState((currentState) => {
      let modifiedTasks = currentState.tasks.map((task) => {
        if(task.id === taskId){
          //return a new copy, don't modify what we have!
          let copy = {...task, complete: !task.complete}
          return copy;
        } else {
          return task; //else return same task
        }
      })
    return {tasks: modifiedTasks};
    })
  }

  render() {
    let incomplete = this.state.tasks.filter((task) => !task.complete);
    //console.log("Number of tasks:", incomplete.length);

    return (
      <div className="container">
        <h2>Things <strong>WE</strong> have to do: ({incomplete.length})</h2>
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
    console.log(className)
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