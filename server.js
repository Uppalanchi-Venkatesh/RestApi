const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors'); 
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

app.post('/todo', (req,res) => {
    let todo = req.body.todo;
    todoList.push(todo);
    res.redirect('/todo');
});

app.get('/api/todos', (req,res) => {
    const myobj = {
        status: "ok",
        result: todoList
    }
    res.end(JSON.stringify(myobj));
});

app.delete('/api/todos/:id', (req,res) => {
    todoList.splice(parseInt(req.params.id),1);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server is running http://localhost:${port}`);
});