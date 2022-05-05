import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

export const removeTodoList = (todolistId: string) => ({type: 'REMOVE-TODOLIST', todolistId} as const);
export const addTodoList = (newTodolistTitle: string) => ({
    type: 'ADD-TODOLIST',
    newTodolistTitle,
    newTodolistId: v1()
} as const);
export const changeTodoListTitle = (todolistId: string, newTodolistTitle: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    todolistId,
    newTodolistTitle
} as const);
export const changeTodoListFilter = (todolistId: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    todolistId,
    filter
} as const);

type ActionsType =
    ReturnType<typeof removeTodoList>
    | ReturnType<typeof addTodoList>
    | ReturnType<typeof changeTodoListTitle>
    | ReturnType<typeof changeTodoListFilter>

export const todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId)
        case 'ADD-TODOLIST':
            const stateCopy = [...state]
            return [
                ...stateCopy,
                {id: action.newTodolistId, title: action.newTodolistTitle, filter: 'all'}
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