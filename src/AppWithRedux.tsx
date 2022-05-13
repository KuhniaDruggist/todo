import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Todolist } from './components/Todolist/Todolist';
import { AddItemForm } from './components/AddItemForm/AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { addTodoList, changeTodoListFilter, changeTodoListTitle, removeTodoList } from './ac/todoList';
import { addTask, changeTaskStatus, changeTaskTitle, removeTask } from './ac/tasks';

import { AppRootStateType } from './store';
import { FilterValuesType } from './components/Todolist/types';
import { TaskType } from './components/Todolist/Task/types';

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

export const AppWithRedux = () => {
    const todoLists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todoListsReducer);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasksReducer);
    const dispatch = useDispatch();

    const addTodoListHandler = useCallback((title: string) => {
        dispatch(addTodoList(title));
    }, [ dispatch ]);

    const removeTodoListHandler = useCallback((todoListId: string) => {
        dispatch(removeTodoList(todoListId));
    }, [ dispatch ]);

    const changeTodoListTitleHandler = useCallback((title: string, todoListId: string) => {
        dispatch(changeTodoListTitle(todoListId, title));
    }, [ dispatch ]);

    const changeFilterHandler = useCallback((filter: FilterValuesType, todoListId: string) => {
        dispatch(changeTodoListFilter(todoListId, filter));
    }, [ dispatch ]);

    const addTaskHandler = useCallback((newTitle: string, todoListId: string) => {
        dispatch(addTask(newTitle, todoListId));
    }, [ dispatch ]);

    const removeTaskHandler = useCallback((id: string, todoListId: string) => {
        dispatch(removeTask(id, todoListId));
    }, [ dispatch ]);

    const changeTaskTitleHandler = useCallback((taskId: string, title: string, todoListId: string) => {
        dispatch(changeTaskTitle(taskId, title, todoListId));
    }, [ dispatch ]);

    const changeStatusHandler = useCallback((taskId: string, isDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatus(taskId, isDone, todoListId));
    }, [ dispatch ]);

    const todoListsForRendering = todoLists.map(tl => {
        return (
            <Grid
                item
                key={ tl.id }
            >
                <Paper
                    style={ { padding: '15px', width: '290px' } }
                    elevation={ 5 }
                >
                    <Todolist
                        todoListId={ tl.id }
                        title={ tl.title }
                        filter={ tl.filter }
                        tasks={ tasks[ tl.id ] }
                        changeTodoTitle={ changeTodoListTitleHandler }
                        removeTodoList={ removeTodoListHandler }
                        changeFilter={ changeFilterHandler }
                        addTask={ addTaskHandler }
                        removeTask={ removeTaskHandler }
                        changeTaskTitle={ changeTaskTitleHandler }
                        changeTaskStatus={ changeStatusHandler }
                    />
                </Paper>
            </Grid>
        );
    });

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={ { justifyContent: 'space-between' } }>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Trello
                    </Typography>
                    <Button
                        variant="outlined"
                        color="inherit"
                    >
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid
                    style={ {
                        marginTop: '30px',
                        marginBottom: '35px',
                    } }
                >
                    <AddItemForm
                        placeholder="Add a new todo"
                        addItem={ addTodoListHandler }
                    />
                </Grid>
                <Grid
                    container
                    spacing={ 5 }
                >
                    { todoListsForRendering }
                </Grid>
            </Container>

        </div>
    );
}
