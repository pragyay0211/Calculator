var express = require("express");
var bodyParser = require("body-parser");

const mongoose = require('mongoose');

const router = express.Router();

mongoose.connect('mongodb://localhost:27017/feedback');
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function (callback) {
    console.log("connection succeeded");
})

var app = express()


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/feedback', function (req, res) {

    var feedback = req.body.feedback;



    var data = {

        "feedback": feedback


    }
    db.collection('feedback').insertOne(data, function (err, collection) {
        if (err) throw err;
        console.log("feedback inserted Successfully");

    });

    res.send('Feedback submitted sucessfully');
});


app.get('/', function (req, res) {
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    return res.redirect('index.html');
});




app.listen(3000, () => { console.log("server listening at port 3000") });
