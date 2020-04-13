import React from 'react';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import './App.css';

class App extends React.Component {
    state = {
        tasks: [
            {title: "CSS", isDone: true, priority: "low"},
            {title: "JS", isDone: false, priority: "high"},
            {title: "ReactJS", isDone: false, priority: "high"},
            {title: "Patterns", isDone: true, priority: "low"}
        ],
        filterValue: 'Completed'
    };

    constructor(props) {
        super(props);
        this.newTaskTitleRef = React.createRef();
    }

    onAddTaskClick = () => {
        setTimeout(() => {
            let newText = this.newTaskTitleRef.current.value;
            let newTask = {title: newText, isDone: false, priority: 'low'};
            let newTasks = [...this.state.tasks, newTask];

            this.newTaskTitleRef.current.value = '';
            this.setState({tasks: newTasks});
        }, 2000);
    };

    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    {/*<TodoListHeader/>*/}
                    <div className="todoList-header">
                        <h3 className="todoList-header__title">What to Learn</h3>
                        <div className="todoList-newTaskForm">
                            <input ref={this.newTaskTitleRef} type="text" placeholder="New task name"/>
                            <button onClick={this.onAddTaskClick}>Add</button>
                        </div>
                    </div>
                    <TodoListTasks tasks={this.state.tasks}/>
                    <TodoListFooter filterValue={this.state.filterValue}/>
                </div>
            </div>
        );
    }
}

export default App;