showTodo();
function showTodo() {
    fetch(`http://localhost:3000/api/todos`)
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
                let del = document.createElement("BUTTON");
                del.appendChild(document.createTextNode('Delete'));
                del.setAttribute("class","btn btn-sm btn-outline-danger py-0");
                del.style.cssText = 'float:right;margin-top:8px';
                div.appendChild(del);
                let edit = document.createElement("BUTTON");
                edit.appendChild(document.createTextNode('Edit'));
                edit.setAttribute("class","btn btn-sm btn-outline-primary py-0");
                edit.style.cssText = 'float:right;margin-top:8px;';
                div.appendChild(edit);
                del.addEventListener('click', () => {
                    maindiv.removeChild(maindiv.childNodes[index]);
                    fetch(`http://localhost:3000/api/todos/${index}`, {method: 'DELETE'});
                    showTodo();
                });
                edit.addEventListener('click', () => {
                    let posting = document.getElementById('posting');
                    let updating = document.getElementById('updating');
                    posting.style.display = 'none';
                    updating.style.display = 'flex';
                    document.getElementById('textbox1').value = mylist[index];
                    let save = document.getElementById('savetodo');
                    save.addEventListener('click', (event) => {
                        let todo = {todo1: document.getElementById('textbox1').value};
                        fetch(`http://localhost:3000/api/todos/${index}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-type': 'application/json;charset=UTF-8' 
                            },
                            body: JSON.stringify(todo)
                        });
                        showTodo();
                    });
                });
            });
        })
        .catch(err => console.error("Error occurred " + err));
}