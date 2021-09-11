import {TasksStateType} from '../App';
import {v1} from 'uuid';

export const removeTask = (id: string, todoListId: string) => ({type: 'REMOVE-TASK', id, todoListId} as const);
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

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let tasksList = state[action.todoListId];
            state[action.todoListId] = tasksList.filter(task => task.id !== action.id);
            return {...state}
        }
        case 'ADD-TASK': {
            let newTask = {id: v1(), title: action.newTitle, isDone: false}
            let taskList = state[action.todoListId];
            state[action.todoListId] = [newTask, ...taskList]
            return {...state}
        }
        case 'CHANGE-TASK-TITLE': {
            let taskList = state[action.todoListId]
            state[action.todoListId] = taskList.map(t => t.id === action.taskId ? {...t, title: action.newTitle} : t);
            return {...state}
        }
        case 'CHANGE-TASK-STATUS': {
            let taskList = state[action.todoListId]
            state[action.todoListId] = taskList.map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t);
            return {...state}
        }
        default:
            throw new Error('Can not find this type of action')
    }
}