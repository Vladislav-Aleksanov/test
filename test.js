function onPageLoaded() {
    let input = document.querySelector(".add-todo");
    let ul = document.querySelector("ul.todo-list");
    let tasksArray =  Array.from(document.querySelectorAll("ul.todo-list li"));
    let tasksStatusArray = [];
    let checkAllButton = document.querySelector(".check-all-btn");
    let clearCompletedButton = document.querySelector(".clear-completed-btn");
    let showAllButton = document.querySelector(".show-all-btn");
    let showActiveButton = document.querySelector(".show-active-btn");
    let showCompletedButton = document.querySelector(".show-completed-btn");
    let activeTasks = document.querySelector(".active-tasks-number");
    let completedTasks = document.querySelector(".completed-tasks-number");
    let activeTasksCounter;
    let completedTasksCounter;
    let showStatus = 'all';
    let pagination = document.querySelector(".pagination");
    const TODOS_ON_PAGE_NUMBER = 8;
        
    function createTodo(text) {
        let li = document.createElement("li");
        let div = document.createElement("div");
        let checkbox = document.createElement("input");
        let textSpan = document.createElement("span");
        let trashSpan = document.createElement("span");

        div.classList.add("view");
        checkbox.type = "checkbox";
        textSpan.classList.add("todo-text");
        textSpan.append(text);
        trashSpan.classList.add("todo-trash");
        trashSpan.append("Delete");

        listenDeleteTodo(trashSpan);
        listenCheckTodo(checkbox);
        listenEditTodo(textSpan);

        div.append(checkbox, textSpan, trashSpan);
        $(li).append(div);
        
        return li
    }

    function addTodoToEnd(element) {
        tasksArray.push(element);
        tasksStatusArray.push(false);
       
        input.value = "";
        activeTasksCounter++;

        renderTodo();

        console.log(tasksArray);
        console.log(tasksStatusArray);
        console.log(activeTasksCounter);
        console.log(completedTasksCounter);
    }

    function replaceTodo(element, index){
        if (tasksStatusArray[index] === true) {
            $(element).find("input").attr( "checked", true);
        }
        tasksArray.splice(index, 1, element);
        
        renderTodo();

        console.log(tasksArray);
        console.log(tasksStatusArray);
    }

    function getActiveTasksArray() {
        let activeTasksArray = tasksArray.filter((item, index) => {
            return !tasksStatusArray[index];
        });
        
        return activeTasksArray
    }

    function getCompletedTasksArray() {
        let completedTasksArray = tasksArray.filter((item, index) => {
            return tasksStatusArray[index];
        });
        
        return completedTasksArray
    }

    function renderTodo() {
        $(ul).empty();

        if (showStatus === 'all') {
            $(ul).append(tasksArray);
        } else if (showStatus === 'active') {
            $(ul).append(getActiveTasksArray);
        } else {
            $(ul).append(getCompletedTasksArray);
        }

        $(activeTasks).text(`${activeTasksCounter}`);
        $(completedTasks).text(`${completedTasksCounter}`);
    }

    function listenDeleteTodo(element) {
        element.addEventListener("click", () => {
            let index = tasksArray.indexOf(element.parentElement.parentElement);
            let status = tasksStatusArray.splice(index, 1)[0];
            tasksArray.splice(index, 1);
            
            if (status === true) {
                completedTasksCounter--;
            } else {
                activeTasksCounter--;
            }

            renderTodo();
        
            console.log(tasksArray);
            console.log(tasksStatusArray);
            console.log(activeTasksCounter);
            console.log(completedTasksCounter);
            
        });
    }

    function listenCheckTodo(element) {
        element.addEventListener("click", () => {
            this.checked;
            let index = tasksArray.indexOf(element.parentElement.parentElement);

            if (tasksStatusArray[index]) {
                activeTasksCounter++;
                completedTasksCounter--;
            } else {
                activeTasksCounter--;
                completedTasksCounter++;
            }

            tasksStatusArray[index] = !tasksStatusArray[index];
            
            renderTodo();

            console.log(tasksArray);
            console.log(tasksStatusArray);
            console.log(activeTasksCounter);
            console.log(completedTasksCounter);
        });
    }

    function listenEditTodo(element) {
        element.addEventListener("dblclick", () => {
            let index = tasksArray.indexOf(element.parentElement.parentElement);
            let editTodoInput = document.createElement("input");

            editTodoInput.type = "text";
            editTodoInput.addEventListener("keypress", (keyPressed) => {
                let keyEnter = 13;
                if ((keyPressed.which == keyEnter) && (editTodoInput.value !== "")) {
                    replaceTodo(createTodo(editTodoInput.value), index);                                       
                }
            });
            $(element.parentElement).replaceWith((editTodoInput));
        });
    }

    tasksArray.forEach((elem) => {
        let checkboxStatus = false;
        if (elem.querySelector('input[type="checkbox"]').checked) {
            checkboxStatus = true;
        }
        tasksStatusArray.push(checkboxStatus);
    });
    
    input.addEventListener("keypress", (keyPressed) => {
        let keyEnter = 13;
        if ((keyPressed.which == keyEnter) && (input.value !== "")) {
            addTodoToEnd(createTodo(input.value));
        }
    });

    checkAllButton.addEventListener("click", () => {
        let checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
        
        if (tasksStatusArray.filter((item) => item).length === tasksStatusArray.length) {
            checkboxes.forEach((elem) => {
                $(elem).prop('checked', false);
                tasksStatusArray = tasksStatusArray.map(() => false);
            });
        } else {
            checkboxes.forEach((elem) => {
                $(elem).prop('checked', true);
                tasksStatusArray = tasksStatusArray.map(() => true);
            });
        }

        renderTodo();
        console.log(checkboxes);
        console.log(tasksStatusArray);
    });

    clearCompletedButton.addEventListener("click", () => {
        let indexes = [];

        tasksStatusArray.forEach((elem, index) => {
            if (elem) {indexes.push(index)}
        });
        tasksArray = tasksArray.filter((elem, index) => {
            return indexes.indexOf(index) == -1;
        });
        tasksStatusArray = tasksStatusArray.filter((elem, index) => {
            return indexes.indexOf(index) == -1;
        });

        completedTasksCounter = 0;
        renderTodo();
        
        console.log(indexes);
        console.log(tasksArray);
        console.log(tasksStatusArray);
    });

    showAllButton.addEventListener("click", () => {
        showStatus = 'all';
        renderTodo();
    });

    showActiveButton.addEventListener("click", () => {
        showStatus = 'active';
        renderTodo();
    });

    showCompletedButton.addEventListener("click", () => {
        showStatus = 'completed';
        renderTodo();
    });


    activeTasksCounter = tasksStatusArray.reduce((counter, item) => {
        if (item) {
            return counter++
        }
        return counter
    }, 0);

    completedTasksCounter = tasksStatusArray.length - activeTasksCounter;

    $(activeTasks).text(`${activeTasksCounter}`);
    $(completedTasks).text(`${completedTasksCounter}`);

    console.log(activeTasksCounter);
    console.log(completedTasksCounter);
    
    if (tasksArray.length === 0) {
        $(pagination).addClass("hidden");
    }
}

document.addEventListener("DOMContentLoaded", onPageLoaded);