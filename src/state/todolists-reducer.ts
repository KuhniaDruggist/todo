import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

export const removeTodolist = (todolistId: string) => ({type: 'REMOVE-TODOLIST', todolistId} as const);
export const addTodolist = (newTodolistTitle: string) => ({type: 'ADD-TODOLIST', newTodolistTitle} as const);
export const changeTodolistTitle = (todolistId: string, newTodolistTitle: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    todolistId,
    newTodolistTitle
} as const);
export const changeTodolistFilter = (todolistId: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    todolistId,
    filter
} as const);

type ActionsType =
    ReturnType<typeof removeTodolist>
    | ReturnType<typeof addTodolist>
    | ReturnType<typeof changeTodolistTitle>
    | ReturnType<typeof changeTodolistFilter>

export const todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId)
        case 'ADD-TODOLIST':
            return [
                ...state,
                {id: v1(), title: action.newTodolistTitle, filter: 'all'}
            ]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.todolistId
                ? {...tl, title: action.newTodolistTitle}
                : tl);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.todolistId
                ? {...tl, filter: action.filter}
                : tl);
        default:
            throw new Error('Can not find this type of action')
    }
}