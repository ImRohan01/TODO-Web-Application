//Selectors
const todoInput    = document.querySelector('.todo-input');
const todoButton   = document.querySelector('.todo-button');
const todoList     = document.querySelector('.todo-list');
const filterOption = document.querySelector('.todo-filter');
const myForm       = document.querySelector('.myForm');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo)

//Functions
function addTodo(event){
  //Removes default browser refresh
  event.preventDefault();
  //Create a div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create a TODO item
  const newTodo = document.createElement("li");
  newTodo.classList.add("todo-item");
  newTodo.innerText = todoInput.value;
  todoDiv.appendChild(newTodo);
  //Add to local storage
  saveTodos(todoInput.value);
  //Add complete button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = "<i class='fas fa-check'></i>";
  completedButton.classList.add("complete-button");
  todoDiv.appendChild(completedButton);
  //Add trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = "<i class='fas fa-trash'></i>";
  trashButton.classList.add("trash-button");
  todoDiv.appendChild(trashButton);
  //Add the div to the list of TODOs
  todoList.appendChild(todoDiv);
  myForm.reset()
}

function deleteCheck(event){
  const item = event.target;
  let status;
  //Deleting TODO item
  if(item.classList[0] === "trash-button"){
    const todo = item.parentElement;
    todo.classList.add("fall");
    //Waits for above transition to end
    if(todo.classList.contains("completed")){
      status = "completed";
    }
    else{
      status = "uncompleted"
    }
    removeLocalTodo(todo,status);
    todo.addEventListener("transitionend", function(){
      todo.remove();
    })
  }
  //Checking TODO item
  if(item.classList[0] === "complete-button"){
    const todo = item.parentElement;
    let status = "uncompleted";
    todo.classList.toggle("completed");
    if(todo.classList.contains("completed")){
      status = "completed";
    }
    updateTodos(todo,status);
  }
}

function filterTodo(event){
  const todos = todoList.childNodes
  todos.forEach(function(todo){
    switch(event.target.value){
      case "completed":{
        if(todo.classList.contains("completed")){
          todo.style.display = "flex";
        }
        else{
          todo.style.display = "none";
        }
        break;
      }
      case "uncompleted":{
        if(todo.classList.contains("completed")){
          todo.style.display = "none";
        }
        else{
          todo.style.display = "flex";
        }
        break;
      }
      case "all":{
        todo.style.display = "flex";
        break;
      }
    }
  });
}

function saveTodos(todo){
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  }
  else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push({todo:todo,status:"uncompleted"});
  localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodos(){
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  }
  else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  localStorage.setItem("todos",JSON.stringify(todos));
  todos.forEach(function(todo){
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create a TODO item
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.innerText = todo.todo;
    todoDiv.appendChild(newTodo);
    //Add complete button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("complete-button");
    todoDiv.appendChild(completedButton);
    //Add trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-button");
    todoDiv.appendChild(trashButton);
    if(todo.status === "completed"){
      todoDiv.classList.toggle("completed")
    }
    //Add the div to the list of TODOs
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodo(todo,status){
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  }
  else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.findIndex((x) => todoIndex === x.todo),1);
  localStorage.setItem("todos",JSON.stringify(todos));
}

function updateTodos(todo,status){
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  }
  else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos[todos.findIndex((x) => todoIndex === x.todo)].status = status;
  localStorage.setItem("todos",JSON.stringify(todos));
}
