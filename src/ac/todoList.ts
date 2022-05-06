import { v1 } from 'uuid';

import { FilterValuesType } from '../components/Todolist/types';

import * as A from '../constants/actions';

export const addTodoList = (newTodolistTitle: string) => ({
    type: A.ADD_TODO_LIST,
    newTodolistTitle,
    newTodolistId: v1(),
} as const);

export const removeTodoList = (todolistId: string) => ({
    type: A.REMOVE_TODO_LIST,
    todolistId,
} as const);

export const changeTodoListTitle = (todolistId: string, newTodolistTitle: string) => ({
    type: A.CHANGE_TODO_LIST_TITLE,
    todolistId,
    newTodolistTitle,
} as const);

export const changeTodoListFilter = (todolistId: string, filter: FilterValuesType) => ({
    type: A.CHANGE_TODO_LIST_FILTER,
    todolistId,
    filter,
} as const);
