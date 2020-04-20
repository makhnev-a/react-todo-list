import React from 'react';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListHeader from "./TodoListHeader";
import './App.css';

class App extends React.Component {
    state = {
        tasks: [
            {title: "CSS", isDone: true, priority: "low"},
            {title: "JS", isDone: false, priority: "high"},
            {title: "ReactJS", isDone: false, priority: "high"},
            {title: "Patterns", isDone: true, priority: "low"}
        ],
        filterValue: 'All'
    };

    changeStatus = (task, isDone) => {
        let newTasks = this.state.tasks.map(t => {
            if (t === task) {
                return {...t, isDone: isDone};
            }

            return t;
        });

        this.setState({tasks: newTasks});
    };

    addTask = (newText) => {
        let newTask = {title: newText, isDone: false, priority: 'low'};
        let newTasks = [...this.state.tasks, newTask];

        this.setState({tasks: newTasks});
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        })
    };

    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader
                        onAddTaskClick={this.addTask}
                    />
                    <TodoListTasks
                        changeStatus={this.changeStatus}
                        tasks={this.state.tasks.filter(t => {
                            if (this.state.filterValue === 'All') {
                                return true;
                            } else if (this.state.filterValue === 'Completed') {
                                return t.isDone === true;
                            } else if (this.state.filterValue === 'Active') {
                                return t.isDone === false;
                            }
                        })}
                    />
                    <TodoListFooter
                        changeFilter={this.changeFilter}
                        filterValue={this.state.filterValue}
                    />
                </div>
            </div>
        );
    }
}

export default App;