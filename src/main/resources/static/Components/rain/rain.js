const AnimageSources = ["media/ico/animation-off.png", "media/ico/animation-on.png"];
const BtnChange = document.getElementById("Anima");
let canvas = document.getElementById('rainCanvas');
let ctx = canvas.getContext('2d');
let rainDrops = [];
let raining = true;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// RainDrop class
class RainDrop {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height;
        this.speed = Math.random() * 4 + 1;
        this.length = Math.random() * 20 + 5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.wind = Math.random() * 1.5;
    }
    update() {
        this.y += this.speed;
        this.x += this.wind;
        if (this.y > canvas.height || this.x > canvas.width) {
            this.y = Math.random() * -canvas.height;
            this.x = Math.random() * canvas.width;
        }
    }
    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.wind * 5, this.y + this.length);
        ctx.strokeStyle = `rgba(173, 216, 230, ${this.opacity})`;
        ctx.lineWidth = this.speed / 4;
        ctx.stroke();
    }
}

// Create an array of raindrops
for (let i = 0; i < 500; i++) {  // Increase count for more drops
    rainDrops.push(new RainDrop());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (raining) {
        for (let drop of rainDrops) {
            drop.update();
            drop.draw();
        }
    }
    requestAnimationFrame(animate);
}
animate();

function toggleRain() {
    raining = !raining;

    // Play or pause the sound based on raining state
    if (raining) {
        rainAudio.play();
        rainAudio.volume = 0.1;
        BtnChange.src = AnimageSources[1];
    } else {
        rainAudio.pause();
        BtnChange.src = AnimageSources[0];
    }
}

let rainAudio = document.getElementById('rainSound');

// Start playing the audio when the page loads
rainAudio.volume = 0.1;

// Add an event listener for the "play" event to handle audio playback
rainAudio.addEventListener('play', function () {
    raining = true;
    BtnChange.src = AnimageSources[1];
});

// Add an event listener for the "pause" event to handle audio pause
rainAudio.addEventListener('pause', function () {
    raining = false;
    BtnChange.src = AnimageSources[0];
});
