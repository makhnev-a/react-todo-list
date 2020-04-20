import React from 'react';
import PropTypes from 'prop-types';

class TodoListTask extends React.Component {
    onIsDoneChange = (event) => {
        let isDone = event.currentTarget.checked;

        this.props.changeStatus(this.props.task, isDone);
    };

    render = () => {
        return (
            <div className="todoList-task">
                <input
                    type="checkbox"
                    defaultChecked={this.props.task.isDone}
                    onChange={this.onIsDoneChange}
                />
                <span>{this.props.task.title}</span>
                <span>
                    <b> priority = </b>{this.props.task.priority}
                </span>
            </div>
        );
    }
}

TodoListTask.propTypes = {
    isDone: PropTypes.bool,
    title: PropTypes.string,
    priority: PropTypes.string
};

export default TodoListTask;