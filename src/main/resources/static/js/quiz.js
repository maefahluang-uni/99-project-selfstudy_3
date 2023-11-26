function updateChoiceStyle(checkbox) {
  var optionInfo = checkbox.parentElement.querySelector(".Option-info");
  var checkedShow = optionInfo.querySelector(".CheckedShow");
  var choiceLabel = checkbox.closest(".Choice");
  if (checkbox.checked) {
    choiceLabel.classList.add("checked");
    checkedShow.style.display = "block";
  } else {
    choiceLabel.classList.remove("checked");
    checkedShow.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Get the container for quiz topics
  var addInputButton = document.getElementById("addInputButton");
  var addQuestionButton = document.getElementById("addQuestion");
  var questionListContainer = document.getElementById("questionList");
  var questionCount = 2;
  // Event listener for clicks on the document
  document.addEventListener("click", function (event) {
    var target = event.target;

    // Check if the clicked element is an "Edit" button
    if (target.classList.contains("quiz-edit-btn")) {
      handleEditButton(target);
    }

    // Check if the clicked element is the "New Topic" button
    if (target.id === "addTopic") {
      addNewTopic();
    }
    if (target.id === "TakeaTest") {
      window.location.href = "doing_quiz.html";
    }
  });

  // Function to handle the "Edit" button click
  function handleEditButton(button) {
    // Find the closest quiz topic container
    var topicItem = button.closest(".quiz-topic");
    // Get the topic name link and input field
    var topicLink = topicItem.querySelector(".NamedTopic");
    var topicInput = topicItem.querySelector(".Change-topic-name");

    // Check if the button is in "Edit" mode
    if (button.textContent === "Edit") {
      // Switch to editing mode
      topicLink.style.display = "none";
      topicInput.style.display = "inline-block";
      button.textContent = "Save";
      topicInput.focus();

      // Add event listener for input length restriction during editing
      topicInput.addEventListener("input", function () {
        if (topicInput.value.length > 15) {
          alert("Topic name cannot exceed 15 characters!");
          topicInput.value = topicInput.value.slice(0, 15);
        }
      });
    } else {
      // Save changes
      var newTopicName = topicInput.value.trim();

      // Check if the new topic name is empty
      if (newTopicName === "") {
        // Prompt user for confirmation before deleting
        var confirmDelete = confirm("Are you sure to delete this topic?");

        if (!confirmDelete) {
          // If the user cancels, don't proceed with deletion
          return;
        }

        // Remove the quiz topic container
        topicItem.remove();
      } else {
        // Update topic name
        topicLink.textContent = newTopicName;
        topicLink.style.display = "inline-block";
        topicInput.style.display = "none";
        button.textContent = "Edit";
      }

      // Remove the input event listener after editing is done
      topicInput.removeEventListener("input", inputEventListener);
    }
  }

  // Function to add a new quiz topic
  function addNewTopic() {
    // Get the container for quiz topics
    var quizList = document.getElementById("quizList");
    // Create a new quiz topic element
    var newTopicItem = document.createElement("li");
    newTopicItem.classList.add("quiz-topic");

    // Create the elements for the new topic
    var newTopicLink = document.createElement("a");
    newTopicLink.classList.add("NamedTopic");
    newTopicLink.setAttribute("href", "EditQuizQuestion.html");
    newTopicLink.textContent = "New Topic";

    var newTopicInput = document.createElement("input");
    newTopicInput.classList.add("Change-topic-name");
    newTopicInput.setAttribute("placeholder", "No input means DELETE");
    newTopicInput.setAttribute("maxlength", "30"); // Set maximum length to 30 characters

    var newTopicCustomButton = document.createElement("div");
    newTopicCustomButton.classList.add("quiz-name-set");

    var newTopicButton = document.createElement("button");
    newTopicButton.classList.add("quiz-edit-btn");
    newTopicButton.setAttribute("id", "editNamedTopic");
    newTopicButton.textContent = "Edit";

    // Append elements to the new topic item
    newTopicItem.appendChild(newTopicLink);
    newTopicItem.appendChild(newTopicInput);

    // Append the "Edit" button to the custom container
    newTopicCustomButton.appendChild(newTopicButton);

    // Append the custom container to the new topic item
    newTopicItem.appendChild(newTopicCustomButton);

    // Append the new topic item to the container
    quizList.appendChild(newTopicItem);
  }
  addInputButton.addEventListener("click", addMore);

  function addMore() {
    // Find the container for answer choices
    var choiceContainer = document.querySelector(".choice-for-question");

    // Check if the maximum limit (4) has been reached
    if (choiceContainer.children.length >= 4) {
      // Hide the "Add More" button
      document.getElementById("addInputButton").style.display = "none";
      return;
    }

    // Show the "Remove" button
    document.getElementById("RemoveInputButton").style.display = "inline-block";

    // Create a new answer container
    var newAnswerContainer = document.createElement("div");
    newAnswerContainer.classList.add("answer-container");

    // Create elements for the new answer container
    var label = document.createElement("label");
    label.classList.add("WhiteText");
    label.setAttribute(
      "for",
      "answerInput" + (choiceContainer.children.length + 1)
    );
    label.textContent = choiceContainer.children.length + 1 + ". ";

    var input = document.createElement("input");
    input.classList.add("choice-answer");
    input.setAttribute("type", "text");
    input.setAttribute(
      "id",
      "answerInput" + (choiceContainer.children.length + 1)
    );
    input.setAttribute(
      "name",
      "answerInput" + (choiceContainer.children.length + 1)
    );

    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute(
      "id",
      "correctCheckbox" + (choiceContainer.children.length + 1)
    );
    checkbox.setAttribute(
      "name",
      "correctCheckbox" + (choiceContainer.children.length + 1)
    );

    // Append elements to the new answer container
    newAnswerContainer.appendChild(label);
    newAnswerContainer.appendChild(input);
    newAnswerContainer.appendChild(checkbox);

    // Append the new answer container to the choice container
    choiceContainer.appendChild(newAnswerContainer);

    // Check if the total number of containers is now equal to 4
    if (choiceContainer.children.length === 4) {
      // Hide the "Add More" button
      document.getElementById("addInputButton").style.display = "none";
    }
  }

  document
    .getElementById("RemoveInputButton")
    .addEventListener("click", removeInput);

  function removeInput() {
    // Find the container for answer choices
    var choiceContainer = document.querySelector(".choice-for-question");

    // Check if there are at least 2 answer containers
    if (choiceContainer.children.length >= 2) {
      // Remove the last answer container
      choiceContainer.removeChild(choiceContainer.lastChild);

      // Check if the number of containers is now less than 4
      if (choiceContainer.children.length < 4) {
        // Show the "Add More" button
        document.getElementById("addInputButton").style.display =
          "inline-block";
      }

      // Check if there are only two answer containers left
      if (choiceContainer.children.length === 2) {
        // Hide the "Remove" button
        document.getElementById("RemoveInputButton").style.display = "none";
      }
    }
  }

  addQuestionButton.addEventListener("click", function () {
    // Create a new list item for the new question
    var newQuestionItem = document.createElement("li");
    newQuestionItem.classList.add("quiz-topic");

    // Create a new question link
    var newQuestionLink = document.createElement("a");
    newQuestionLink.classList.add("QuestionNamed");
    newQuestionLink.textContent = "Question " + questionCount;

    // Append the question link to the list item
    newQuestionItem.appendChild(newQuestionLink);

    // Get the first child of the question list container
    var firstChild = questionListContainer.firstChild;

    // Insert the new list item before the first child
    questionListContainer.insertBefore(newQuestionItem, firstChild);

    // Increment the question count for the next question
    questionCount++;
  });
});
