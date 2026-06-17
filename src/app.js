const btnEl = document.querySelector("#get-students-btn");
const tbodyEl = document.querySelector(".tbody");
const formEl = document.querySelector("#add-student-form");

console.log(formEl);


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
                <td>id: ${id}</td>
                <td>name: ${name}</td>
                <td>age: ${age}</td>
                <td>course: ${course}</td>
                <td>skills: ${skills}</td>
                <td>email: ${email}</td>
                <td>isEnrolled: ${isEnrolled}</td>
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
        }
        console.log(data);
        
        formEl.reset()
})


// Функція для додавання нового студента

function addStudent(e) {
    
}



// Функція для оновлення студента

function updateStudent(id) {

 // твій код



 }



// Функція для видалення студента

function deleteStudent(id) {

    // твій код

}