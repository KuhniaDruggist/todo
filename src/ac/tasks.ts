import * as A from '../constants/actions';

export const addTask = (newTitle: string, todoListId: string) => ({
    type: A.ADD_TASK,
    newTitle,
    todoListId,
} as const);

export const removeTask = (taskId: string, todoListId: string) => ({
    type: A.REMOVE_TASK,
    taskId,
    todoListId,
} as const);

export const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => ({
    type: A.CHANGE_TASK_TITLE,
    taskId,
    newTitle,
    todoListId,
} as const);

export const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => ({
    type: A.CHANGE_TASK_STATUS,
    taskId,
    isDone,
    todoListId,
} as const);
