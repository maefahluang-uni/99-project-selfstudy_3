// Simulated data that might come from a server/database
const examData = [
  { subject: "SARS", score: 85, maxScore: 100 },

  // Add more exams as needed
];

function generateSummary() {
  const summaryContainer = document.getElementById("summary");
  summaryContainer.innerHTML = ""; // Clear any existing content

  examData.forEach((exam) => {
    const examEl = document.createElement("div");
    examEl.classList.add("exam-score");
    examEl.innerHTML = `
        <h2>${exam.subject}</h2>
        <p>Score: ${exam.score} / ${exam.maxScore}</p>
      `;
    summaryContainer.appendChild(examEl);
  });
}

// Call the function to generate the summary
generateSummary();
