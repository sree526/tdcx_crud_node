var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:VV9iwIoaZhjyWwDU@sampleapp.bnnnb.mongodb.net/tasks?retryWrites=true&w=majority', function(err, db) {
    let obj = {
        'username':'test',
        'password':'test'
    };
    db.collection('users').insertOne(obj, function(err,res){
        if(err) throw err;
        db.close();
    })
});


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://admin:admin@sampleapp.bnnnb.mongodb.net/tasks?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//     let obj = {
//         'username': 'test',
//         'password': 'test'
//     };
//     client.db("tasks").collection("users").insertOne(obj, function (err, res) {
//         if (err) throw err;
//         // perform actions on the collection object
//     });
// });
