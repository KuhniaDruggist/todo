import {TasksStateType, TodolistType} from '../App';
import {tasksReducer} from './tasks-reducer';
import {addTodoList, todolistsReducer} from './todolists-reducer';

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: TodolistType[] = [];

    const newTodolistName = 'What to see';

    const action = addTodoList(newTodolistName);
    const endTasksState = tasksReducer(startTasksState, action);
    const endTodolistState = todolistsReducer(startTodolistsState, action);

    const keys = Object.keys(endTasksState);
    const idFromTask = keys[0];
    const idFromTodolists = endTodolistState[0].id

    expect(idFromTask).toBe(action.newTodolistId);
    expect(idFromTodolists).toBe(action.newTodolistId);
});