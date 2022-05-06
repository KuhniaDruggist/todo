import { TasksStateType, TodolistType } from '../App';
import { tasksReducer } from './tasksReducer';
import { todoListsReducer } from './todoListsReducer';
import { addTodoList } from '../ac/todoList';

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodoListsState: TodolistType[] = [];
    const newTodolistName = 'What to see';
    const action = addTodoList(newTodolistName);
    const endTasksState = tasksReducer(startTasksState, action);
    const endTodolistState = todoListsReducer(startTodoListsState, action);
    const keys = Object.keys(endTasksState);
    const idFromTask = keys[0];
    const idFromTodoLists = endTodolistState[0].id;

    expect(idFromTask).toBe(action.newTodolistId);
    expect(idFromTodoLists).toBe(action.newTodolistId);
});
