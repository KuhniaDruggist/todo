import React, {ChangeEvent} from 'react';
import styles from './Todolist.module.css'
import {FilterValuesType} from '../../App';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {EditableSpan} from '../EditableSpan/EditableSpan';

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
    const onAllFilterHandler = ()  => props.changeFilter('all', props.todoListId);
    const onActiveFilterHandler = () => props.changeFilter('active', props.todoListId);
    const onCompletedFilterHandler = () => props.changeFilter('completed', props.todoListId);

    const buttonAllClass = `${styles.filterButton} ${ props.filter === 'all' ? styles.activeFilterButton : ''}`;
    const buttonActiveClass = `${styles.filterButton} ${ props.filter === 'active' ? styles.activeFilterButton : ''}`;
    const buttonCompletedClass = `${styles.filterButton} ${ props.filter === 'completed' ? styles.activeFilterButton : ''}`;

    return (
        <div className={styles.todoList}>
            <div className={styles.todoHeader}>
                <h3><EditableSpan title={props.title} changeTaskTitle={changeTodoTitle}/></h3>
                <button className={styles.removeTodoButton} type="button" onClick={ removeTodoHandler }>x</button>
            </div>
            <AddItemForm addItem={addTask} />
            <ul className={styles.list}>
                {
                    props.tasks.map(task => {
                        const onClickHandler = () => props.removeTask(task.id, props.todoListId);
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let taskStatus = e.currentTarget.checked;
                            props.changeTaskStatus(task.id, taskStatus, props.todoListId);
                        }
                        const changTaskTitle = (title: string) => {
                            props.changeTaskTitle(task.id, title, props.todoListId)
                        }

                        return (
                            <li className={task.isDone ? styles.isDone : ''} key={task.id}>
                                <input className={styles.checkbox}
                                       type="checkbox"
                                       checked={task.isDone}
                                       onChange={ onChangeHandler }
                                />
                                <EditableSpan title={task.title} changeTaskTitle={changTaskTitle}/>
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