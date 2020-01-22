
function onPageLoaded() {
    let input = document.querySelector("input[type='text']");
    let ul = document.querySelector("ul.todo-list");
    let trash = document.querySelectorAll(".todo-trash");
    let tasks =  Array.from(document.querySelectorAll("ul.todo-list li"));
    let tasksStatus = [];

    function createTodo() {
        let li = document.createElement("li");
        let checkbox = document.createElement("input");
        let textSpan = document.createElement("span");
        let trashSpan = document.createElement("span");

        checkbox.type = "checkbox";
        textSpan.classList.add("todo-text");
        textSpan.append(input.value);
        trashSpan.classList.add("todo-trash");
        trashSpan.append("Delete");
        listenDeleteTodo(trashSpan);
        li.append(checkbox, textSpan, trashSpan);
        tasks.push(li);
        tasksStatus.push(false);
        ul.append(li);

        input.value = "";
        console.log(tasks);
        console.log(tasksStatus);
    }

    function listenDeleteTodo(element) {
        element.addEventListener("click", (event) => {
            let index = tasks.indexOf(element.parentElement);
            tasks.splice(index, 1);
            tasksStatus.splice(index, 1)
            //element.parentElement.remove();
            tasks.forEach((li) => {ul.append(li);})
        });
    }

    tasks.forEach((elem) => {
        let checkboxStatus = false;
        if (elem.querySelector('input[type="checkbox"]').checked) {
            checkboxStatus = true;
        }
        tasksStatus.push(checkboxStatus);
    });

    input.addEventListener("keypress", (keyPressed) => {
        let keyEnter = 13;
        if ((keyPressed.which == keyEnter) && (input.value !== "")) {
            createTodo();
        }
    });

    
}

document.addEventListener("DOMContentLoaded", onPageLoaded);