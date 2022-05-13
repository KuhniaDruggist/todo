import React, { useCallback } from 'react';
import styles from './Todolist.module.css';
import { AddItemForm } from '../AddItemForm/AddItemForm';
import { EditableSpan } from '../EditableSpan/EditableSpan';
import { Task } from './Task/Task';
import { Button, IconButton } from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';

import { getTasksForRendering } from '../../utils/getTasksForRendering';

import { FilterValuesType } from './types';
import { TaskType } from './Task/types';

import * as C from '../../constants/constants';

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

export const Todolist = React.memo((props: TodolistPropsType) => {
    const { addTask, changeFilter, changeTodoTitle, removeTodoList, todoListId } = props;

    const removeTodoHandler = useCallback(() => {
        removeTodoList(todoListId)
    }, [ removeTodoList, todoListId ]);

    const changeTodoTitleHandler = useCallback((title: string) => {
        changeTodoTitle(title, todoListId);
    }, [ changeTodoTitle, todoListId ]);

    const addTaskHandler = useCallback((title: string) => {
        addTask(title, todoListId);
    }, [ addTask, todoListId ]);

    const onAllFilterHandler = useCallback(() => {
        changeFilter(C.ALL, todoListId);
    }, [ changeFilter, todoListId ]);

    const onActiveFilterHandler = useCallback(() => {
        changeFilter(C.ACTIVE, todoListId);
    }, [ changeFilter, todoListId ]);

    const onCompletedFilterHandler = useCallback(() => {
        changeFilter(C.COMPLETED, todoListId);
    }, [ changeFilter, todoListId ]);

    const getActiveFilter = (filterType: FilterValuesType) => {
       return props.filter === filterType ? 'primary' : 'default';
    };

    return (
        <div>
            <div className={ styles.todoHeader }>
                <h3>
                    <EditableSpan
                        title={ props.title }
                        changeTaskTitle={ changeTodoTitleHandler }
                    />
                </h3>
                <IconButton
                    size="small"
                    onClick={ removeTodoHandler }
                >
                    <DeleteForever/>
                </IconButton>
            </div>
            <AddItemForm
                placeholder="Add a new task"
                addItem={ addTaskHandler }
            />
            <ul className={ styles.list }>
                {
                    getTasksForRendering(props.tasks, props.filter).map(task =>
                        <Task
                            key={ task.id }
                            todoListId={ todoListId }
                            task={ task }
                            removeTask={ props.removeTask }
                            changeTaskTitle={ props.changeTaskTitle }
                            changeTaskStatus={ props.changeTaskStatus }
                        />
                    )
                }
            </ul>
            <div className={ styles.filterButtons }>
                <Button
                    color={ getActiveFilter(C.ALL) }
                    variant="contained"
                    size="small"
                    disableElevation
                    onClick={onAllFilterHandler}
                >All
                </Button>
                <Button
                    color={getActiveFilter(C.ACTIVE)}
                    variant="contained"
                    size="small"
                    disableElevation
                    onClick={onActiveFilterHandler}
                >Active
                </Button>
                <Button
                    color={getActiveFilter(C.COMPLETED)}
                    variant="contained"
                    size="small"
                    disableElevation
                    onClick={onCompletedFilterHandler}
                >Completed
                </Button>
            </div>
        </div>
    )
});
