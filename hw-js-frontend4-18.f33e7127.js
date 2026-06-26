const btnEl=document.querySelector("#get-students-btn"),tbodyEl=document.querySelector(".tbody"),formEl=document.querySelector("#add-student-form");let currentId=null;function getStudents(){return fetch("http://localhost:3000/students").then(t=>t.json())}function renderStudents(t){tbodyEl.innerHTML=t.map(({id:t,name:e,age:n,course:d,skills:r,email:l,isEnrolled:o})=>`<tr id="${t}">
                <td>${t}</td>
                <td>${e}</td>
                <td>${n}</td>
                <td>${d}</td>
                <td>${r}</td>
                <td>${l}</td>
                <td>${o}</td>
                <td>
                    <button type="button" data-action="edit">Edit</button>
                    <button type="button" data-action="delete">Delete</button>
                </td>
            </tr>`).join("")}function addStudent(t){return fetch("http://localhost:3000/students",{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json; charset=UTF-8"}}).then(t=>t.json())}function updateStudent(t,e){return fetch(`http://localhost:3000/students/${t}`,{method:"PUT",body:JSON.stringify(e),headers:{"Content-Type":"application/json; charset=UTF-8"}}).then(t=>t.json())}function deleteStudent(t){return fetch(`http://localhost:3000/students/${t}`,{method:"DELETE"})}btnEl.addEventListener("click",()=>{getStudents().then(t=>renderStudents(t))}),formEl.addEventListener("submit",t=>{t.preventDefault();let e={name:t.currentTarget.elements.name.value,age:t.currentTarget.elements.age.value,course:t.currentTarget.elements.course.value,skills:t.currentTarget.elements.skills.value,email:t.currentTarget.elements.email.value,isEnrolled:t.currentTarget.elements.isEnrolled.checked};currentId?updateStudent(currentId,e).then(getStudents).then(t=>renderStudents(t)).finally(()=>{formEl.reset(),currentId=null}):(addStudent(e).then(()=>getStudents()).then(t=>renderStudents(t)),formEl.reset())}),tbodyEl.addEventListener("click",t=>{let e=t.target.closest("td").parentNode,n=e.id;"delete"===t.target.dataset.action&&deleteStudent(n).then(getStudents).then(t=>renderStudents(t)),"edit"===t.target.dataset.action&&(currentId=n,formEl.elements[0].value=e.children[1].textContent,formEl.elements[1].value=e.children[2].textContent,formEl.elements[2].value=e.children[3].textContent,formEl.elements[3].value=e.children[4].textContent,formEl.elements[4].value=e.children[5].textContent,formEl.elements[5].checked=e.children[6].textContent)});
//# sourceMappingURL=hw-js-frontend4-18.f33e7127.js.map
