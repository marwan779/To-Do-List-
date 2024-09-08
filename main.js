let TaskInput = document.getElementById("taskinput");
let AddTaskButton = document.getElementById("addtask");
let TaskList = document.getElementById("tasklist");

loadTasks();

function AddTask()
{
    let TaskText = TaskInput.value.trim();
    if(TaskText != "")
    {
        CreateTaskElement(TaskText);
        TaskInput.value = "";
    }
    else
    {
        alert("Please enter a task");
    }
}

AddTaskButton.addEventListener("click", AddTask);

function CreateTaskElement(_TaskText)
{
    const ListItem = document.createElement("li");
    ListItem.textContent = _TaskText;
    const DeleteTaskButton = document.createElement("button");
    DeleteTaskButton.className = "deletebtn" ;
    DeleteTaskButton.textContent = "Delete";

    ListItem.appendChild(DeleteTaskButton);
    TaskList.appendChild(ListItem);
    DeleteTaskButton.addEventListener("click", function()
    {
        TaskList.removeChild(ListItem);
        SaveTask();
    });

    SaveTask();
}

function SaveTask()
{
    let Tasks = [];
    let ListItems = document.querySelectorAll(".container ul li");
    ListItems.forEach(function(Item)
    {   
        Tasks.push(Item.textContent.replace("Delete", "").trim());
    });

    window.localStorage.setItem("tasks", JSON.stringify(Tasks));
}

function loadTasks()
{
    const Tasks = JSON.parse(window.localStorage.getItem("tasks"));
    Tasks.forEach(function(element)
    {
        CreateTaskElement(element);
    });
}