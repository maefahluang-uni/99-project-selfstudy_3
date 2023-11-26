// This waits for the DOM content to be fully loaded before executing any code
document.addEventListener("DOMContentLoaded", function () {
  // This selects the element with the class "submit" (the Login button)
  const loginButton = document.querySelector(".submit");

  // This adds an event listener for a click event on the Login button
  loginButton.addEventListener("click", function () {
    // This selects the input field with type="text" (username/email)
    const usernameInput = document.querySelector('input[type="text"]');

    // This selects the input field with type="password" (password)
    const passwordInput = document.querySelector('input[type="password"]');

    // This retrieves the values entered in the input fields
    const username = usernameInput.value;
    const password = passwordInput.value;

    // You can perform further validation here if needed
    if (username.trim() === "" || password.trim() === "") {
      // If either the username/email or password is empty, it displays an alert
      alert("Please enter both username/email and password.");
      return;
    }

    // If both fields are filled, it displays a success message
    alert("Login Successful!");

    // Reset the input fields after submission
    usernameInput.value = "";
    passwordInput.value = "";
    console.log();
  });
});
