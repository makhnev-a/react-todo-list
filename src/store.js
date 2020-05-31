import {createStore} from "redux";

const initialState = {
    todoLists: [
        {
            id: 1, title: 'CSS', tasks: [
                {id: 0, title: 'sflmsfd', priority: 'low', isDone: false},
                {id: 1, title: 'sflmsfd', priority: 'high', isDone: true}
            ]
        },
        {
            id: 2, title: 'HTML', tasks: [
                {id: 0, title: 'sflmsfd', priority: 'high', isDone: true},
                {id: 1, title: 'sflmsfd', priority: 'low', isDone: false}
            ]
        },
        {
            id: 3, title: 'JS', tasks: [
                {id: 0, title: 'sflmsfd', priority: 'low', isDone: true},
                {id: 1, title: 'sflmsfd', priority: 'high', isDone: false}
            ]
        }
    ]
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_TODOLIST":
            return {
                ...state,
                todoLists: [...state.todoLists, action.newTodoList]
            }
        case 'ADD_TASK':
            return {
                ...state, todoLists: state.todoLists.map(todo => {
                    if (todo.id !== action.todoListId) {
                        return todo;
                    } else {
                        return {...todo, tasks: [...todo.tasks, action.newTask]};
                    }
                })
            };
        case 'CHANGE_TASK':
            return {
                ...state, todoLists: state.todoLists.map(todo => {
                    if (todo.id !== action.todoListId) {
                        return todo;
                    } else {
                        return {...todo, tasks: todo.tasks.map((task) => {
                            if (task.id !== action.taskId) {
                                return task;
                            } else {
                                return {
                                    ...task,
                                    ...action.obj
                                };
                            }
                            })};
                    }
                })
            };
        case 'REMOVE_TASK_BY_ID':
            return {
                ...state,
                todoLists: state.todoLists.filter(el => el.id !== action.todoListId)
            };
        default:
            return state;

    }
};

const store = createStore(reducer);

export default store;