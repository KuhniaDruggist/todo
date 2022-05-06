import React, {ChangeEvent} from 'react';
import styles from './Todolist.module.css';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {DeleteForever, HighlightOff} from '@material-ui/icons';
import { FilterValuesType } from './types';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    todoListId: string
    tasks: TaskType[]
    filter: FilterValuesType
    changeTodoTitle: (title: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    addTask: (newTitle: string, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (filter: FilterValuesType, todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
}

function Todolist(props: TodolistPropsType) {
    const removeTodoHandler = () => {
        props.removeTodoList(props.todoListId);
    }
    const changeTodoTitle = (title: string) => {
        props.changeTodoTitle(title, props.todoListId)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.todoListId)
    }
    const onAllFilterHandler = () => props.changeFilter('all', props.todoListId);
    const onActiveFilterHandler = () => props.changeFilter('active', props.todoListId);
    const onCompletedFilterHandler = () => props.changeFilter('completed', props.todoListId);

    const buttonAll = props.filter === 'all' ? 'primary' : 'default';
    const buttonActive = props.filter === 'active' ? 'primary' : 'default';
    const buttonCompleted = props.filter === 'completed' ? 'primary' : 'default';

    return (
        <div>
            <div className={styles.todoHeader}>
                <h3><EditableSpan title={props.title} changeTaskTitle={changeTodoTitle}/></h3>
                <IconButton size="small" onClick={removeTodoHandler}>
                    <DeleteForever/>
                </IconButton>
            </div>
            <AddItemForm placeholder="Add new task" addItem={addTask}/>
            <ul className={styles.list}>
                {
                    props.tasks.map(task => {
                        const onClickHandler = () => props.removeTask(task.id, props.todoListId);
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let taskStatus = e.currentTarget.checked;
                            props.changeTaskStatus(task.id, taskStatus, props.todoListId);
                        }
                        const onChangeTaskTitle = (title: string) => {
                            props.changeTaskTitle(task.id, title, props.todoListId)
                        }

                        return (
                            <li className={task.isDone ? styles.isDone : ''} key={task.id}>
                                <Checkbox size="small"
                                          color="secondary"
                                          checked={task.isDone}
                                          onChange={onChangeStatusHandler}
                                />
                                <EditableSpan title={task.title} changeTaskTitle={onChangeTaskTitle}/>
                                <IconButton size="small" type="button" onClick={onClickHandler} aria-label="delete">
                                    <HighlightOff fontSize="small"/>
                                </IconButton>
                            </li>
                        );
                    })
                }
            </ul>
            <div className={styles.filterButtons}>
                <Button color={buttonAll}
                        variant="contained"
                        size="small"
                        disableElevation
                        onClick={onAllFilterHandler}
                >All
                </Button>
                <Button color={buttonActive}
                        variant="contained"
                        size="small"
                        disableElevation
                        onClick={onActiveFilterHandler}
                >Active
                </Button>
                <Button color={buttonCompleted}
                        variant="contained"
                        size="small"
                        disableElevation
                        onClick={onCompletedFilterHandler}
                >Completed
                </Button>
            </div>
        </div>
    )
}

export default Todolist;
