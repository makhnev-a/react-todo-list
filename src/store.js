import {createStore} from "redux";
import {ADD_TASK, CHANGE_TASK, CREATE_TODOLIST, reducer, REMOVE_TASK_BY_ID, REMOVE_TODOLIST_BY_ID} from "./reduser";

const store = createStore(reducer);

export default store;