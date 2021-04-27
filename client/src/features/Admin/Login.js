
import { useSelector, useDispatch } from 'react-redux';
import React, {useEffect, useState} from 'react';
import {login, loginSuccessful} from "./LoginSlice";
import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router";
import  './login.css';
export function Login ({authenticated, location}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const loggedIn = useSelector(state => state.login.loggedIn);
    const [values, setValues] = useState({
        username: '',
        password: ''
    });
    useEffect(()=>{
        dispatch(loginSuccessful(values));
        if(loggedIn){
            history.push('/dashboard');
        }
    },[loggedIn]);
    const valuesChangeEvent= (event)=> {
        setValues((values) => ({
            ...values,
            [event.target.name]: event.target.value,
        }));
    };
    const handleSubmit = (e) => {
        dispatch(login(values));
        history.push('/dashboard');
    };

    return (
        <div className="container-fluid h-100">
            <div className="row h-100 justify-content-center align-items-center">
                <div className="card p-3 mb-5 bg-white">
                    <div className="card-body">
                        <h5 className="row card-title loginTitle">Login</h5>
                <form>
                    <div className="form-group row">
                        <input type="text" className="form-control" id="email"
                               placeholder="Enter email" name="username"  value={values.username} onChange={valuesChangeEvent}/>
                    </div>
                    <div className="form-group row">
                        <input type="password" className="form-control" id="password"
                               placeholder="Password" name="password" value={values.password} onChange={valuesChangeEvent}/>
                    </div>
                    <div className="form-group row">
                        <button type="button" className="btn btn-primary btnColor form-control" onClick={handleSubmit}>Login</button>
                    </div>
                </form>
                    </div>
                </div>
            </div>
        </div>

)
}

