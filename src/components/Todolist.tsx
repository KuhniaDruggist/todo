import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from '../App';

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

    const inputTitleClass = `${'input'} ${ error ? 'error' : '' }`;

    const buttonAllClass = `${'filterButton'} ${ props.filter === 'all' ? 'activeFilterButton' : ''}`;
    const buttonActiveClass = `${'filterButton'} ${ props.filter === 'active' ? 'activeFilterButton' : ''}`;
    const buttonCompletedClass = `${'filterButton'} ${ props.filter === 'completed' ? 'activeFilterButton' : ''}`;

    return (
        <div className={'todoList'}>
            <div className='todoHeader'>
                <h3>{props.title}</h3>
                <button className='removeTodoButton' type="button" onClick={ removeTodoHandler }>x</button>
            </div>
            <div>
                <input value={ titleNewTask }
                       className={ inputTitleClass }
                       onChange={ onChangeHandler }
                       onKeyPress={ onPressKeyHandler }/>
                <button className={'button'} onClick={ addTask }>Add</button>
                <span className={'errorMessage'}>{error}</span>
            </div>
            <ul className={'list'}>
                {
                    props.tasks.map(task => {
                        const onClickHandler = () => props.removeTask(task.id, props.todoListId);
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let taskStatus = e.currentTarget.checked;
                            props.changeTaskStatus(task.id, taskStatus, props.todoListId);
                        }

                        return (
                            <li className={task.isDone ? 'isDone' : ''} key={task.id}>
                                <input className={'checkbox'} type="checkbox" checked={task.isDone} onChange={ onChangeHandler }/>
                                <span>{task.title}</span>
                                <button className={'removeButton'} type='button' onClick={ onClickHandler }>x</button>
                            </li>
                        );
                    })
                }
            </ul>
            <div className={'filterButtons'}>
                <button type='button' className={buttonAllClass} onClick={ onAllFilterHandler }>All</button>
                <button type='button' className={buttonActiveClass} onClick={ onActiveFilterHandler }>Active</button>
                <button type='button' className={buttonCompletedClass} onClick={ onCompletedFilterHandler }>Completed</button>
            </div>
        </div>
    )
}

export default Todolist;