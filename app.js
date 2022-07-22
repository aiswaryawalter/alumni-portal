const express = require ('express');
var mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require ('cors');
const bodyParser = require ('body-parser')
const path = require('path');
const mongodb = require('mongodb');

const Postjob = require('./src/model/PostjobsModel');

const app = new express();

//Express Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//connection to MongoDB using mongoose
const mongodbAtlas = process.env.MONGO_URI;
mongoose.connect(mongodbAtlas || mongodb,{useNewUrlParser:true, useUnifiedTopology:true});
var db = mongoose.connection;
db.on("error",console.error.bind(console,'connection error'));
db.once("open",()=>{
    console.log("connected to DB")
});

//port
const port=3000;

//Connection to server
app.listen(process.env.PORT || port,(err)=>{
    if(err){console.log("err")}
    else{console.log("Connected to server")}
});

// App.route("/signup")
app.route("/api/signup")
.post((req,res)=>{
 res.header("Access-Control-Allow-Origin","*");
 res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH");
var user ={
    username: req.body.user.username,
    password: req.body.user.password
}    
console.log(user)
var user = new users(user);
user.save();
})
.get((req,res)=>{
    res.send("Hello")
})

app.get('/postajob',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    Postjob.find()
    .then(function(postajob){
        res.send(postajob);
    })
})

app.post('/addJob', function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");

    var jobs = {
        companyName:req.body.item.companyName ,
        jobRole: req.body.item.jobRole, 
        location: req.body.item.location,
        experience: req.body.item.experience,
        skills: req.body.item.skills,
        qualification: req.body.item.qualification,
        jobDescription: req.body.item.jobDescription,
        lastDate: req.body.item.lastDate,
        jobType: req.body.item.jobType
    }

    var job = new Postjob(jobs)
    job.save();
})

// app.listen(3000);

