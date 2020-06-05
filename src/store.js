import {createStore} from "redux";
import {ADD_TASK, CHANGE_TASK, CREATE_TODOLIST, reducer, REMOVE_TASK_BY_ID, REMOVE_TODOLIST_BY_ID} from "./reduser";

const store = createStore(reducer);

export default store;

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