import {Modal,ModalTitle} from "react-bootstrap";
import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import {postTasks,putTasks} from './dashboardSlice';
export function TaskModal(props) {
    console.log(props.task);
    const [name,setName] = useState( '');
    const dispatch = useDispatch();
    const handleChange = (e) =>
        setName(e.target.value);
    const createTask = () => {
      let task = {
          _id:props.task?props.task._id:undefined,
          task:name,
          completed:false
      };
      if(props.task){
          dispatch(putTasks(task));
      }else {
          dispatch(postTasks(task));
      }
    props.onHide();
    };
    useEffect(() => {
        console.log(props.task);
        if(props.task) {
            setName(props.task.task);
        } else {
            setName('');
        }
    },[props.task]);
    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <p className="taskHeader">{props.task? 'Edit Task':'+New Task'}</p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group col-md-12">
                    <input type="text" className="form-control" id="email"
                           placeholder="Enter task" name="task" value={name} onChange={handleChange}/>
                </div>
                <div className="form-group col-md-12 ">
                    <button type="button" className="btn btn-primary btnColor form-control" onClick={createTask} >{props.task? 'Edit Task':'+New Task'}</button>
                </div>
            </Modal.Body>
        </Modal>
    );
}
