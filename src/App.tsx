import React from 'react';
import './App.css';
import Todolist from "./components/Todolist";

const taskListOne = [
    {id: 1, title: "HTML&CSS", isDone: false},
    {id: 2, title: "JS", isDone: false},
    {id: 3, title: "React", isDone: true}
];

const taskListTwo = [
    {id: 1, title: "Batman", isDone: true},
    {id: 2, title: "Agent 007", isDone: false},
    {id: 3, title: "Terminator", isDone: true}
];

function App() {
    return (
        <div className="App">
            <Todolist title={"What to learn"} tasks={taskListOne}/>
            <Todolist title={"Films"} tasks={taskListTwo}/>
        </div>
    );
}

export default App;
