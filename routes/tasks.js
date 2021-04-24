var express = require('express');
var Task = require('../models/task');
var router = express.Router();

router.get('/', function(req, res){
    console.log('getting all tasks');
    let conditions = {};
    if(req.query.name){
        conditions = { task: { $regex: req.query.name }};
    }
    Task.find(conditions).exec(function(err, tasks){
        if(err) {
            res.send('error has occured');
        } else {
            console.log(tasks);
            if(req.query.name && tasks.length === 0){
                res.send('No tasks found');
            } else {
                res.json(tasks);
            }
        }
    });
});

router.get('/:id', function(req, res){
    console.log('getting one task');
    Task.findOne({
        _id: req.params.id
    }).exec(function(err, task){
        if(err) {
            res.send('error has occured');
        } else {
            console.log(task);
            res.json(task);
        }
    });
});

router.post('/', function(req, res){
    var newTask = new Task();
    newTask.task = req.body.task;
    newTask.completed = req.body.completed;
    newTask.save(function(err, task){
        if(err) {
            res.send('error saving task');
        } else {
            console.log(task);
            res.send(task);
        }
    });
});

router.put('/:id', function(req, res){
    Task.findOneAndUpdate({
        _id: req.params.id
    },{
        $set: {
            task: req.body.task,
            completed: req.body.completed
        }
    },{
        upsert: true,
        new: true
    },function(err, newTask){
        if(err) {
            res.send('error updating newTask');
        } else {
            console.log(newTask);
            res.send(newTask);
        }
    });
});

router.delete('/:id', function(req, res){
    Task.findByIdAndRemove({
        _id: req.params.id
    },function(err, task){
        if(err) {
            res.send('error deleting task');
        } else {
            console.log(task);
            res.send(task);
        }
    });
});

module.exports = router;
