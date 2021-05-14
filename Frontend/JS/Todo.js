showTodo();
function showTodo() {
    fetch('https://venkat-todo-app.herokuapp.com/api/todos')
        .then(res => {
            return res.json();
        })
        .then(data => {
            var maindiv = document.getElementById('todo-list');
            maindiv.innerHTML='';
            data.result.forEach((element,index) => {
                let div = document.createElement("DIV");
                maindiv.appendChild(div);
                div.style.cssText = 'background-color:#f5f7fa;width:76%;min-height:50px;border-radius:5px;\
                color:black;padding-top:5px;padding-bottom-5px;padding-left:20px;padding-right:20px;font-size:25px;';
                div.innerHTML = element;
                let button = document.createElement("BUTTON");
                button.appendChild(document.createTextNode('Delete'));
                button.setAttribute("class","btn btn-sm btn-outline-danger py-0");
                button.style.cssText = 'float:right;margin-top:8px';
                div.appendChild(button);
                button.addEventListener('click', () => {
                    maindiv.removeChild(maindiv.childNodes[index]);
                    fetch(`https://venkat-todo-app.herokuapp.com/api/todos/${index}`, {method: 'delete'});
                    showTodo();
                })
            });
        })
        .catch(err => console.error("Error occurred " + err));
}