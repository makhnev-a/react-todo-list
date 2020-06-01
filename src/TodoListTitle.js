import React from 'react';

class TodoListTitle extends React.Component {
    onRemoveList = () => {
        this.props.removeTodoListById();
    };

    render = (props) => {
        return (
            <>
                <h3 className="todoList-header__title">{this.props.title} <button onClick={this.onRemoveList}>x</button></h3>
            </>
        );
    }
}

export default TodoListTitle;