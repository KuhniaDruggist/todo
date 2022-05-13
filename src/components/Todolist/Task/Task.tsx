import React, { ChangeEvent, useCallback } from 'react';
import styles from './Task.module.css';

import { Checkbox, IconButton } from '@material-ui/core';
import { HighlightOff } from '@material-ui/icons';
import { EditableSpan } from '../../EditableSpan/EditableSpan';

import { TaskType } from './types';

type TaskPropsType = {
    todoListId: string
    task: TaskType
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
}

export const Task = React.memo(({ todoListId, task, removeTask, changeTaskTitle, changeTaskStatus }: TaskPropsType) => {
    const onClickHandler = useCallback(() => {
        removeTask(task.id, todoListId)
    }, [ removeTask, task.id, todoListId ]);

    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let taskStatus = e.currentTarget.checked;
        changeTaskStatus(task.id, taskStatus, todoListId);
    }, [ changeTaskStatus, task.id, todoListId ]);

    const onChangeTaskTitle = useCallback((title: string) => {
        changeTaskTitle(task.id, title, todoListId);
    }, [ changeTaskTitle, task.id, todoListId ]);

    return (
        <li className={ task.isDone ? styles.isDone : '' }>
            <Checkbox
                size="small"
                color="secondary"
                checked={ task.isDone }
                onChange={ onChangeStatusHandler }
            />
            <EditableSpan
                title={ task.title }
                changeTaskTitle={ onChangeTaskTitle }
            />
            <IconButton
                size="small"
                type="button"
                onClick={ onClickHandler }
                aria-label="delete"
            >
                <HighlightOff fontSize="small"/>
            </IconButton>
        </li>
    );
});
