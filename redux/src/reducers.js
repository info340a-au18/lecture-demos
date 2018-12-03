'use strict';

import {combinedReducers, combineReducers} from 'redux';

import * as Action from './actions';

// let store = {tasks: []}

// let anAction = {type: ADD_TASK, payload: "Description of the new task"};
// let anAction2 = {type: ADD_TASK, payload: "second task"};
// let anAction3 = {type: TOGGLE_TASK, payout: 4}

// actions = [anAction, anAction2, anAction3]

// actions.reduce(taskReducer, store)

//reduce each action, applying to the list of tasks
function taskReducer(currentTasksState = [], action) {
    if(action.type === Action.ADD_TASK){
        let newTask = {
            id: currentTasksState.length+1,
            description: action.payload,
            complete: false
          }
          let updatedTasks = currentTasksState.concat(newTask); //returns new array
          return updatedTasks; //here is the new "tasks" state value
    }
    else if(action.type === Action.TOGGLE_TASK){
        let modifiedTasks = currentTasksState.map((task) => {
            if(task.id === action.payload){ //expect payload to be id
              let copy = {...task, complete: !task.complete}
              return copy;
            } else {
              return task; //else return same task
            }
          })
        return modifiedTasks;
    }
    else { //don't know what type this action is
        return currentTasksState; //don't change anything!
    }
}

export let appReducer = combineReducers({
    tasks: taskReducer
    // users: userReducer 
});
