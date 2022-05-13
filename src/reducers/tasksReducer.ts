import { v1 } from 'uuid';

import { TasksStateType } from '../AppWithRedux';
import { ActionTypes } from './types/types';

import * as A from '../constants/actions';

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionTypes): TasksStateType => {
    switch (action.type) {
        case A.ADD_TASK: {
            const newTask = { id: v1(), title: action.newTitle, isDone: false };
            return {
                ...state,
                [action.todoListId]: [ ...state[action.todoListId], newTask],
            };
        }
        case A.REMOVE_TASK: {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(task => task.id !== action.taskId),
            };
        }
        case A.CHANGE_TASK_TITLE: {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => {
                    return t.id === action.taskId ? { ...t, title: action.newTitle } : t;
                }),
            };
        }
        case A.CHANGE_TASK_STATUS: {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => {
                    return t.id === action.taskId ? { ...t, isDone: action.isDone } : t;
                }),
            }
        }
        case A.ADD_TODO_LIST: {
            return { ...state, [action.newTodolistId]: [] }
        }
        case A.REMOVE_TODO_LIST: {
            delete state[action.todolistId];
            return { ...state };
        }
        default:
            return state;
    }
};
