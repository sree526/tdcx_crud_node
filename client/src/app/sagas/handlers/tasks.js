import {call,put, delay} from 'redux-saga/effects';
import {taskGet, taskPut,taskPost, taskDelete} from "../requests/tasks";
import {updateTasks, removeTasks, updateTask} from "../../../features/Dashboard/dashboardSlice";

export function *handleTaskGet(action) {
    try {
        if(action.payload){
            yield delay(300);
        }
        const res = yield call(taskGet, action);
        console.log(res.data);
        yield put(updateTasks(res.data));
    } catch(err){
        console.log(err);
    }
}

export function *handleTaskPost(action) {
    try {
        console.log(action);
        const res = yield call(taskPost, action);
        yield put(updateTasks(res.data));
        console.log(res);
    } catch(err) {
        console.log(err);
    }
}

export function *handleTaskPut(action) {
    try {
        console.log(action);
        const res = yield call(taskPut, action);
        yield put(updateTask(res.data));
        console.log(res);
    } catch(err) {
        console.log(err);
    }
}

export function *handleTaskDelete(action) {
    try {
        console.log(action);
        const res = yield call(taskDelete, action);
        yield put(removeTasks(res.data));
        console.log(res);
    } catch(err) {
        console.log(err);
    }
}

