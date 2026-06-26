const btnEl = document.querySelector("#get-students-btn");
const tbodyEl = document.querySelector(".tbody");
const formEl = document.querySelector("#add-student-form");

let currentId = null;


// Функція для отримання всіх студентів
btnEl.addEventListener("click", () => {
    getStudents().then(res => renderStudents(res));
})

function getStudents() {
    return fetch("http://localhost:3000/students").then(res => res.json())
}



// Функція для відображення студентів у таблиці

function renderStudents(students) {
    const item = students.map(({id, name, age, course, skills, email, isEnrolled}) => {
    return `<tr id="${id}">
                <td>${id}</td>
                <td>${name}</td>
                <td>${age}</td>
                <td>${course}</td>
                <td>${skills}</td>
                <td>${email}</td>
                <td>${isEnrolled}</td>
                <td>
                    <button type="button" data-action="edit">Edit</button>
                    <button type="button" data-action="delete">Delete</button>
                </td>
            </tr>`
    }).join("")
    
    tbodyEl.innerHTML = item;
}



formEl.addEventListener("submit", (e) => {
        e.preventDefault()
        const data = {
            name : e.currentTarget.elements.name.value,
            age : e.currentTarget.elements.age.value,
            course : e.currentTarget.elements.course.value,
            skills : e.currentTarget.elements.skills.value,
            email : e.currentTarget.elements.email.value,
            isEnrolled : e.currentTarget.elements.isEnrolled.checked
        };
        if (currentId) {
            updateStudent(currentId, data)
            .then(getStudents)
            .then(res => renderStudents(res))
            .finally(() => {
                formEl.reset()
                currentId = null
            })
            return
        }
        addStudent(data)
        .then(() => getStudents())
        .then(res => renderStudents(res))
        formEl.reset()
})

// Функція для додавання нового студента

function addStudent(e) {
  const options = {
    method: "POST",
    body: JSON.stringify(e),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  };
  return fetch("http://localhost:3000/students", options)
  .then(res => res.json());
}

// Функція для оновлення студента

function updateStudent(id, data) {
    const options = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
    "Content-Type": "application/json; charset=UTF-8",
    },
};
    return fetch(`http://localhost:3000/students/${id}`, options)
    .then(res => res.json())
}



// Функція для видалення студента

function deleteStudent(id) {
    return fetch(`http://localhost:3000/students/${id}`, {
    method: "DELETE",
})
}

tbodyEl.addEventListener("click", (e) => {
    const td = e.target.closest("td")
    const currentTd = td.parentNode
    const id = currentTd.id

    if (e.target.dataset.action === "delete") { 
        deleteStudent(id)
        .then(getStudents)
        .then(res => renderStudents(res))
    }

    if (e.target.dataset.action === "edit") {
        currentId = id

        formEl.elements[0].value = currentTd.children[1].textContent
        formEl.elements[1].value = currentTd.children[2].textContent
        formEl.elements[2].value = currentTd.children[3].textContent
        formEl.elements[3].value = currentTd.children[4].textContent
        formEl.elements[4].value = currentTd.children[5].textContent
        formEl.elements[5].checked = currentTd.children[6].textContent
    }
})