import React from 'react';

class TodoListHeader extends React.Component {
    state = {
        error: false,
        title: ''
    };

    onAddTaskClick = () => {
        let newText = this.state.title.trim();

        if (newText === "") {
            this.setState({error: true});
        } else {
            this.props.onAddTaskClick(newText);
            this.setState({
                error: false,
                title: ''
            });
        }
    };

    onAddTaskEnter = (event) => {
        if (event.key === 'Enter') {
            this.onAddTaskClick();
        }
    };

    onTitleChanged = (event) => {
        this.setState({
            error: false,
            title: event.currentTarget.value
        })
    };

    render = (props) => {
        let classInput = this.state.error ? 'error' : "";

        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">What to Learn</h3>
                <div className="todoList-newTaskForm">
                    <input
                        type="text"
                        placeholder="New task name"
                        value={this.state.title}
                        ref={this.newTaskTitleRef}
                        className={classInput}
                        onChange={this.onTitleChanged}
                        onKeyPress={this.onAddTaskEnter}
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