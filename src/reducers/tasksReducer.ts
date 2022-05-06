import { v1 } from 'uuid';

import { TasksStateType } from '../AppWithRedux';
import { ActionTypes } from './types/types';

import * as A from '../constants/actions';

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionTypes): TasksStateType => {
    switch (action.type) {
        case A.ADD_TASK: {
            const stateCopy = { ...state };
            const newTask = { id: v1(), title: action.newTitle, isDone: false };
            const taskList = stateCopy[action.todoListId];
            stateCopy[action.todoListId] = [ ...taskList, newTask ];
            return stateCopy;
        }
        case A.REMOVE_TASK: {
            const stateCopy = { ...state };
            const tasksList = stateCopy[action.todoListId];
            stateCopy[action.todoListId] = tasksList.filter(task => task.id !== action.taskId);
            return stateCopy;
        }
        case A.CHANGE_TASK_TITLE: {
            const stateCopy = { ...state };
            const taskList = stateCopy[action.todoListId];
            stateCopy[action.todoListId] = taskList.map(t => t.id === action.taskId ? { ...t, title: action.newTitle } : t);
            return stateCopy;
        }
        case A.CHANGE_TASK_STATUS: {
            const stateCopy = { ...state };
            const taskList = stateCopy[action.todoListId];
            stateCopy[action.todoListId] = taskList.map(t => t.id === action.taskId ? { ...t, isDone: action.isDone } : t);
            return stateCopy;
        }
        case A.ADD_TODO_LIST: {
            const copyState = { ...state };
            return { ...copyState, [action.newTodolistId]: [] };
        }
        case A.REMOVE_TODO_LIST: {
            const copyState = { ...state };
            delete copyState[action.todolistId];
            return copyState;
        }
        default:
            return state;
    }
};
