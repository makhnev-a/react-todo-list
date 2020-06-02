import React from 'react';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import AddNewItemForm from "./AddNewItemForm";
import './App.css';
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";

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
        this.props.changeTask(this.props.id, taskId, obj);
    };

    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, {isDone})
    };

    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title})
    };

    addItem = (newText) => {
        let newTask = {
            title: newText,
            isDone: false,
            priority: 'low',
            id: this.props.tasks[this.props.tasks.length - 1].id + 1
        };

        this.props.addTask(this.props.id, newTask);
    };

    removeTodoListById = () => {
        this.props.removeTodoListById(this.props.id);
    };

    removeTaskById = (todoListId, taskId) => {
        this.props.removeTaskById(todoListId, taskId);
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        })
    };

    tasksFilter = () => {
        return this.props.tasks.filter((t) => {
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
                        <TodoListTitle
                            title={this.props.title}
                            removeTodoListById={this.removeTodoListById}
                        />
                        <AddNewItemForm addItem={this.addItem}/>
                    </div>
                    <TodoListTasks
                        removeTaskById={this.removeTaskById}
                        changeStatus={this.changeStatus}
                        changeTitle={this.changeTitle}
                        tasks={this.tasksFilter()}
                        todoListId={this.props.id}
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

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (todoListId, newTask) => {
            let action = {
                type: 'ADD_TASK',
                todoListId, newTask
            };

            dispatch(action);
        },
        changeTask: (todoListId, taskId, obj) => {
            let action = {
                type: 'CHANGE_TASK',
                todoListId, taskId, obj
            };

            dispatch(action);
        },
        removeTodoListById: (todoListId) => {
            let action = {
                type: 'REMOVE_TODOLIST_BY_ID',
                todoListId
            };

            dispatch(action);
        },
        removeTaskById: (todoListId, taskId) => {
            let action = {
                type: 'REMOVE_TASK_BY_ID',
                todoListId,
                taskId
            };

            dispatch(action);
        }
    }
}

export default connect(null, mapDispatchToProps)(TodoList);