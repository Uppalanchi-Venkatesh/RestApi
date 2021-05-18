const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose'); 
const model = require('./Backend/Model/Course');
require('dotenv').config();
const DBString = process.env.CONNECTION_STRING;
//const LocalStorage = require('node-localstorage').LocalStorage;
//const localStorage = new LocalStorage('./Localstorage');
var todoList=[];

mongoose.connect(DBString,{useNewUrlParser: true, useUnifiedTopology: true}).catch(err => console.log(err));

mongoose.connection.on('connected', () => {
    console.log('connected to DB');
});

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'Frontend', 'views'));
//app.set('views', __dirname+'/Frontend/views'); same as bove 
app.use(express.static(__dirname+'/Frontend'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.get('/', (req,res) => {
    res.render('Home', {title: 'Homepage'});
});

app.get('/todo', (req,res) => {
    res.render('Todo', {title: 'Todo'});
});

app.get('/tambola', (req,res) => {
    res.render('Tambola', {title: 'Tambola'});
});

app.get('/courses', (req,res) => {
    res.render('Courses', {title: 'Courses'});
});

app.post('/todo', (req,res) => {
    let todo = req.body.todo;
    todoList.push(todo);
    res.redirect('/todo');
});

app.post('/courses', (req,res) => {
    let course = new model(req.body);
    course.save() .catch(err => console.error(err));
    res.redirect('/courses');
});

app.get('/api/courses', (req,res) => {
    model.find({}, (err,courses) => {
        if(err) console.error(err);
        else res.send(courses);
    });
});

app.get('/api/todos', (req,res) => {
    let myobj = {
        status: "ok",
        result: todoList
    }
    res.end(JSON.stringify(myobj));
});

app.delete('/api/todos/:id', (req,res) => {
    todoList.splice(parseInt(req.params.id),1);
});

app.patch('/api/todos/:id', (req,res) => {
    let updatedTodo = req.body.todo1;
    todoList[parseInt(req.params.id)] = updatedTodo;
    console.log("UpdatedTodo : " + updatedTodo);
    res.redirect('/todo');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server is running http://localhost:${port}`);
});