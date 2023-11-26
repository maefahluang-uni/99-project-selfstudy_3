function submitForm() {
  var email = document.getElementById("email").value;
  var newPassword = document.getElementById("newPassword").value;
  var confirmPassword = document.getElementById("confirmPassword").value;

  // Perform basic validation
  if (!email || !newPassword || !confirmPassword) {
    alert("Please fill in all fields.");
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  // Assuming you have a server-side script to handle form submission
  var formData = {
    email: email,
    newPassword: newPassword,
    // Add more data as needed
  };

  // You can use fetch or another AJAX method to send data to the server
  fetch("your_server_script.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the server as needed
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
