import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from '../App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (newTitle: string) => void
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
}

function Todolist(props: TodolistPropsType) {
    let [titleNewTask, setTitleNewTask] = useState('')

    const addTask = ()  => {
        props.addTask(titleNewTask);
        setTitleNewTask('');
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitleNewTask(e.currentTarget.value);

    const onPressKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) { addTask() }
    }

    const onAllFilterHandler = ()  => props.changeFilter('all')
    const onActiveFilterHandler = () => props.changeFilter('active')
    const onCompletedFilterHandler = () => props.changeFilter('completed')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={ titleNewTask }
                       onChange={ onChangeHandler }
                       onKeyPress={ onPressKeyHandler }/>
                <button onClick={ addTask }>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(task => {

                        const onClickHandler = () => props.removeTask(task.id)

                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <button type='button' onClick={ onClickHandler }>x</button>
                            </li>
                        );
                    })
                }
            </ul>
            <div>
                <button type='button' onClick={ onAllFilterHandler }>All</button>
                <button type='button' onClick={ onActiveFilterHandler }>Active</button>
                <button type='button' onClick={ onCompletedFilterHandler }>Completed</button>
            </div>
        </div>
    )
}

export default Todolist;