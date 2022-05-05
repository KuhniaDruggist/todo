import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {addTodoList, removeTodoList} from './todolists-reducer';

export const removeTask = (taskId: string, todoListId: string) => ({type: 'REMOVE-TASK', taskId, todoListId} as const);
export const addTask = (newTitle: string, todoListId: string) => ({type: 'ADD-TASK', newTitle, todoListId} as const);
export const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => ({
    type: 'CHANGE-TASK-TITLE',
    taskId,
    newTitle,
    todoListId
} as const);
export const changeStatus = (taskId: string, isDone: boolean, todoListId: string) => ({
    type: 'CHANGE-TASK-STATUS',
    taskId, isDone, todoListId
} as const);

type ActionsType =
    ReturnType<typeof removeTask>
    | ReturnType<typeof addTask>
    | ReturnType<typeof changeTaskTitle>
    | ReturnType<typeof changeStatus>
    | ReturnType<typeof addTodoList>
    | ReturnType<typeof removeTodoList>

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasksList = stateCopy[action.todoListId];
            stateCopy[action.todoListId] = tasksList.filter(task => task.id !== action.taskId);
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask = {id: v1(), title: action.newTitle, isDone: false}
            const taskList = stateCopy[action.todoListId];
            stateCopy[action.todoListId] = [newTask, ...taskList]
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            const taskList = stateCopy[action.todoListId]
            stateCopy[action.todoListId] = taskList.map(t => t.id === action.taskId ? {...t, title: action.newTitle} : t);
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            const taskList = stateCopy[action.todoListId]
            stateCopy[action.todoListId] = taskList.map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t);
            return stateCopy
        }
        case 'ADD-TODOLIST': {
            const copyState = {...state}
            return {...copyState, [action.newTodolistId]: []}
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state}
            delete copyState[action.todolistId]
            return copyState
        }
        default:
            throw new Error('Can not find this type of action')
    }
}