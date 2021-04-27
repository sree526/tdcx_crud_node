import axios from 'axios';

export function requestLogin(action){
    console.log('login' +action.payload);
    return axios.post('/login',action.payload);
}

