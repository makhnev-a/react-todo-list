import React from 'react';

class TodoListHeader extends React.Component {
    constructor(props) {
        super(props);
        this.newTaskTitleRef = React.createRef();
    }

    state = {
        error: false
    };

    onAddTaskClick = () => {
        let newText = this.newTaskTitleRef.current.value;

        if (newText.trim() === "") {
            this.setState({error: true});
        } else {
            this.newTaskTitleRef.current.value = '';
            this.props.onAddTaskClick(newText);
            this.setState({error: false});
        }
    };

    test = () => {
        this.setState({error: false})
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
                        ref={this.newTaskTitleRef}
                        className={classInput}
                        onChange={this.test}
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