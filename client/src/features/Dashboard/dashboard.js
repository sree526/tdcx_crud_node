import React, {useEffect, useState} from 'react';
// import {Button} from "react-bootstrap";
import {logout} from "../Admin/LoginSlice";
import { useSelector, useDispatch } from 'react-redux';
import {getTasks, deleteTasks,putTasks} from "./dashboardSlice";
import { useHistory } from "react-router";
import {TaskChart} from './tasksChart';
import  './dashboard.css';
import {TaskModal} from './taskModal';
export function Dashboard(){
    const dispatch = useDispatch();
    const history = useHistory();
    const tasks = useSelector(state => state.tasks.tasks);
    const taskStatus = useSelector(state => state.tasks.taskStatus);
    const [showModal,setshowModal] = useState(false);
    const [topTasks,setTopTasks] = useState([]);
    const [selectedTask,setSelectedTask] = useState(null);
    const totaltasks = tasks.length;
    const completedTasks = tasks.filter((x,i) => { return x.completed; }).length;
    const logoutFromApp = (e) => {
        e.preventDefault();
        dispatch(logout());

    };
    const switchRoute = (e) => {
        history.push('/mentor');

    };
    function deletetaskWithId(index){
        let id = tasks[index]._id;
        dispatch(deleteTasks(id));
    }
    function editTask(index){
        let id = tasks[index]._id;
        history.push(`/mentor/${id}`);
    }
    useEffect(()=>{
        dispatch(getTasks());
    },[]);

    const sendTasktoModal= (task) => {
        setSelectedTask(task);
        setshowModal(true);
    };
    const updateTask =(e,task) => {
        console.log(e.target.checked);
        console.log(task);
        let newtask = {...task};
        newtask.completed = e.target.checked;
        console.log(newtask);
        dispatch(putTasks(newtask));
    };
    const searchTask =(e) => {
        console.log(e.target.value);
        dispatch(getTasks(e.target.value));
    }
    useEffect(()=>{
        console.log(tasks);
        let topTasks = [...tasks];
        topTasks.sort((a,b) => (a.createdAt < b.createdAt) ? 1 : ((b.createdAt < a.createdAt) ? -1 : 0));
        let top3 = topTasks.slice(0,3);
        console.log(top3);
        setTopTasks((prevState => ([
            ...top3
        ])));
    },[tasks]);
    return (
        <div className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <h5>Welcome</h5>
                <div className="ml-auto">
                    <button type="button" className="btn btn-light" onClick={logoutFromApp}>Logout</button>
                </div>
            </nav>
            {tasks.length >0 || taskStatus !== ''?<React.Fragment>
                <div className="row justify-content-center align-items-center">
                    <div className="card topcards col-sm-12 col-md-3 p-3 mb-2 mb-sm-0  ml-md-2 mt-5 bg-white ">
                        <div className="card-body">
                            <h5 className="cardtitle">Tasks Completed</h5>
                            <span><h2>{completedTasks}/{totaltasks}</h2></span>
                        </div>
                    </div>
                    <div className="card topcards col-sm-12 col-md-3 p-3 ml-md-2 mb-2 mb-sm-0 mt-md-5 bg-white">
                        <div className="card-body">
                            <h5 className="cardtitle"> Latest Tasks Created</h5>
                            <ul>
                                {topTasks.length>0?topTasks.map((task)=>
                                    <li key={task._id}>
                                        <span className={task.completed===true?`lineText`:'textColor'}>{task.task}</span>
                                    </li>
                                ):null}
                            </ul>
                        </div>
                    </div>
                    <div className="card topcards col-sm-12 col-md-3 p-3 ml-md-2 mb-2 mb-sm-0  mt-md-5 bg-white">
                        <div className="card-body">
                            <TaskChart completedTasks={completedTasks} tasks={tasks.length}/>
                        </div>
                    </div>
                </div>
                <div className="row offset-md-1 col-md-9 col-sm-12 mt-5">
                    <span className='taskHeader offset-md-1 col-md-3 col-sm-12 mb-2 mb-sm-0'>Tasks</span>
                    <input type="text" className="form-control col-md-2 col-sm-12 ml-md-auto mb-2 mb-sm-0" id="task"
                           placeholder="search task" name="task" onChange={searchTask}/>
                    <button className="btn btn-primary btnColor ml-md-2 ml-sm-0 col-md-2 col-sm-12 mt-md-0 mt-sm-2 mb-2 mb-sm-0 " onClick={() => sendTasktoModal(null)}>New task</button>
                    <TaskModal
                        show={showModal}
                        task={selectedTask}
                        onHide={() => setshowModal(false)}
                    />
                </div>
                <div className="row justify-content-center align-items-center">
                    <div className="card col-md-9 mt-3">
                        <div className="card-body">
                            <div>
                                {tasks.length>0?tasks.map((task, index)=>
                                    <div key={index+"task"} className="row underline col-md-12 col-sm-12 mt-3">
                                        <div className="checkbox">
                                            <input type="checkbox" checked={task.completed} onChange={(e)=> updateTask(e, task)}/><span className={task.completed===true?`taskHeaderwithline col-md-3 col-sm-12`:'taskHeader col-md-3 col-sm-12'}> {task.task}</span>
                                        </div>
                                        <div className="ml-md-auto">
                                            <button type="button" className="btn btn-default" aria-label="Left Align" onClick={()=>deletetaskWithId(index)}>
                                                <span className="fa fa-trash-o fa-lg" aria-hidden="true"></span>
                                            </button>
                                            <button type="button" className="btn btn-default" aria-label="Left Align" disabled={task.completed} onClick={() => sendTasktoModal(task)}>
                                                <span className="fa fa-edit fa-lg" aria-hidden="true"></span>
                                            </button>
                                        </div>
                                    </div>
                                ):null}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>:
                <div className="row notaskCard justify-content-center align-items-center">
                    <div className="card p-3 mb-5 bg-white">
                        <div className="card-body">
                            <h5 className="row card-title loginTitle">You have no tasks</h5>
                            <button className="btn btn-primary btnColor ml-md-2 ml-sm-0 col-md-12 col-sm-12 mt-md-0 mt-sm-2 mb-2 mb-sm-0" onClick={() => sendTasktoModal(null)}>New task</button>
                        </div>
                    </div>

                <TaskModal
                    show={showModal}
                    task={selectedTask}
                    onHide={() => setshowModal(false)}
                />
                </div>}
        </div>


    )
}
