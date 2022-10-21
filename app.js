// Task1: initiate app and run server at 3000

const express=require('express');
const app = express();

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));



app.use(express.json())//json related
app.use(express.urlencoded({extended : true}))

// Task2: create mongoDB connection 
const mongoose = require('mongoose');
const EmployeeData = require('./models/employee');
const { error } = require('console');

mongoose.connect('mongodb+srv://aparna9115:appu9115@cluster0.pw5gtqz.mongodb.net/CaseStudy2?retryWrites=true&w=majority')
.then(()=>{
    console.log('MongoDB connected successfully');
})
.catch(error=>{
    console.log('Connection Error'+error)
})
//Task 2 : write api with error handling and appropriate api mentioned in the TODO below


//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist',(req,res)=>{
    EmployeeData.find().then(function(data) {
        res.send(data);
    })
})



//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist/:id',(req,res)=>{
    EmployeeData.findOne({"_id":req.params.id}).then(function(data){
        res.send(data);
    })
})

//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist',async(req,res)=>{
    try {
        let item = req.body;
        console.log('Data received',item);
        const user =new EmployeeData(item);
        const savedUser = await user.save();
        console.log(savedUser);
        res.send(savedUser);
    } catch (error) {
      console.log(error)  
    }
})




//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id',(req,res)=>{
    let id=req.params.id;
    EmployeeData.findByIdAndDelete({"_id":id},(err,data)=>{
        if(err){
            res.send(err);
        }
        res.send();
    })
})



//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist',(req,res)=>{
    let id=req.body._id;
    EmployeeData.findByIdAndUpdate({'_id':id},req.body,{ new: true},(err,data)=>{
        if(err){
            res.send(err);
        }
        res.send(data);
    })
})


//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



app.listen(3000,()=>{
    console.log("Server listening to port 3000");
})

