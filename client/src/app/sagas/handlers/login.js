import {call,put} from 'redux-saga/effects';
import {requestLogin} from "../requests/login";
import {loginSuccessful,logout} from "../../../features/Admin/LoginSlice";
export function *handleLogin(action) {
    try {
        console.log(action);
        const res = yield call(requestLogin, action);
        console.log(res.data);
        if(res.data !== 'No user found') {
            localStorage.setItem('userId', res.data._id);
            yield put(loginSuccessful(res.data));
        } else throw 'No user found';

    } catch(err){
        console.log(err);
        localStorage.removeItem('userId');
        logout();
    }
}
