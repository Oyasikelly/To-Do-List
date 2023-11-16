window.addEventListener("load", () => {
  const form = document.querySelector("#task_form");
  const input = document.querySelector("#task_input");
  const list_element = document.querySelector("#tasKs");

  loadTasksFromLocalStorage();

  function container(task) {
    const task_el = document.createElement("div");
    task_el.classList.add("task");

    const task_content_el = document.createElement("div");
    task_content_el.classList.add("content");

    task_el.appendChild(task_content_el);
    const task_input_el = document.createElement("input");
    task_input_el.classList.add("text");
    task_input_el.type = "text";
    task_input_el.value = task;
    task_input_el.setAttribute("readonly", "readonly");

    task_content_el.appendChild(task_input_el);

    const task_actions_el = document.createElement("div");
    task_actions_el.classList.add("actions");

    const task_edit_el = document.createElement("button");
    task_edit_el.classList.add("edit");
    task_edit_el.innerHTML = "Edit";

    const task_delete_el = document.createElement("button");
    task_delete_el.classList.add("delete");
    task_delete_el.innerHTML = "Delete";
    task_actions_el.appendChild(task_edit_el);
    task_actions_el.appendChild(task_delete_el);
    task_el.appendChild(task_actions_el);
    list_element.appendChild(task_el);
    input.value = "";
    saveTasksToLocalStorage(); // Save tasks after adding
    task_edit_el.addEventListener("click", () => {
      if (task_edit_el.innerText.toLowerCase() == "edit") {
        task_input_el.removeAttribute("readonly", "readonly");
        task_input_el.focus();
        task_edit_el.innerText = "Save";
      } else {
        task_input_el.setAttribute("readonly", "readonly");
        task_edit_el.innerText = "Edit";
        saveTasksToLocalStorage();
      }
    });
    task_delete_el.addEventListener("click", () => {
      list_element.removeChild(task_el);
      saveTasksToLocalStorage();
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = input.value;
    if (!task) {
      alert("please fill out the task");
      return;
    }
    container(task);
  });

  // Function to save tasks to local storage
  function saveTasksToLocalStorage() {
    const tasks = Array.from(document.querySelectorAll(".task")).map(
      (taskElement) => {
        return taskElement.querySelector(".text").value;
      }
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Function to load tasks from local storage
  function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const tasks = JSON.parse(storedTasks);
      tasks.forEach((task) => {
        container(task);
      });
    }
  }
});
