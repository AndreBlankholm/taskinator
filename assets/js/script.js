var pageContentEl = document.querySelector("#page-content");
var taskIdCounter = 0;
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function (event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // package up data as an object
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput,
  };
  // check if input values are empty strings**
  if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
  }
  // send it as an argument to createTaskEl
  createTaskEl(taskDataObj);
};

formEl.reset(); //clears out the forms information after the submit

var createTaskEl = function (taskDataObj) {
  // create list item
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  // add task id as a custom attribute
  listItemEl.setAttribute("data-task-id", taskIdCounter); //method can be used to add or update any attribute on an HTML element

  // create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  listItemEl.appendChild(taskInfoEl); 

  // add entire list item to list
  var taskActionsEl = createTaskActions(taskIdCounter); //another way to quickly verify that the function is working
  listItemEl.appendChild(taskActionsEl);
  console.log(taskActionsEl);

  tasksToDoEl.appendChild(listItemEl);
  taskIdCounter++; // counter helps data tasks count by 1/ data-task-id="0"
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var createTaskActions = function (taskId) {
  //how we can pass a different id into the function each time to keep track of which elements we're creating for which task.
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions"; //create a new <div> element with the class name "task-actions":

  // create edit button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(editButtonEl);

  // create delete button
  var deleteButtonEl = document.createElement("button"); //Note that textContent, className, and setAttribute() are properties and methods of the <button> elements.
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(deleteButtonEl);

  var statusSelectEl = document.createElement("select"); //adds the select tabs
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(statusSelectEl);

  var statusChoices = ["To Do", "In Progress", "Completed"];  // creates the options that will be avail for the dropdown
  for (var i = 0; i < statusChoices.length; i++) {
    // create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);

    // append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

  return actionContainerEl;
};

var deleteTask = function(taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  console.log(taskSelected);
  taskSelected.remove();
  console.log("task " + taskId + " deleted.");

};

var taskButtonHandler = function(event) {    ///for the event listener
  console.log(event.target);

  if (event.target.matches(".delete-btn")) {
    console.log("you clicked a delete button!");

    // get the element's task id
    var taskId = event.target.getAttribute("data-task-id");  // targeting the data
    deleteTask(taskId); // doesnt need a var x = before calling deleteTask. because deleteTask doesnt return anything.
    console.log(taskId);
  }
}




formEl.addEventListener("submit", taskFormHandler);

pageContentEl.addEventListener("click", taskButtonHandler);