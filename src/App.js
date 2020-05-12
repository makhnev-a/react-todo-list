import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";

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

    addTodoList = (newText) => {
        let newTodo = {id: this.nextTodoId, title: newText};
        let newTodos = [...this.state.todoLists, newTodo];

        this.nextTodoId++;
        this.setState({todoLists: newTodos}, this.saveState);
    };

    componentDidMount() {
        this.restoreState();
    }

    render = () => {
        let todolists = this.state.todoLists.map((tl, index) =>
            <TodoList key={index} id={tl.id} title={tl.title}/>);

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

export default App;