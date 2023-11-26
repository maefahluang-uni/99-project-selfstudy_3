// Example static data, replace this with dynamic data from your server
const historyData = [
    { loginDate: '2023-01-01', testTopic: 'Math', score: 80 },
    { loginDate: '2023-01-05', testTopic: 'Science', score: 90 },
];

const statsData = [
    { testTopic: 'Math', avgScore: 85, avgTime: 60 },
    { testTopic: 'Science', avgScore: 87, avgTime: 55 },
];

// Function to populate History table
function populateHistory() {
    const historyTable = document.getElementById('historyTable').getElementsByTagName('tbody')[0];
    historyData.forEach(item => {
        let row = historyTable.insertRow();
        row.insertCell(0).textContent = item.loginDate;
        row.insertCell(1).textContent = item.testTopic;
        row.insertCell(2).textContent = item.score;
    });
}

// Function to populate Statistics table
function populateStats() {
    const statsTable = document.getElementById('statsTable').getElementsByTagName('tbody')[0];
    statsData.forEach(item => {
        let row = statsTable.insertRow();
        row.insertCell(0).textContent = item.testTopic;
        row.insertCell(1).textContent = item.avgScore;
        row.insertCell(2).textContent = item.avgTime;
    });
}

// Call the functions on window load
window.onload = () => {
    populateHistory();
    populateStats();
};
