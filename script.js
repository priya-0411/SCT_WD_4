
    document.addEventListener("DOMContentLoaded", loadTasks);

    function addTask() {
      const taskText = document.getElementById("taskInput").value;
      const dateTime = document.getElementById("dateTimeInput").value;

      if (!taskText || !dateTime) return alert("Please enter both task and date/time!");

      const task = {
        text: taskText,
        time: dateTime,
        completed: false
      };

      saveTask(task);
      renderTasks();

      document.getElementById("taskInput").value = "";
      document.getElementById("dateTimeInput").value = "";
    }

    function saveTask(task) {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
      renderTasks();
    }

    function renderTasks() {
      const taskList = document.getElementById("taskList");
      taskList.innerHTML = "";
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

      tasks.forEach((task, index) => {
        const taskDiv = document.createElement("div");
        taskDiv.className = "task";
        if (task.completed) taskDiv.classList.add("completed");

        const tick = document.createElement("span");
        tick.className = "tick";
        tick.innerHTML = "✔";
        tick.onclick = () => {
          tasks[index].completed = !tasks[index].completed;
          localStorage.setItem("tasks", JSON.stringify(tasks));
          renderTasks();
        };

        const content = document.createElement("span");
        content.textContent = `${task.text} 📅 ${new Date(task.time).toLocaleString()}`;

        const del = document.createElement("button");
        del.className = "delete";
        del.textContent = "Delete";
        del.onclick = () => {
          tasks.splice(index, 1);
          localStorage.setItem("tasks", JSON.stringify(tasks));
          renderTasks();
        };

        taskDiv.appendChild(tick);
        taskDiv.appendChild(content);
        taskDiv.appendChild(del);

        taskList.appendChild(taskDiv);
      });
    }

    function toggleTheme() {
      document.body.classList.toggle("light");
    }

    function exportTasks() {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const blob = new Blob([JSON.stringify(tasks, null, 2)], { type: "application/json" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "tasks.json";
      link.click();
    }
 