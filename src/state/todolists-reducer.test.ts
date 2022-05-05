import {v1} from 'uuid';
import {
    addTodoList,
    changeTodoListFilter,
    changeTodoListTitle,
    removeTodoList,
    todolistsReducer
} from './todolists-reducer';
import {TodolistType} from '../App';

const todoListIdFirst: string = v1();
const todoListIdSecond: string = v1();

let startState: TodolistType[] = [];

beforeEach(() => {
    startState = [
        {id: todoListIdFirst, title: 'What to learn', filter: 'all'},
        {id: todoListIdSecond, title: 'What to read', filter: 'all'}
    ]
});

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodoList(todoListIdFirst))

    expect(endState.length).toBe(1);
    expect(endState[0].title).toBe('What to read');
    expect(endState[0].id).toBe(todoListIdSecond);
});

test('correct todolist should be added', () => {
    const newtTodolistTitle = 'What to buy';

    const endState = todolistsReducer(startState, addTodoList(newtTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newtTodolistTitle);
    expect(endState[1].title).toBe('What to read');
});

test('correct todolist should change its name', () => {
    const newTodolistTitle = 'What to see';

    const endState = todolistsReducer(startState, changeTodoListTitle(todoListIdSecond, newTodolistTitle))

    expect(endState.length).toBe(2);
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    const endState = todolistsReducer(startState, changeTodoListFilter(todoListIdSecond, 'completed'))

    expect(endState.length).toBe(2);
    expect(endState[1].filter).toBe('completed');
});