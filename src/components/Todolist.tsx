import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from '../App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    addTask: (newTitle: string) => void
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

function Todolist(props: TodolistPropsType) {
    let [titleNewTask, setTitleNewTask] = useState<string>('');
    let [error, setError] = useState<string>('');

    const addTask = ()  => {
        if(!titleNewTask.trim()) {
            setError('Field is required!');
            return;
        }
        props.addTask(titleNewTask.trim());
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

    const onAllFilterHandler = ()  => props.changeFilter('all');
    const onActiveFilterHandler = () => props.changeFilter('active');
    const onCompletedFilterHandler = () => props.changeFilter('completed');

    const inputTitleClass = `${'input'} ${ error ? 'error' : '' }`;

    const buttonAllClass = `${'filterButton'} ${ props.filter === 'all' ? 'activeFilterButton' : ''}`;
    const buttonActiveClass = `${'filterButton'} ${ props.filter === 'active' ? 'activeFilterButton' : ''}`;
    const buttonCompletedClass = `${'filterButton'} ${ props.filter === 'completed' ? 'activeFilterButton' : ''}`;

    return (
        <div>
            <h3>{props.title}</h3>
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
                        const onClickHandler = () => props.removeTask(task.id);
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let taskStatus = e.currentTarget.checked;
                            props.changeTaskStatus(task.id, taskStatus);
                        }

                        return (
                            <li className={task.isDone ? 'isDone' : ''} key={task.id}>
                                <input type="checkbox" checked={task.isDone} onChange={ onChangeHandler }/>
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