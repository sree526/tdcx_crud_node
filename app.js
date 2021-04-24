var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var port = 8080;
var db = 'mongodb://localhost:27017/tasks';

var tasks = require('./routes/tasks');
var login = require('./routes/login');

mongoose.connect(db, { useNewUrlParser: true });
app.use(cors());
app.use(express.json());

app.use('/tasks', tasks);
app.use('/login',login);
app.get('/', function(req, res){
    console.log('app starting on port: '+port);
    res.send('test express nodejs mongodb');
});

app.listen(port, function(){
    console.log('app listening on port: '+port);
});
