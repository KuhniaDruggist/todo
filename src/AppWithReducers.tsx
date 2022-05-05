import React, {useReducer} from 'react';
import Todolist, {TaskType} from './components/Todolist/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {addTodoList, changeTodoListFilter, changeTodoListTitle, removeTodoList, todolistsReducer} from './state/todolists-reducer';
import {addTask, changeStatus, changeTaskTitle, removeTask, tasksReducer} from './state/tasks-reducer';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

function AppWithReducers() {
    let todoListIdFirst = v1();
    let todoListIdSecond = v1();

    let [todoLists, dispatchToTodoLists] = useReducer(todolistsReducer,[
        {id: todoListIdFirst, title: 'What to learn', filter: 'active'},
        {id: todoListIdSecond, title: 'What to read', filter: 'completed'}
    ]);

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListIdFirst]: [
            {id: v1(), title: 'HTML&CSS', isDone: false},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL ', isDone: true}
        ],
        [todoListIdSecond]: [
            {id: v1(), title: 'Война и мир', isDone: false},
            {id: v1(), title: 'Три товарища', isDone: true},
            {id: v1(), title: 'На западном фронте без перемен', isDone: true}
        ]
    });

    function addTodoListHandler(title: string) {
        const action = addTodoList(title);
        dispatchToTodoLists(action);
        dispatchToTasks(action);
    }

    function removeTodoListHandler(todoListId: string) {
        const action = removeTodoList(todoListId);
        dispatchToTodoLists(action);
        dispatchToTasks(action);
    }

    function changeTodoListTitleHandler(title: string, todoListId: string) {
        dispatchToTodoLists(changeTodoListTitle(todoListId, title));
    }

    function changeFilterHandler(filter: FilterValuesType, todoListId: string) {
        dispatchToTodoLists(changeTodoListFilter(todoListId, filter));
    }

    function addTaskHandler(newTitle: string, todoListId: string) {
        dispatchToTasks(addTask(newTitle, todoListId));
    }

    function removeTaskHandler(id: string, todoListId: string) {
        dispatchToTasks(removeTask(id, todoListId));
    }

    function changeTaskTitleHandler(taskId: string, title: string, todoListId: string) {
        dispatchToTasks(changeTaskTitle(taskId, title, todoListId));
    }

    function changeStatusHandler(taskId: string, isDone: boolean, todoListId: string) {
        dispatchToTasks(changeStatus(taskId, isDone, todoListId));
    }

    function getTasksForRendering(todoList: TodolistType): TaskType[] {
        switch (todoList.filter) {
            case 'active':
                return tasks[todoList.id].filter(t => !t.isDone)
            case 'completed':
                return tasks[todoList.id].filter(t => t.isDone)
            default:
                return tasks[todoList.id]
        }
    }

    const todoListsForRendering = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper style={{padding: '15px', width: '290px'}} elevation={5}>
                    <Todolist
                        todoListId={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={getTasksForRendering(tl)}
                        changeTodoTitle={changeTodoListTitleHandler}
                        removeTodoList={removeTodoListHandler}
                        changeFilter={changeFilterHandler}
                        addTask={addTaskHandler}
                        removeTask={removeTaskHandler}
                        changeTaskTitle={changeTaskTitleHandler}
                        changeTaskStatus={changeStatusHandler}
                    />
                </Paper>
            </Grid>
        );
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Trello
                    </Typography>
                    <Button variant="outlined" color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid style={{
                    marginTop: '30px',
                    marginBottom: '35px'
                }}>
                    <AddItemForm placeholder="Add new todo" addItem={addTodoListHandler}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoListsForRendering}
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithReducers;