import React from 'react';

class TodoListHeader extends React.Component {
    constructor(props) {
        super(props);
        this.newTaskTitleRef = React.createRef();
    }

    onAddTaskClick = () => {
        let newText = this.newTaskTitleRef.current.value;

        this.newTaskTitleRef.current.value = '';
        this.props.onAddTaskClick(newText);
    };

    render = (props) => {
        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">What to Learn</h3>
                <div className="todoList-newTaskForm">
                    <input
                        type="text"
                        placeholder="New task name"
                        ref={this.newTaskTitleRef}
                    />
                    <button
                        onClick={this.onAddTaskClick}
                    >Add
                    </button>
                </div>
            </div>
        );
    }
}

export default TodoListHeader;