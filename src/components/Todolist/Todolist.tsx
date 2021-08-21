import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from './Todolist.module.css'
import {FilterValuesType} from '../../App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    todoListId: string
    tasks: TaskType[]
    removeTodoList: (todoListId: string) => void
    addTask: (newTitle: string, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (filter: FilterValuesType, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: FilterValuesType
}

function Todolist(props: TodolistPropsType) {
    let [titleNewTask, setTitleNewTask] = useState<string>('');
    let [error, setError] = useState<string>('');

    const removeTodoHandler = () => {
        props.removeTodoList(props.todoListId);
    }
    const addTask = () => {
        if(!titleNewTask.trim()) {
            setError('Field is required!');
            return;
        }
        props.addTask(titleNewTask.trim(), props.todoListId);
        setTitleNewTask('');
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleNewTask(e.currentTarget.value);
    }
    const onPressKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error && e.key === ' ') {
            return;
        }

        error && setError('');

        if (e.key === 'Enter') {
            addTask();
        }
    }

    const onAllFilterHandler = ()  => props.changeFilter('all', props.todoListId);
    const onActiveFilterHandler = () => props.changeFilter('active', props.todoListId);
    const onCompletedFilterHandler = () => props.changeFilter('completed', props.todoListId);

    const inputTitleClass = `${styles.input} ${ error ? styles.error : '' }`;

    const buttonAllClass = `${styles.filterButton} ${ props.filter === 'all' ? styles.activeFilterButton : ''}`;
    const buttonActiveClass = `${styles.filterButton} ${ props.filter === 'active' ? styles.activeFilterButton : ''}`;
    const buttonCompletedClass = `${styles.filterButton} ${ props.filter === 'completed' ? styles.activeFilterButton : ''}`;

    return (
        <div className={styles.todoList}>
            <div className={styles.todoHeader}>
                <h3>{props.title}</h3>
                <button className={styles.removeTodoButton} type="button" onClick={ removeTodoHandler }>x</button>
            </div>
            <div>
                <input value={ titleNewTask }
                       className={ inputTitleClass }
                       onChange={ onChangeHandler }
                       onKeyPress={ onPressKeyHandler }/>
                <button className={styles.button} onClick={ addTask }>Add</button>
                <span className={styles.errorMessage}>{error}</span>
            </div>
            <ul className={styles.list}>
                {
                    props.tasks.map(task => {
                        const onClickHandler = () => props.removeTask(task.id, props.todoListId);
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let taskStatus = e.currentTarget.checked;
                            props.changeTaskStatus(task.id, taskStatus, props.todoListId);
                        }

                        return (
                            <li className={task.isDone ? 'isDone' : ''} key={task.id}>
                                <input className={styles.checkbox} type="checkbox" checked={task.isDone} onChange={ onChangeHandler }/>
                                <span>{task.title}</span>
                                <button className={styles.removeButton} type='button' onClick={ onClickHandler }>x</button>
                            </li>
                        );
                    })
                }
            </ul>
            <div className={styles.filterButtons}>
                <button type='button' className={buttonAllClass} onClick={ onAllFilterHandler }>All</button>
                <button type='button' className={buttonActiveClass} onClick={ onActiveFilterHandler }>Active</button>
                <button type='button' className={buttonCompletedClass} onClick={ onCompletedFilterHandler }>Completed</button>
            </div>
        </div>
    )
}

export default Todolist;