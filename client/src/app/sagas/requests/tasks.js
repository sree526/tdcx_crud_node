import axios from 'axios';
import {put} from 'redux-saga/effects';
export function taskGet(action){
    console.log(action.payload);
    if(action.payload) {
        return axios.get(`/tasks?name=${action.payload}`);
    } else
        return axios.get('/tasks');
}

export function taskPost(action) {
     console.log('task post' +action);
    return axios.post('/tasks',action.payload);

}
export function taskPut(action) {
    console.log('task put' +action);
    return axios.put(`/tasks/${action.payload._id}`,action.payload);

}

export function taskDelete(action) {
    console.log('task delete' +action.payload);
    return axios.delete(`/tasks/${action.payload}`);

}
