import React from 'react';
import PropTypes from 'prop-types';

class TodoListTask extends React.Component {
    render = () => {
        return (
            <div className="todoList-task">
                <input type="checkbox" defaultChecked={this.props.isDone}/>
                <span>{this.props.title}</span>
                <span>
                    <b> priority = </b>{this.props.priority}
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