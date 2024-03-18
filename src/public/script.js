document.addEventListener('DOMContentLoaded', function () {
  const taskForm = document.getElementById('taskForm');
  const taskList = document.getElementById('taskList');
  const searchButton = document.getElementById('searchButton');

  taskForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const courseId = document.getElementById('courseId').value;
    const taskName = document.getElementById('taskName').value;
    const dueDate = document.getElementById('dueDate').value;
    const details = document.getElementById('details').value;

    const taskData = {
      courseId,
      taskName,
      dueDate,
      details
    };

    try {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      const newTask = await response.json();
      
      displayTask(newTask);
    } catch (error) {
      console.error('Error:', error.message);
    }
  });

  searchButton.addEventListener('click', async function () {

    clearTaskList();

    const courseId = document.getElementById('courseIdInput').value;
    const tasks = await fetchTasksByCourseId(courseId);
    if (tasks !== null) {
      tasks.forEach(task => {
        displayTask(task);
      });
    } else {
      console.error('Failed to fetch tasks');
    }
  });


function clearTaskList() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}


  async function displayTask(task) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    taskItem.innerHTML = `
      <p><b>Course ID: </b> ${task.courseId}</p>
      <p><b>Task Name: </b>${task.taskName}</p>
      <p><b>Due Date: </b> ${task.dueDate}</p>
      <p><b>Details: </b> ${task.details}</p>
    `;
    taskList.appendChild(taskItem);
  }

  


  async function fetchTasksByCourseId(courseId) {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${courseId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const tasks = await response.json();
      return tasks;
    } catch (error) {
      console.error('Error:', error.message);
      return null;
    }
  }

});
