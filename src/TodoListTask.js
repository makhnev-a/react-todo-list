import React from 'react';

class TodoListTask extends React.Component {
    constructor(props) {
        super(props);

        this.props = {};
        this.props.title = props.title;
        this.props.isDone = props.isDone;
        this.props.priority = props.priority;
    }

    render = () => {
        return (
            <div className="todoList-task">
                <input type="checkbox" checked={this.props.isDone}/>
                <span>{this.props.title}</span>
                <span>
                    <b>priority = </b>{this.props.priority}
                </span>
            </div>
        );
    }
}

export default TodoListTask;