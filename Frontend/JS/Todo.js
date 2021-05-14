var button = document.getElementById('deletebtn');
var maindiv = document.getElementById('todo-list');

function remove(index) {
    maindiv.removeChild(maindiv.childNodes[index]);
}