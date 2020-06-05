import React from 'react';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import AddNewItemForm from "./AddNewItemForm";
import './App.css';
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";
import {ADD_TASK, CHANGE_TASK, REMOVE_TASK_BY_ID, REMOVE_TODOLIST_BY_ID} from "./reduser";
import {addTaskAc, changeTaskAc, removeTaskById, removeTodoListByIdAc} from "./store";

class TodoList extends React.Component {
    state = {
        filterValue: 'All'
    };

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
            id: this.props.tasks.length + 1
            // id: (new Date()).getTime() // Как вариант
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

    // Для фильтрации тасок
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
            dispatch(addTaskAc(todoListId, newTask));
        },
        changeTask: (todoListId, taskId, obj) => {
            dispatch(changeTaskAc(todoListId, taskId, obj));
        },
        removeTodoListById: (todoListId) => {
            dispatch(removeTodoListByIdAc(todoListId));
        },
        removeTaskById: (todoListId, taskId) => {
            dispatch(removeTaskById(todoListId, taskId));
        }
    }
}

export default connect(null, mapDispatchToProps)(TodoList);