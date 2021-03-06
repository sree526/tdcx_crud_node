var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var port = process.env.PORT || 8080;
var db = process.env.MONGODB_URI||'mongodb://localhost:27017/tasks';

var tasks = require('./routes/tasks');
var login = require('./routes/login');

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
app.use(cors());
app.use(express.json());

app.use('/tasks', tasks);
app.use('/login',login);
app.get('/', function(req, res){
    console.log('app starting on port: '+port);
    res.redirect('/login');
});
if(process.env.NODE_ENV==="production"){
    app.use(express.static('client/build'));
    const path = require('path');
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(port, function(){
    console.log('app listening on port: '+port);
});
