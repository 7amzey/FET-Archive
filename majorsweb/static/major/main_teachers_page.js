document.addEventListener("DOMContentLoaded", () => {
    const departments = document.querySelectorAll("button[id^='dep']");
    const teachers = document.querySelectorAll("tr");
    departments.forEach(department => {
        const depId = department.id;
        if(depId === "dep1") {
            changeActive(departments, department);
            updateTable(depId, teachers);
        }
        department.addEventListener("click", () => {
            changeActive(departments, department);
            updateTable(depId, teachers);
        });
    });

    const copyButtons = document.querySelectorAll("td[data-type='email']");
    copyButtons.forEach(button => {
        button.addEventListener("click", () => {
            let input = document.createElement("input");
            input.value = button.textContent;
            input.select();
            input.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(input.value);
            input.remove();
        });
    });


});

function changeActive(departments, department) {
    department.setAttribute("class", "btn btn-warning col-12");
    department.setAttribute("data-acitve", "true");
    departments.forEach(dep => {
        if (dep !== department) {
            dep.setAttribute("class", "btn btn-outline-warning col-12");
            dep.setAttribute("data-acitve", "false");
        }
    });
} 
function updateTable(department, teachers) {
    const tableHeader = document.getElementById("tableHeader");
    teachers.forEach(teacher => {
        if (teacher.dataset.dep === department) {
            tableHeader.style.display = "table-row";
            teacher.style.display = "table-row";
        } else {
            tableHeader.style.display = "table-row";
            teacher.style.display = "none";
        }
    });
}
