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
    fetch(`http://localhost:3000/api/courses`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            const tbody = document.getElementById('tests-table');
            tbody.innerHTML = '';
            for(let course of data) {
                if(!course.isdeleted) {
                    let tr = document.createElement('tr');
                    let td1 = document.createElement('td');
                    let td2 = document.createElement('td');
                    td1.appendChild(document.createTextNode(course.courseName));
                    tr.appendChild(td1);
                    td2.appendChild(document.createTextNode(course.articles));
                    tr.appendChild(td2);
                    tbody.appendChild(tr);
                }
            }

        })
        .catch(err => console.error(err));
}