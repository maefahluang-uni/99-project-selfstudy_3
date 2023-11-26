document.addEventListener("DOMContentLoaded", function () {
  const addBtn = document.getElementById("add");
  const modal = document.querySelector(".modal");
  const cancelBtn = document.getElementById("cancel");
  const doneBtn = document.getElementById("done");
  const newTaskInput = document.getElementById("new-task");
  const todaysTasks = document.querySelector(".todays-tasks");
  const startDate = document.getElementById("startDate");
  const startTime = document.getElementById("startTime");
  const endDate = document.getElementById("endDate");
  const endTime = document.getElementById("endTime");
  const details = document.getElementById("details");
  const Timer = document.getElementById("rTime");
  const dateshow = document.getElementById("dmy");
  const Timez = document.getElementById("Timezone");

  function updateDisplay() {
    Timer.textContent = Time;
    dateshow.textContent = DateTime;
    Timez.textContent = Timezone;
  }

  function updateDateTime() {
    const now = new Date();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();
    const currentDay = now.getDate();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    Time =
      (currentHour < 10 ? "0" + currentHour : currentHour) +
      " : " +
      (currentMinute < 10 ? "0" + currentMinute : currentMinute) +
      " : " +
      (currentSecond < 10 ? "0" + currentSecond : currentSecond);
    Timezone = userTimezone;
    DateTime = `${currentDay} ${months[currentMonth]} ${currentYear}`;
    updateDisplay();
  }

  setInterval(updateDateTime, 1000);
  updateDateTime();

  addBtn.addEventListener("click", function () {
    modal.style.display = "block";
  });

  cancelBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  doneBtn.addEventListener("click", function () {
    let taskValue = newTaskInput.value.trim();
    if (taskValue) {
      let task = document.createElement("div");
      task.className = "task";

      let taskName = document.createElement("span");
      taskName.innerText = taskValue;

      let taskTimes = document.createElement("span");
      taskTimes.innerText = `Start: ${startDate.value} at ${startTime.value} - End: ${endDate.value} at ${endTime.value}`;

      let taskDetails = document.createElement("span");
      taskDetails.innerText = details.value;

      // Create a delete button for the task.
      let deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Delete";
      deleteBtn.className = "delete-task-btn";

      // Event listener to delete the task when the delete button is clicked.
      deleteBtn.addEventListener("click", function () {
        todaysTasks.removeChild(task);
      });

      task.appendChild(taskName);
      task.appendChild(taskTimes);
      task.appendChild(taskDetails);
      task.appendChild(deleteBtn); // append the delete button to the task

      todaysTasks.appendChild(task);

      modal.style.display = "none";
      newTaskInput.value = "";
      startDate.value = "";
      startTime.value = "";
      endDate.value = "";
      endTime.value = "";
      details.value = "";
    }
  });
});
