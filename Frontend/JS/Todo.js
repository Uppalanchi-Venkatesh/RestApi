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
            console.log(mylist);
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
                let edit = document.createElement("BUTTON");
                edit.appendChild(document.createTextNode('Edit'));
                edit.setAttribute("class","btn btn-sm btn-outline-primary py-0");
                edit.style.cssText = 'float:right;margin-top:8px;';
                div.appendChild(edit);
                button.addEventListener('click', () => {
                    maindiv.removeChild(maindiv.childNodes[index]);
                    fetch(`https://venkat-todo-app.herokuapp.com/api/todos/${index}`, {method: 'DELETE'});
                    showTodo();
                });
                edit.addEventListener('click', () => {
                    let posting = document.getElementById('posting');
                    let updating = document.getElementById('updating');
                    posting.style.display = 'none';
                    updating.style.display = 'flex';
                    document.getElementById('textbox1').value = mylist[index];
                });
                let save = document.getElementById('savetodo');
                save.addEventListener('click', () => {
                    let todo = document.getElementById('textbox1').value;
                    console.log('Getting toto : ' +todo);
                    fetch(`https://venkat-todo-app.herokuapp.com/api/todos/${index}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-type': 'charset=UTF-8' 
                        },
                        body: JSON.stringify(todo)
                    });
                    showTodo();
                });
            });
        })
        .catch(err => console.error("Error occurred " + err));
}