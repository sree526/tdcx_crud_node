import {takeLatest} from 'redux-saga/effects';
import {login} from '../../features/Admin/LoginSlice';
import {handleLogin} from "./handlers/login";
import {getTasks,deleteTasks, postTasks,putTasks} from '../../features/Dashboard/dashboardSlice';
import {handleTaskDelete, handleTaskGet, handleTaskPost, handleTaskPut} from "./handlers/tasks";

export function *watcherSaga(){
    yield takeLatest(login, handleLogin);
    yield takeLatest(getTasks, handleTaskGet);
    yield takeLatest(postTasks, handleTaskPost);
    yield takeLatest(deleteTasks, handleTaskDelete);
    yield takeLatest(putTasks, handleTaskPut);
}
