const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const DB = require('./Backend/Database/DBConnection'); 
const model = require('./Backend/Model/Course');
require('dotenv').config();
DB.connect();
//const LocalStorage = require('node-localstorage').LocalStorage;
//const localStorage = new LocalStorage('./Localstorage');
var todoList=[];

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

app.delete('/api/courses/:id', (req,res) => {
    model.findByIdAndUpdate(req.params.id, {isdeleted: true}, (err,course) => {
        if(err) console.error(err);
        else console.log(JSON.stringify(course));
    });
});

app.patch('/api/courses/:id', (req,res) => {
    let article = req.body.article;
    model.findOne({_id: req.params.id}, (err,course) => {
        if(err) console.error(err);
        else course.articles = articles;
    });
});

app.post('/todo', (req,res) => {
    let todo = req.body.todo;
    todoList.push(todo);
    res.redirect('/todo');
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
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server is running http://localhost:${port}`);
});