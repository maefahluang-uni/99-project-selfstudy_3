const listItems = document.querySelectorAll(".list");
const Timerico = document.getElementById("TimerPage");
const Todoico = document.getElementById("TodoPage");
const Quizico = document.getElementById("QuizPage");
const Statico = document.getElementById("StatPage");

listItems.forEach((item) => {
  item.addEventListener("click", function () {
    listItems.forEach((li) => li.classList.remove("active"));
    this.classList.add("active");

    // Find the img element within the clicked list item
    const imgElement = this.querySelector("img");

    // Access the src attribute of the img element
    const imgSrc = imgElement.getAttribute("src");

    // Reset all icons to white
    Timerico.src = ".../media/ico/WhiteTimer.png";
    Todoico.src = ".../media/ico/WhiteTodo.png";
    Quizico.src = ".../media/ico/WhiteQuiz.png";
    Statico.src = ".../media/ico/WhiteStat.png";

    // Update the clicked icon to green
    if (imgSrc === ".../media/ico/WhiteTimer.png") {
      Timerico.src = ".../media/ico/GreenTimer.png";
    } else if (imgSrc === ".../media/ico/WhiteTodo.png") {
      Todoico.src = ".../media/ico/GreenTodo.png";
    } else if (imgSrc === ".../media/ico/WhiteQuiz.png") {
      Quizico.src = ".../media/ico/GreenQuiz.png";
    } else if (imgSrc === ".../media/ico/WhiteStat.png") {
      Statico.src = ".../media/ico/GreenStat.png";
    }
  });
});
