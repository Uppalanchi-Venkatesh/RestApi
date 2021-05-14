showTodo();
function showTodo() {
    fetch('https://venkat-todo-app.herokuapp.com/api/todos')
        .then(res => {
            return res.json();
        })
        .then(data => {
            var maindiv = document.getElementById('todo-list');
            maindiv.innerHTML='';
            var mylist = data.result;
            mylist.forEach((element,index) => {
                let div = document.createElement("DIV");
                maindiv.appendChild(div);
                div.classList.add('lists');
                div.innerHTML = element;
                let button = document.createElement("BUTTON");
                button.appendChild(document.createTextNode('Delete'));
                button.setAttribute("class","btn btn-sm btn-outline-danger py-0");
                button.style.cssText = 'float:right;margin-top:8px';
                div.appendChild(button);
                button.addEventListener('click', () => {
                    maindiv.removeChild(maindiv.childNodes[index]);
                    fetch(`https://venkat-todo-app.herokuapp.com/api/todos/${index}`, {method: 'DELETE'});
                    showTodo();
                });
            });
        })
        .catch(err => console.error("Error occurred " + err));
}