import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {CREATE_TODOLIST} from "./reduser";

class App extends React.Component {
    addTodoList = (title) => {
        let newTodoList = {
            id: 4,
            title: title,
            tasks: []
        };

        this.props.createTodoList(newTodoList);
    };

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
            dispatch({type: CREATE_TODOLIST, newTodoList});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);