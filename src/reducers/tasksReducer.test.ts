import { v1 } from 'uuid';
import { tasksReducer } from './tasksReducer';

import { TasksStateType } from '../App';
import { addTask, changeTaskStatus, changeTaskTitle, removeTask } from '../ac/tasks';
import { addTodoList, removeTodoList } from '../ac/todoList';

const todoListIdFirst: string = v1();
const todoListIdSecond: string = v1();

let startState: TasksStateType = {};

beforeEach(() => {
    startState = {
        [todoListIdFirst]: [
            { id: v1(), title: 'Bread', isDone: false },
            { id: v1(), title: 'Cheese', isDone: false },
        ],
        [todoListIdSecond]: [
            { id: v1(), title: 'House', isDone: false },
            { id: v1(), title: 'Car', isDone: true },
        ],
    };
});

test('correct task should be removed', () => {
    const taskId = startState[todoListIdFirst][0].id;
    const endState = tasksReducer(startState, removeTask(taskId, todoListIdFirst))

    expect(endState[todoListIdFirst].length).toBe(1);
    expect(endState[todoListIdFirst][0].title).toBe('Cheese');
    expect(endState[todoListIdFirst].every(t => t.id !== taskId)).toBeTruthy();
    expect(endState[todoListIdSecond].length).toBe(2);
});

test('correct task should be added', () => {
    const newTitle = 'Bike';
    const endState = tasksReducer(startState, addTask(newTitle, todoListIdSecond))

    expect(endState[todoListIdFirst].length).toBe(2);
    expect(endState[todoListIdFirst][0].title).toBe('Bread');
    expect(endState[todoListIdFirst][1].title).toBe('Cheese');
    expect(endState[todoListIdSecond].length).toBe(3);
    expect(endState[todoListIdSecond][2].title).toBe(newTitle);
});

test('correct task should change its name', () => {
    const taskId = startState[todoListIdSecond][0].id;
    const newTitle = 'Big and cozy house';
    const endState = tasksReducer(startState, changeTaskTitle(taskId, newTitle, todoListIdSecond))

    expect(endState[todoListIdFirst].length).toBe(2);
    expect(endState[todoListIdSecond].length).toBe(2);
    expect(endState[todoListIdSecond][0].title).toBe(newTitle);
});

test('correct task should change its status', () => {
    const taskId = startState[todoListIdSecond][0].id;
    const endState = tasksReducer(startState, changeTaskStatus(taskId, true, todoListIdSecond))

    expect(endState[todoListIdFirst].length).toBe(2);
    expect(endState[todoListIdSecond].length).toBe(2);
    expect(endState[todoListIdSecond][0].isDone).toBe(true);
});

test('new property with new array should be added when new todolist is added', () => {
    const newtTodolistTitle = 'New todolist title';
    const endState = tasksReducer(startState, addTodoList(newtTodolistTitle));
    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== todoListIdFirst && k !== todoListIdSecond);
    if (!newKey) {
        throw Error('new key should be added');
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
    const endState = tasksReducer(startState, removeTodoList(todoListIdFirst));
    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState[todoListIdFirst]).not.toBeDefined();
});
