import React, { Component } from 'react';

import firebase from 'firebase/app'

let jitc = {
  "exampleTask": {
    description: "",
    completed: false
  },
  tasks: {
    "-LSQRUI": {},
    "-LSQlb": {},
  }
}

export default class TaskApp extends Component {
  constructor(props){
    super(props); //pass up to parent

    //initialize state
    this.state = {
      tasks: {}
    };
  }

  componentDidMount() {
    //asynchronously load data!
    // this.messageRef = firebase.database().ref('message')
    this.tasksRef = firebase.database().ref('tasks')
    //this.exampleTaskRef = firebase.database().ref('exampleTask')
    this.tasksRef.on('value', (snapShot) => {
      let theData = snapShot.val()
      this.setState({
        tasks: theData
      })
    })

  }

  addTask = (newDescription) => {
    console.log("Adding new task: ", newDescription);
      let newTask = {
        description: newDescription,
        complete: false
      }

    this.tasksRef.push(newTask)
      .catch((err) => console.log(err.message))      


    //add additional task
    // this.setState((currentState) => {
    //   let newTask = {
    //     id: currentState.tasks.length+1,
    //     description: newDescription,
    //     complete: false
    //   }
    //   currentState.tasks.push(newTask); //add task, better to copy array
    //   return {tasks: currentState.tasks}
    // })
  }

  toggleComplete = (taskId) => {
    let localTask = this.state.tasks[taskId] //local object
    let newStatus = !localTask.complete;

    let taskRef = firebase.database().ref('tasks').child(taskId)
    taskRef.update({complete: newStatus})


    //toggle task completion
    // this.setState((currentState) => { //update the state and RE-RENDER
    //   let updatedTasks = currentState.tasks.map((task) => {
    //     if(task.id === taskId)
    //       task.complete = !task.complete;      
    //     return task;
    //   })
    //   return {tasks: updatedTasks}
    // })
  }

  render() {
    //change this.state.tasks from an {} to an []
    let taskIds = Object.keys(this.state.tasks);
    let taskArray = taskIds.map((id) => {
      let taskObj = this.state.tasks[id]
      taskObj.id = id
      return taskObj
    })
    console.log(taskArray)

    let incomplete = taskArray.filter((task) => !task.complete);
    //console.log("Number of tasks:", incomplete.length);

    return (
      <div className="container">
        <h2>Things <strong>WE</strong> have to do: ({incomplete.length})</h2>
        <TaskList 
          tasks={taskArray} 
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
  //helper method
  getClassName() {
    let className = '';
    if(this.props.task.complete){
      className = 'font-strike';
    }
    return className;    
  }

  //change this in a moment
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