import React from 'react';
import TodoListTask from "./TodoListTask";
import PropTypes from 'prop-types';

class TodoListTasks extends React.Component {
    render = () => {
        let tasksElement = this.props.tasks.map(
            task => <TodoListTask
                task={task}
                changeStatus={this.props.changeStatus}
                key={task.title}
            />
        );

        return (
            <div className="todoList-tasks">
                {tasksElement}
            </div>
        );
    }
}

TodoListTask.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        isDone: PropTypes.bool,
        priority: PropTypes.string
    }))
};

export default TodoListTasks;