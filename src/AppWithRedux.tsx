import React from 'react';
import Todolist, { TaskType } from './components/Todolist/Todolist';
import { AddItemForm } from './components/AddItemForm/AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { addTodoList, changeTodoListFilter, changeTodoListTitle, removeTodoList } from './ac/todoList';
import { addTask, changeTaskStatus, changeTaskTitle, removeTask } from './ac/tasks';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './store';
import { FilterValuesType } from './components/Todolist/types';

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

function AppWithRedux () {
    const todoLists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todoListsReducer);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasksReducer);
    const dispatch = useDispatch();

    function addTodoListHandler (title: string) {
        dispatch(addTodoList(title));
    }

    function removeTodoListHandler (todoListId: string) {
        dispatch(removeTodoList(todoListId));
    }

    function changeTodoListTitleHandler (title: string, todoListId: string) {
        dispatch(changeTodoListTitle(todoListId, title));
    }

    function changeFilterHandler (filter: FilterValuesType, todoListId: string) {
        dispatch(changeTodoListFilter(todoListId, filter));
    }

    function addTaskHandler (newTitle: string, todoListId: string) {
        dispatch(addTask(newTitle, todoListId));
    }

    function removeTaskHandler (id: string, todoListId: string) {
        dispatch(removeTask(id, todoListId));
    }

    function changeTaskTitleHandler (taskId: string, title: string, todoListId: string) {
        dispatch(changeTaskTitle(taskId, title, todoListId));
    }

    function changeStatusHandler (taskId: string, isDone: boolean, todoListId: string) {
        dispatch(changeTaskStatus(taskId, isDone, todoListId));
    }

    function getTasksForRendering (todoList: TodolistType): TaskType[] {
        switch (todoList.filter) {
            case 'active':
                return tasks[todoList.id].filter(t => !t.isDone);
            case 'completed':
                return tasks[todoList.id].filter(t => t.isDone);
            default:
                return tasks[todoList.id];
        }
    }

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
                        tasks={ getTasksForRendering(tl) }
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
                        placeholder="Add new todo"
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

export default AppWithRedux;
