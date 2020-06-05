export const CREATE_TODOLIST = 'CREATE_TODOLIST';
export const ADD_TASK = 'ADD_TASK';
export const CHANGE_TASK = 'CHANGE_TASK';
export const REMOVE_TODOLIST_BY_ID = 'REMOVE_TODOLIST_BY_ID';
export const REMOVE_TASK_BY_ID = 'REMOVE_TASK_BY_ID';

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

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TODOLIST:
            return {
                ...state,
                todoLists: [...state.todoLists, action.newTodoList]
            }
        case ADD_TASK:
            return {
                ...state, todoLists: state.todoLists.map(todo => {
                    if (todo.id !== action.todoListId) {
                        return todo;
                    } else {
                        return {...todo, tasks: [...todo.tasks, action.newTask]};
                    }
                })
            };
        case CHANGE_TASK:
            return {
                ...state, todoLists: state.todoLists.map(todo => {
                    if (todo.id !== action.todoListId) {
                        return todo;
                    } else {
                        return {
                            ...todo, tasks: todo.tasks.map((task) => {
                                if (task.id !== action.taskId) {
                                    return task;
                                } else {
                                    return {
                                        ...task,
                                        ...action.obj
                                    };
                                }
                            })
                        };
                    }
                })
            };
        case REMOVE_TODOLIST_BY_ID:
            return {
                ...state,
                todoLists: state.todoLists.filter(el => el.id !== action.todoListId)
            };
        case REMOVE_TASK_BY_ID:
            return {
                ...state,
                todoLists: state.todoLists.map((todoList) => {
                    if (todoList.id === action.todoListId) {
                        return {
                            ...todoList,
                            tasks: todoList.tasks.filter((task) => task.id !== action.taskId)
                        };
                    } else {
                        return todoList;
                    }
                })
            };
        default:
            return state;
    }
};

export const addTaskAc = (todoListId, newTask) => {
    return {
        type: ADD_TASK,
        todoListId,
        newTask
    };
};

export const changeTaskAc = (todoListId, taskId, obj) => {
    return {
        type: CHANGE_TASK,
        todoListId,
        taskId,
        obj
    };
};

export const removeTodoListByIdAc = (todoListId) => {
    return {
        type: REMOVE_TODOLIST_BY_ID,
        todoListId
    }
};

export const removeTaskById = (todoListId, taskId) => {
    return {
        type: REMOVE_TASK_BY_ID,
        todoListId,
        taskId
    };
};

export const createTodoListAc = (newTodoList) => {
    return {
        type: CREATE_TODOLIST,
        newTodoList
    };
};