// This waits for the DOM content to be fully loaded before executing any code
document.addEventListener('DOMContentLoaded', function () {

    // This selects the element with the class "submit" (The sign up button)
    const signUpButton = document.querySelector('.submit');

    // This adds an event listener for a click event on the Sign Up button
    signUpButton.addEventListener('click', function () {

        // When the button is clicked, this displays an alert with the message "Sign Up Successful!"
        alert('Sign Up Successful!');
    });
});
