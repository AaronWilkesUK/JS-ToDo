const addToDo = document.getElementById("addToDo");
const todo = document.getElementById("todo")
const itemsList = document.getElementById("items-list");

const item = {
    name: '',
    complete: false
}

let items=[];

const todoList = {
    add(item){
        items = [...items, item];
    },

    list() {
        console.log(items);
    },

    toggleComplete(id) {
        if(items[id].complete === true) {
            items[id].complete = false;
        } else {
            items[id].complete = true;
        }
    },

    delete(id) {
        items = items.filter((item, index) => index !== id);
    },

    outputList() {
        if(itemsList) {
            if(items.length > 0) {
                itemsList.innerHTML = "";
                items.map((item, index) => {
                    if(item !== null) {
                        const itemDiv = document.createElement("div");
                        itemDiv.classList.add("list-item");
                        const itemText = document.createElement("h6");
                        itemText.classList.add("item-text");
                        if(item.complete) {
                            itemText.classList.add("item-complete");
                        }
                        const itemDelete = document.createElement("i");
                        itemDelete.classList.add("fas", "fa-trash");
                        itemText.innerHTML = item.name;
                        itemDiv.appendChild(itemText);
                        itemDiv.appendChild(itemDelete);
                        itemsList.appendChild(itemDiv);
                        itemText.addEventListener("click", ()=> {
                            todoList.toggleComplete(index);
                            todoList.saveList();
                            this.outputList();
                        })
                        itemDelete.addEventListener("click", () => {
                            todoList.delete(index);
                            todoList.saveList();
                            this.outputList();
                        })
                    }
                })
            } else {
                itemsList.innerHTML = "<h3 class='list-nothing'>Nothing on the list!</h3>"
            }
        }
    },

    saveList() {
        localStorage.setItem("to-do-list", JSON.stringify(items));
    },

    loadList() {
        if(localStorage.getItem("to-do-list")) {
            items = JSON.parse(localStorage.getItem("to-do-list"));
        }
    }
}

addTask = () => {
    if(todo.value) {
        todoList.add({name: todo.value, complete: false});
        todoList.saveList();
        todo.value = "";
        todoList.outputList();
    } else {
        alert("Nothing to add");
    }
    todo.focus()
}

window.addEventListener("DOMContentLoaded", ()=> {
    if(addToDo && todo) {
        
        todo.addEventListener("keydown", (e) => {
            if(e.key === "Enter") {
                addTask()   
            }
        })
        addToDo.addEventListener("click", () => {
            addTask();       
        })
    }
    todoList.loadList()
    todoList.outputList()
})