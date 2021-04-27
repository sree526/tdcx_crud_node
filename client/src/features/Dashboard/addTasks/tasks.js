import React, {useEffect, useState} from 'react';
import {  useDispatch,useSelector } from 'react-redux';
import {postTasks, getTask, putTasks} from "../../Dashboard/dashboardSlice";
import { useHistory, useParams } from "react-router";
export function Tasks(){
    const dispatch = useDispatch();
    const {id} = useParams();
    const history = useHistory();
    const mentor = useSelector(state => state.mentors.mentor);
    const [values, setValues] = useState({
        email: '',
        name: '',
        task:''
    });
    const [errors, setErrors] = useState({});
    const [tasks, updateTasks] = useState([]);

    useEffect(()=>{
        console.log(id);
        if(id){
            dispatch(getTask(id));
        }

    },[]);
    useEffect(() => {

        if(mentor && Object.keys(mentor).length>0 && id) {
            setValues(values => ({...values, email: mentor.email, name: mentor.name, task:''}));
            if(mentor.tasks.length>0) {
                console.log(mentor.tasks.length);
                updateTasks(values => ([...values, ...mentor.tasks]));
            }
        }

    }, [mentor]);
    console.log(tasks);
    const valuesChangeEvent= (event)=> {
        setValues((values) => ({
            ...values,
            [event.target.name]: event.target.value,
        }));
    };
    const tasksChangeEvent = () => {
        if(values.task === ''){
            alert('Task cannot be empty');
        } else {
            updateTasks((arr) => ([
                ...arr,
                values.task
            ]));
            setValues((values) => ({
                ...values,
                'task': '',
            }));
        }
    };
    function handleValidation(){
        let errors = {};
        let formIsValid = true;

        //Name
        if(!values["name"]){
            formIsValid = false;
            errors["name"] = "Cannot be empty";
        }

        if(typeof values["name"] !== "undefined"){
            if(!values["name"].match(/^[a-zA-Z]+$/)){
                formIsValid = false;
                errors["name"] = "Only letters";
            }
        }

        if(!values["email"]){
            formIsValid = false;
            errors["email"] = "Cannot be empty";
        }

        if(typeof values["email"] !== "undefined"){
            let lastAtPos = values["email"].lastIndexOf('@');
            let lastDotPos = values["email"].lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && values["email"].indexOf('@@') === -1 && lastDotPos > 2 && (values["email"].length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
            }
        }

        setErrors((prevState) => ({...prevState,name:errors.name, email:errors.email}));
        console.log(errors);
        return formIsValid;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(handleValidation()) {
            let mentordata = {
                name: values.name,
                tasks: tasks,
                email: values.email
            };
            if (id) {
                mentordata._id = id;
                dispatch(putTasks(mentordata));
            } else {
                dispatch(postTasks(mentordata));
            }
            history.push('/dashboard');
        }
    };
    return (
        <div className="container-fluid h-100">
            <div className="row h-100 justify-content-center align-items-center">
                <div className="card col-6 shadow p-3 mb-5 bg-white">
                    <div className="card-body">
                        <h5 className="row card-title">{id?'Update Mentor':'Add New Mentor'}</h5>
                        <form>
                            <div className="form-group row">
                                <input type="text" className="form-control" id="email"
                                       placeholder="Enter email" name="email"  value={values.email} onChange={valuesChangeEvent} required/>
                                <span style={{color: "red"}}>{errors.email}</span>
                            </div>
                            <div className="form-group row">
                            <input type="name" className="form-control" id="name"
                                   placeholder="Enter Name" name="name" value={values.name} onChange={valuesChangeEvent} required/>
                                <span style={{color: "red"}}>{errors.name}</span>
                        </div>
                            <div className="form-group row">
                                {tasks.length>0?<p>List of tasks added</p>:null}
                            </div>

                            <div className="form-group row">
                                <ol>{tasks.length>0?
                                    tasks.map((value, index)=>
                                        <li key={index}>
                                            {value}
                                        </li>
                                    ):'No tasks added'}</ol>
                            </div>
                            <div className="form-group row">
                                <input type="name" className="form-control" id="task"
                                       placeholder="Enter Task" name="task" value={values.task} onChange={valuesChangeEvent}/>
                            </div>
                            <div className="form-group row justify-content-around">
                                <button type="button" className="btn btn-info form-control col-5 px-md-5" onClick={tasksChangeEvent}>Add new task</button>
                                <button type="button" className="btn btn-primary form-control col-5" onClick={handleSubmit}>{id?'Update Mentor':'Add New Mentor'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
