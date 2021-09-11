import {v1} from 'uuid';
import {TasksStateType} from '../App';
import {addTask, changeStatus, changeTaskTitle, removeTask, tasksReducer} from './tasks-reducer';

let todoListIdFirst = v1();
let todoListIdSecond = v1();

let startState: TasksStateType = {}

beforeEach(() => {
    startState = {
        [todoListIdFirst]: [
            {id: v1(), title: 'Bread', isDone: false},
            {id: v1(), title: 'Cheese', isDone: false}
        ],
        [todoListIdSecond]: [
            {id: v1(), title: 'House', isDone: false},
            {id: v1(), title: 'Car', isDone: true},
        ]
    }
})

test('correct task should be removed', () => {
    let taskId = startState[todoListIdFirst][0].id;
    let endState = tasksReducer(startState, removeTask(taskId, todoListIdFirst))

    expect(endState[todoListIdFirst].length).toBe(1);
    expect(endState[todoListIdFirst][0].title).toBe('Cheese');
});

test('correct task should be added', () => {
    let newTitle = 'Bike';
    let endState = tasksReducer(startState, addTask(newTitle, todoListIdSecond))

    expect(endState[todoListIdFirst].length).toBe(2);
    expect(endState[todoListIdFirst][0].title).toBe('Bread');
    expect(endState[todoListIdFirst][1].title).toBe('Cheese');
    expect(endState[todoListIdSecond].length).toBe(3);
    expect(endState[todoListIdSecond][0].title).toBe(newTitle);
});

test('correct task should change its name', () => {
    let taskId = startState[todoListIdSecond][0].id;
    let newTitle = 'Big and cozy house';
    let endState = tasksReducer(startState, changeTaskTitle(taskId, newTitle, todoListIdSecond))

    expect(endState[todoListIdFirst].length).toBe(2);
    expect(endState[todoListIdSecond].length).toBe(2);
    expect(endState[todoListIdSecond][0].title).toBe(newTitle);
});

test('correct task should change its status', () => {
    let taskId = startState[todoListIdSecond][0].id;
    let endState = tasksReducer(startState, changeStatus(taskId, true, todoListIdSecond))

    expect(endState[todoListIdFirst].length).toBe(2);
    expect(endState[todoListIdSecond].length).toBe(2);
    expect(endState[todoListIdSecond][0].isDone).toBe(true);
});