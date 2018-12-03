import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'; //bootstrap (bundled)
import './style.css';
import App from './App';

import {createStore} from 'redux';

import {appReducer} from './reducers';

const SAMPLE_TASKS = [
  {id:1, description:'Make a task list', complete:true},
  {id:2, description:'Make another one', complete:true},
  {id:3, description:'Make a task list with Redux', complete:false}, 
];

let store = createStore(appReducer, {tasks: SAMPLE_TASKS})

ReactDOM.render(<App store={store} />, document.getElementById('root'));