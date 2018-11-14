import React, { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props); //pass up to parent

    //initialize state
    this.state = {
      tasks: [] //SAMPLE_TASKS //store the tasks in the STATE, initialize
    };

  }

  componentDidMount() {
    //fetch('https://api.github.com/repos/info340a-au18/lecture-demos/issues')
    fetch('./tasks.json') //local file
      .then((res) => res.json())
      .then((data) => {
        let issueTasks = data.map((issue) => {
          return {
            id: issue.id,
            description: issue.description,
            complete: false
          }
        })
        this.setState({tasks:issueTasks})        
      })
  }

  toggleComplete = (taskId) => {
    this.setState((currentState) => { //update the state and RE-RENDER
      let updatedTasks = currentState.tasks.map((task) => {
        if(task.id === taskId)
          task.complete = !task.complete;      
        return task;
      })
      return {tasks: updatedTasks}
    })
  }

  addTask = (newDescription) => {
    this.setState((currentState) => {
      let newTask = {
        id: currentState.tasks.length+1,
        description: newDescription,
        complete: false
      }
      currentState.tasks.push(newTask); //add task, better to copy array
      return {tasks: currentState.tasks}
    })
  }

  render() {
    //do data processing
    let incomplete = this.state.tasks.filter((task) => !task.complete);
    //console.log("Number of tasks:", incomplete.length);

    return (
      <div className="container">
        <p className="lead">Things I have to do ({incomplete.length})</p>
        <TaskList howToToggle={this.toggleComplete} tasks={this.state.tasks} />
        <AddTaskForm howToAdd={this.addTask} />
      </div>
    );
  }
}

class TaskList extends Component {  
  render() {
    //do data processing
    let taskComponents = this.props.tasks.map((eachTask) => {
      let singleTask = <Task 
                          key={eachTask.id} 
                          task={eachTask} 
                          howToToggle={this.props.howToToggle}
                          /> //pass callback down
      return singleTask;
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

  handleClick = () => {
    this.props.howToToggle(this.props.task.id);
  }

  render() {
    let thisTask = this.props.task; //can give local name for readability
    return (
      <li className={this.getClassName()} onClick={this.handleClick} >
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
    //let whichElement = event.target;
    //let whatValue = whichElement.value;
    let value = event.target.value;
    console.log("I changed to:", value);
    this.setState({newTask: value})
  }

  handleClick = (event) => {
    event.preventDefault();
    this.props.howToAdd(this.state.newTask)
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

export default App;