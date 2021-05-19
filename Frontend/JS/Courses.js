showCourses();
const addcourse = document.getElementById('add-test');
const form = document.getElementById('hidden');
const add = document.getElementById('create-test');

addcourse.addEventListener('click', ()=> {
    form.style.display = 'block';
});

add.addEventListener('click', () => {
    form.style.display = 'none';
});

function showCourses() {
    fetch(`https://bz-crud-operations.herokuapp.com/api/courses`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            const tbody = document.getElementById('tests-table');
            tbody.innerHTML = '';
            let rows='';
            for(let course of data) {
                if(!course.isdeleted) {
                    let tr = document.createElement('tr');
                    tr.setAttribute('id',course._id);
                    let td1 = document.createElement('td');
                    let td2 = document.createElement('td');
                    let td3 = document.createElement('td');
                    let edit = document.createElement('button');
                    let del = document.createElement('button');
                    edit.setAttribute('class','btn btn-primary btn-sm');
                    edit.appendChild(document.createTextNode('edit'));
                    del.setAttribute('class','btn btn-danger btn-sm');
                    del.appendChild(document.createTextNode('delete'));
                    td3.classList.add('flexx');
                    del.classList.add('size');
                    edit.classList.add('size');
                    td3.append(edit,del);
                    td1.appendChild(document.createTextNode(course.courseName));
                    td2.appendChild(document.createTextNode(course.articles));
                    tr.append(td1,td2,td3);
                    tbody.appendChild(tr);
                    del.addEventListener('click', () => {
                        document.getElementById(course._id).remove();
                        fetch(`https://bz-crud-operations.herokuapp.com/api/courses/${course._id}`, {method: 'DELETE'});
                        showCourses();
                    });
                    edit.addEventListener('click', () => {
                        alert("Sorry...I can't edit");
                    });
                }
            }
        })
        .catch(err => console.error(err));
}