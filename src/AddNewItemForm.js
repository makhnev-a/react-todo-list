import React from 'react';

class AddNewItemForm extends React.Component {
    state = {
        error: false,
        title: ''
    };

    onAddItemClick = () => {
        let newText = this.state.title.trim();

        if (newText === "") {
            this.setState({error: true});
        } else {
            this.props.addItem(newText);
            this.setState({
                error: false,
                title: ''
            });
        }
    };

    onKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.onAddItemClick();
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
                <div className="todoList-newTaskForm">
                    <input
                        type="text"
                        placeholder="New item name"
                        value={this.state.title}
                        className={classInput}
                        onChange={this.onTitleChanged}
                        onKeyPress={this.onKeyPress}
                    />
                    <button
                        onClick={this.onAddItemClick}
                    >Add
                    </button>
                </div>
            </div>
        );
    }
}

export default AddNewItemForm;