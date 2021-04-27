var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tasks', function(err, db) {
    let obj = {
        'username':'test',
        'password':'test'
    };
    db.collection('users').insertOne(obj, function(err,res){
        if(err) throw err;
        db.close();
    })
});
