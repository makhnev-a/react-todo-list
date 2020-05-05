import React from 'react';
import PropTypes from 'prop-types';

class TodoListTask extends React.Component {
    state = {
        isEditMode: false
    };

    activatedEditMode = () => {
        this.setState({
            isEditMode: true
        });
    };

    deActivatedEditMode = () => {
        this.setState({
            isEditMode: false
        });
    };

    onIsDoneChange = (event) => {
        let isDone = event.currentTarget.checked;

        this.props.changeStatus(this.props.task.id, isDone);
    };

    onIsTitleChange = (event) => {
        let title = event.currentTarget.value;

        this.props.changeTitle(this.props.task.id, title);
    };

    render = () => {
        let taskClass = this.props.task.isDone ? 'todoList-task done' : 'todoList-task';

        return (
            <div className={taskClass}>
                <input
                    type="checkbox"
                    defaultChecked={this.props.task.isDone}
                    onChange={this.onIsDoneChange}
                />
                <span>{this.props.task.id} - </span>
                {
                    this.state.isEditMode
                        ? <input
                            value={this.props.task.title}
                            autoFocus={true}
                            onBlur={this.deActivatedEditMode}
                            onChange={this.onIsTitleChange}
                        />
                        : <span onClick={this.activatedEditMode}>{this.props.task.title}</span>
                }
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