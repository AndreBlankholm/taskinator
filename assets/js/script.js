var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var pageContentEl = document.querySelector("#page-content");
var taskIdCounter = 0;
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasks = [];


var taskFormHandler = function (event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  var isEdit = formEl.hasAttribute("data-task-id"); // gives a data-task-id to know what element your on

  // package up data as an object
  var taskDataObj = {
    name: taskNameInput,    /// also has a id. from the taskIdCounter attached to it through code . console.log it
    type: taskTypeInput,
    status: "to do",
  };
  // check if input values are empty strings**
  if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
  }
  // send it as an argument to createTaskEl
  createTaskEl(taskDataObj);
  formEl.reset(); //clears out the forms information after the submit
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
  taskInfoEl.innerHTML =
    "<h3 class='task-name'>" +
    taskDataObj.name +
    "</h3><span class='task-type'>" +
    taskDataObj.type +
    "</span>";

  listItemEl.appendChild(taskInfoEl);

  // add entire list item to list
  var taskActionsEl = createTaskActions(taskIdCounter); //another way to quickly verify that the function is working

  listItemEl.appendChild(taskActionsEl);

  tasksToDoEl.appendChild(listItemEl);

  taskDataObj.id = taskIdCounter; //creating a property of ID to the current taskDataObj and then on Line 63 we had to push it to the array

  tasks.push(taskDataObj);  // ** pushed the tasks into the Array of  (taskDataObj)

  saveTasks();

  taskIdCounter++; //  tasks count by 1/ data-task-id="0" and then any tasks after increments by 1 (i++)
};


var completeEditTask = function (taskName, taskType, taskId) {
  //At this point, the function logs the parameters to the console so we can verify that it is working and getting the data it needs.
  // find the matching task list item
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  // set new values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].name = taskName;
      tasks[i].type = taskType;
    }
  };
    

  alert("Task Updated!");

  formEl.removeAttribute("data-task-id"); //reset the form by removing the task id and changing the button text back to normal
  document.querySelector("#save-task").textContent = "Add Task";

  saveTasks();
  
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

  var statusChoices = ["To Do", "In Progress", "Completed"]; // creates the options that will be avail for the dropdown
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

var editTask = function (taskId) {
  //function for editing that creates its own taskSelected variables based on the provided (taskId).
  // get task list item element
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  // get content from task name and type
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  console.log(taskName);

  var taskType = taskSelected.querySelector("span.task-type").textContent;

  document.querySelector("input[name='task-name']").value = taskName; //task's name and type should appear in the form inputs
  document.querySelector("select[name='task-type']").value = taskType;
  document.querySelector("#save-task").textContent = "Save Task"; //update the text of the submit button to say "Save Task".

  formEl.setAttribute("data-task-id", taskId); //his will add the taskId to a data-task-id attribute on the form itself.
};

var deleteTask = function (taskId) {
  //function for deletes that creates its own taskSelected variables based on the provided (taskId).
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  console.log(taskSelected);
  taskSelected.remove();
  console.log("task " + taskId + " deleted.");
  // create new array to hold updated list of tasks
  var updatedTaskArr = [];

  // loop through current tasks
  for (var i = 0; i < tasks.length; i++) {
    // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
    if (tasks[i].id !== parseInt(taskId)) {
      updatedTaskArr.push(tasks[i]);
    }
  }

  // reassign tasks array to be the same as updatedTaskArr
  tasks = updatedTaskArr;
  saveTasks();
};

var taskButtonHandler = function (event) {
  // get target element from event
  var targetEl = event.target;

  // edit button was clicked
  if (targetEl.matches(".edit-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  }
  // delete button was clicked
  else if (targetEl.matches(".delete-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};

var taskStatusChangeHandler = function (event) {
  
  // get the task item's id
  var taskId = event.target.getAttribute("data-task-id");

  // get the currently selected option's value and convert to lowercase
  var statusValue = event.target.value.toLowerCase();

  // find the parent task item element based on the id
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }

    // update task's in tasks array
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].status = statusValue;
    }
  }
 
  saveTasks();

};


var saveTasks = function() {  //function made to set the data to local storage using json "tasks = the key" and "JSON = the string of data entered for the value in local storage"
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

formEl.addEventListener("submit", taskFormHandler);

pageContentEl.addEventListener("click", taskButtonHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler);
