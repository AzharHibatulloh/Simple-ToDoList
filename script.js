const addButton = document.querySelector(".add-button")
addButton.addEventListener("click", ()=>{
    let itemText = toDoEntryBox.value
    newToDoItem(itemText, false)
});

const toDoEntryBox = document.querySelector(".entry")
const todo = document.querySelector(".todo")

function newToDoItem(itemText, completed){
    let addItem = document.createElement("li")
    let addText = document.createTextNode(itemText)
    addItem.appendChild(addText)

    if (completed){
        addItem.classList.add("completed")
    }

    todo.appendChild(addItem)
    addItem.addEventListener("dblclick", toggleToDoItemState)
}

function toggleToDoItemState(){
    if(this.classList.contains("completed")){
        this.classList.remove("completed")
    }else{
        this.classList.add("completed")
    }
}

function clearCompletedToDoItems(){
    var completedItems = todo.getElementsByClassName("completed")

    while(completedItems.length > 0){
        completedItems.item(0).remove()
    }
}

function emptyList(){
    var toDoItems = todo.children
    while(toDoItems.length > 0){
        toDoItems.item(0).remove()
    }
}

function saveList(){
    var toDos = []
    for (let i = 0; i < todo.children.length; i++){
        var toDo = todo.children.item(i)
        var toDoInfo = {
            "task" : toDo.innerText, 
            "completed": toDo.classList.contains("completed")
        };
        toDos.push(toDoInfo)
    }

    localStorage.setItem("toDos", JSON.stringify(toDos))
    console.log("masuk sini")
}

function loadList() {
    if (localStorage.getItem("toDos") != null) {
        var toDos = JSON.parse(localStorage.getItem("toDos"));

        for (var i = 0; i < toDos.length; i++) {
            var toDo = toDos[i];
            newToDoItem(toDo.task, toDo.completed);
        }
    }
}

loadList();