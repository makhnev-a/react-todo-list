import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";

class App extends React.Component {
    state = {
        todoLists: []
    };

    nextTodoId = 0;

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('todolists', stateAsString);
    };

    restoreState = () => {
        let state = {
            todoLists: []
        };

        let stateAsString = localStorage.getItem('todolists');

        if (stateAsString) {
            state = JSON.parse(stateAsString);
        }

        this.setState(state, () => {
            this.state.todoLists.forEach(todo => {
                if (todo.id >= this.nextTodoId) {
                    this.nextTodoId = todo.id + 1;
                }
            })
        });
    };

    addTodoList = (title) => {
        let newTodoList = {
            id: 4,
            title: title,
            tasks: []
        };

        this.props.createTodoList(newTodoList);
        // let newTodo = {id: this.nextTodoId, title: newText};
        // let newTodos = [...this.state.todoLists, newTodo];
        //
        // this.nextTodoId++;
        // this.setState({todoLists: newTodos}, this.saveState);
    };

    componentDidMount() {
        this.restoreState();
    }

    render = () => {
        let todolists = this.props.todoLists.map((tl, index) =>
            <TodoList
                key={index}
                id={tl.id}
                title={tl.title}
                tasks={tl.tasks}
            />
        );

        return (
            <>
                <div>
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className={'App'}>
                    {todolists}
                </div>
            </>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        todoLists: state.todoLists
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createTodoList: (newTodoList) => {
            let action = {type: 'CREATE_TODOLIST', newTodoList};
            dispatch(action);
        }
    }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;