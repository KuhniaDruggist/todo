import React from "react";
import {FilterValuesType} from '../App';

type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

type TodolistPropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (taskId: number) => void,
    changeFilter: (value: FilterValuesType) => void
}

function Todolist(props: TodolistPropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(task => <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <button type='button' onClick={ () => {props.removeTask(task.id)}}>x</button>
                    </li>)
                }
            </ul>
            <div>
                <button type='button' onClick={ () => {props.changeFilter('all')}}>All</button>
                <button type='button' onClick={ () => {props.changeFilter('active')}}>Active</button>
                <button type='button' onClick={ () => {props.changeFilter('completed')}}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist;