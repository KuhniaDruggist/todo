import {v1} from 'uuid';
import {
    addTodolist,
    changeTodolistFilter,
    changeTodolistTitle,
    removeTodolist,
    todolistsReducer
} from './todolists-reducer';
import {TodolistType} from '../App';

let todoListIdFirst = v1();
let todoListIdSecond = v1();

let startState: TodolistType[] = [];

beforeEach(() => {
    startState = [
        {id: todoListIdFirst, title: 'What to learn', filter: 'all'},
        {id: todoListIdSecond, title: 'What to read', filter: 'all'}
    ]
});

test('correct todolist should be removed', () => {
    let endState = todolistsReducer(startState, removeTodolist(todoListIdFirst))

    expect(endState.length).toBe(1);
    expect(endState[0].title).toBe('What to read');
    expect(endState[0].id).toBe(todoListIdSecond);
});

test('correct todolist should be added', () => {
    let newtTodolistTitle = 'What to buy';

    let endState = todolistsReducer(startState, addTodolist(newtTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newtTodolistTitle);
    expect(endState[1].title).toBe('What to read');
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'What to see';

    let endState = todolistsReducer(startState, changeTodolistTitle(todoListIdSecond, newTodolistTitle))

    expect(endState.length).toBe(2);
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let endState = todolistsReducer(startState, changeTodolistFilter(todoListIdSecond, 'completed'))

    expect(endState.length).toBe(2);
    expect(endState[1].filter).toBe('completed');
});