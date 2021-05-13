const express = require('express');
const app = express();
const path = require('path');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./Localstorage');

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'Frontend', 'views'));
//app.set('views', __dirname+'/Frontend/views'); same as bove 
app.use(express.static(__dirname+'/Frontend'));

app.get('/', (req,res) => {
    res.render('Home', {title: 'Homepage'});
});

app.get('/todo', (req,res) => {
    res.render('Todo', {title: 'Todo'});
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server is running http://localhost:${port}`);
});