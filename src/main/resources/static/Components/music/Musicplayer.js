const music = document.getElementById("audio");
const audimg = document.getElementById("audioimg"); // album cover
const aud = document.getElementById("audioa"); // on-off music
const audimageSources = ["media/ico/audio-off.png", "media/ico/audio-on.png"]; // music button picture change when clicked
const MusicProgressBar = document.getElementById("musicprocess");
const ProcTime = document.getElementById("AudProcess");
const FullTimeMusic = document.getElementById("AudLength");
const musiccover = document.getElementById("MusicCover");
const songname = document.getElementById("SongName");
const ownname = document.getElementById("OwnName");
var musicplaying = false;

const musicFiles = [
  "media/audio/WelcomeSchool.mp3",
  "media/audio/BakaMitai.mp3",
  "media/audio/LuminousMemory.mp3",
  "media/audio/DolceBiblioteca.mp3",
  // Add more music file names here
];
const coverFiles = [
  "media/img/ShirokoTerror.png",
  "media/img/Kiryu.png",
  "media/img/Asuza.png",
  "media/img/Ui.png",
  // Add more music file names here
];

const SongName = [
  "Welcome School lofi mix",
  "Baka Mitai lofi mix",
  "Luminous Memory lofi mix",
  "Dolce Biblioteca lofi mix",
];

const OwnName = ["Blue Archive", "Yakuza", "Blue Archive", "Blue Archive"];
let currentSongIndex = 0;

function updateMusicProgress() {
  const currentTime = music.currentTime;
  const duration = music.duration;

  // Calculate hours, minutes, and seconds for currentTime and duration
  const currentHours = Math.floor(currentTime / 3600);
  const currentMinutes = Math.floor((currentTime % 3600) / 60);
  const currentSeconds = Math.floor(currentTime % 60);

  const durationHours = Math.floor(duration / 3600);
  const durationMinutes = Math.floor((duration % 3600) / 60);
  const durationSeconds = Math.floor(duration % 60);

  // Create formatted time strings
  const currentTimeFormatted =
    currentHours > 0
      ? `${currentHours.toString().padStart(2, "0")}:${currentMinutes
          .toString()
          .padStart(2, "0")}:${currentSeconds.toString().padStart(2, "0")}`
      : `${currentMinutes.toString().padStart(2, "0")}:${currentSeconds
          .toString()
          .padStart(2, "0")}`;

  const durationFormatted =
    durationHours > 0
      ? `${durationHours}:${durationMinutes
          .toString()
          .padStart(2, "0")}:${durationSeconds.toString().padStart(2, "0")}`
      : `${durationMinutes}:${durationSeconds.toString().padStart(2, "0")}`;

  const progressPercentage = (currentTime / duration) * 100;
  MusicProgressBar.style.width = progressPercentage + "%";
  ProcTime.textContent = currentTimeFormatted;
  FullTimeMusic.textContent = durationFormatted;
}

music.addEventListener("timeupdate", updateMusicProgress);

aud.addEventListener("click", function () {
  if (musicplaying === false) {
    music.play();
    music.volume = 0.03;
    audimg.src = audimageSources[1];
  } else {
    music.pause();
    audimg.src = audimageSources[0];
  }
  musicplaying = !musicplaying;
});
function initranom() {
  currentSongIndex = getRandomSongIndex();
  music.src = musicFiles[currentSongIndex];
  musiccover.src = coverFiles[currentSongIndex];
  ownname.textContent = OwnName[currentSongIndex];
  songname.textContent = SongName[currentSongIndex];
  music.load();
}

function playNextRandomMusic() {
  currentSongIndex = getRandomSongIndex();
  music.src = musicFiles[currentSongIndex];
  musiccover.src = coverFiles[currentSongIndex];
  ownname.textContent = OwnName[currentSongIndex];
  songname.textContent = SongName[currentSongIndex];
  music.load();
  music.play();
}

// Play random music initially
initranom();

// Change the music source and play random music when the current song ends
music.addEventListener("ended", function () {
  playNextRandomMusic();
});
