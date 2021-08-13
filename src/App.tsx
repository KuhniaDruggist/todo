import React, {useState} from 'react';
import './App.css';
import Todolist from './components/Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
    let [tasksTechnologies, setTasksTechnologies] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: false},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'React', isDone: true},
        {id: v1(), title: 'Rest API', isDone: true},
        {id: v1(), title: 'GraphQL ', isDone: true}
    ]);

    let [filter, setFilter] = useState<FilterValuesType>('all');

    let tasksForTodoList = tasksTechnologies;

    if (filter === 'active') {
        tasksForTodoList = tasksTechnologies.filter(task => !task.isDone);
    }

    if (filter === 'completed') {
        tasksForTodoList = tasksTechnologies.filter(task => task.isDone);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    function removeTask(id: string) {
        setTasksTechnologies(tasksTechnologies.filter(task => task.id !== id));
    }

    function addTask(newTitle: string) {
        let task = { id: v1(), title: newTitle, isDone: false }
        tasksForTodoList = [task, ...tasksTechnologies]
        setTasksTechnologies(tasksForTodoList)
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasksTechnologies.find(task => task.id === taskId);
        if(task) {
            task.isDone = isDone;
            setTasksTechnologies([...tasksTechnologies])
        }
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      changeFilter={changeFilter}
                      filter={filter}/>
        </div>
    );
}

export default App;
