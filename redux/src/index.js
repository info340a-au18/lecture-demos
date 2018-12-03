import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'; //bootstrap (bundled)
import './style.css';
import App from './App';

const SAMPLE_TASKS = [
  {id:1, description:'Make a task list', complete:true},
  {id:2, description:'Make another one', complete:true},
  {id:3, description:'Make a task list with Redux', complete:false}, 
];

ReactDOM.render(<App initialTasks={SAMPLE_TASKS} />, document.getElementById('root'));