import { TodolistType } from '../AppWithRedux';
import { ActionTypes } from './types/types';
import * as A from '../constants/actions';

const initialState: TodolistType[] = [];

export const todoListsReducer = (state: TodolistType[] = initialState, action: ActionTypes): TodolistType[] => {
    switch (action.type) {
        case A.ADD_TODO_LIST:
            return [
                ...state,
                { id: action.newTodolistId, title: action.newTodolistTitle, filter: 'all' },
            ];
        case A.REMOVE_TODO_LIST:
            return state.filter(tl => tl.id !== action.todolistId);
        case A.CHANGE_TODO_LIST_TITLE:
            return state.map(tl => tl.id === action.todolistId
                ? { ...tl, title: action.newTodolistTitle }
                : tl);
        case A.CHANGE_TODO_LIST_FILTER:
            return state.map(tl => tl.id === action.todolistId
                ? { ...tl, filter: action.filter }
                : tl);
        default:
            return state;
    }
};
