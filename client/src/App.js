import React,{useState} from 'react';
import {Login} from './features/Admin/Login';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import {history} from "../src/app/store";
import { ConnectedRouter } from 'connected-react-router';
import {Dashboard} from "./features/Dashboard/dashboard";
import { Link, Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import AuthRoute from './features/AuthRoute';
import NotFound from "./features/Notfound";
import {Tasks} from "./features/Dashboard/addTasks/tasks";
function App() {
  const authenticated = useSelector(state=> {return state.login.loggedIn});
  return (
      <ConnectedRouter history={history}>
        <Switch>
            <Redirect exact from="/" to="login" />
          <Route
              path="/login"
              render={props => (
                  <Login authenticated={authenticated}  {...props}/>
              )}
          />
          <AuthRoute
              authenticated={authenticated}
              path="/Dashboard"
              render={props => <Dashboard {...props} />}
          />
            <AuthRoute
                authenticated={authenticated}
                path="/task/:id?"
                render={props => <Tasks {...props} />}
            />
          <Route component={NotFound} />
        </Switch>
      </ConnectedRouter>
  );
}

export default App;
