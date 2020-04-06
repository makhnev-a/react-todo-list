import React from 'react';
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {
    render = () => {
        let tasksElement = this.props.tasks.map(
            task => <TodoListTask title={task.title} isDone={task.isDone} priority={task.priority}/>
        );

        return (
            <div className="todoList-tasks">
                {tasksElement}
            </div>
        );
    }
}

export default TodoListTasks;