'use strict';

export const ADD_TASK = "add_task";
export const TOGGLE_TASK = "toggle_task";

//an example
let anAction = {type: ADD_TASK, payload: "Description of the new task"};

/* Action Creators */

export function addTask(newDescription) {
    //figure out what the action is
    return {type: ADD_TASK, payload: newDescription};
}

export function toggleTask(taskId) {
    return {type: TOGGLE_TASK, payload: taskId};    
}

