import React, {useState} from 'react';
import './App.css';
import Todolist from './components/Todolist';

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
    let [tasksTechnologies, setTasksTechnologies] = useState([
        {id: 1, title: 'HTML&CSS', isDone: false},
        {id: 2, title: 'JS', isDone: false},
        {id: 3, title: 'React', isDone: true},
        {id: 4, title: 'Rest API', isDone: true},
        {id: 5, title: 'GraphQL ', isDone: true}
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

    function removeTask(id: number) {
        setTasksTechnologies(tasksTechnologies.filter(task => task.id !== id));
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
