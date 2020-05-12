import React from 'react';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import AddNewItemForm from "./AddNewItemForm";
import './App.css';
import TodoListTitle from "./TodoListTitle";

class TodoList extends React.Component {
    state = {
        tasks: [],
        filterValue: 'All'
    };

    nextTaskId = 0;

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);

        localStorage.setItem('our-state' + this.props.id, stateAsString);
    };

    restoreState = () => {
        let state = {
            tasks: [],
            filterValue: 'All'
        };

        let stateAsString = localStorage.getItem('our-state' + this.props.id);

        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }

        this.setState(state, () => {
            this.state.tasks.forEach(task => {
                if (task.id >= this.nextTaskId) {
                    this.nextTaskId = task.id + 1;
                }
            })
        });
    };

    componentDidMount() {
        this.restoreState();
    }

    changeTask = (taskId, obj) => {
        let newTasks = this.state.tasks.map(t => {
            if (t.id === taskId) {
                return {...t, ...obj};
            }

            return t;
        });

        this.setState({tasks: newTasks}, this.saveState);
    };

    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, {isDone})
    };

    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title})
    };

    addItem = (newText) => {
        let newTask = {title: newText, isDone: false, priority: 'low', id: this.nextTaskId};
        let newTasks = [...this.state.tasks, newTask];

        this.nextTaskId++;
        this.setState({tasks: newTasks}, this.saveState);
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        })
    };

    tasksFilter = () => {
        return this.state.tasks.filter((t) => {
            if (this.state.filterValue === 'All') {
                return true;
            } else if (this.state.filterValue === 'Completed') {
                return t.isDone === true;
            } else if (this.state.filterValue === 'Active') {
                return t.isDone === false;
            }
        });
    };

    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <div className={'todoList-header'}>
                        <TodoListTitle title={this.props.title}/>
                        <AddNewItemForm addItem={this.addItem}/>
                    </div>
                    <TodoListTasks
                        changeStatus={this.changeStatus}
                        changeTitle={this.changeTitle}
                        tasks={this.tasksFilter()}
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

export default TodoList;