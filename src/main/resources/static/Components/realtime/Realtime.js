const Timer = document.getElementById("rTime");
const dateshow = document.getElementById("dmy");
const Timez = document.getElementById("Timezone");

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
  Timer.textContent = Time;
  dateshow.textContent = DateTime;
  Timez.textContent = Timezone;
}

setInterval(updateDateTime, 1000);
updateDateTime();
