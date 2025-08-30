// SONG LIST - add your files here
const songs = [
    "music.mp3",
    "music2.mp3", // add more if you have
    "music3.mp3"
].filter(src => {
    // Check if file exists
    const req = new XMLHttpRequest();
    req.open('HEAD', src, false);
    req.send();
    return req.status !== 404;
});

let currentSong = Math.floor(Math.random() * songs.length);
const bgMusic = new Audio();
bgMusic.src = songs[currentSong];
bgMusic.loop = false;

// LANDING PAGE
const landing = document.getElementById('landing');
landing.addEventListener('click', () => {
    landing.style.opacity = '0';
    setTimeout(() => { landing.style.display = 'none'; }, 800);
    if(songs.length > 0) bgMusic.play();
});

// CUSTOM CURSOR
const cursor = document.getElementById('cursor-dot');
document.addEventListener('mousemove', e => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

// MUSIC CONTROLS
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev-song');
const nextBtn = document.getElementById('next-song');
const volumeSlider = document.getElementById('volume-slider');

function playSong() {
    if(songs.length === 0) return;
    bgMusic.src = songs[currentSong];
    bgMusic.play();
    playPauseBtn.textContent = "II";
}

function pauseSong() {
    bgMusic.pause();
    playPauseBtn.textContent = "▶";
}

playPauseBtn.addEventListener('click', () => {
    if(bgMusic.paused) playSong();
    else pauseSong();
});

prevBtn.addEventListener('click', () => {
    if(songs.length === 0) return;
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    playSong();
});

nextBtn.addEventListener('click', () => {
    if(songs.length === 0) return;
    currentSong = (currentSong + 1) % songs.length;
    playSong();
});

volumeSlider.addEventListener('input', () => {
    bgMusic.volume = volumeSlider.value;
});

// AUTO NEXT SONG
bgMusic.addEventListener('ended', () => {
    if(songs.length === 0) return;
    currentSong = (currentSong + 1) % songs.length;
    playSong();
});

// PARTICLE CANVAS
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createParticles(){
    particles = [];
    for(let i=0;i<100;i++){
        particles.push({
            x: Math.random()*canvas.width,
            y: Math.random()*canvas.height,
            r: Math.random()*2+1,
            dx: (Math.random()-0.5)*0.5,
            dy: (Math.random()-0.5)*0.5
        });
    }
}

function drawParticles(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = '#fff';
    particles.forEach(p=>{
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if(p.x<0 || p.x>canvas.width) p.dx *= -1;
        if(p.y<0 || p.y>canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(drawParticles);
}

createParticles();
drawParticles();
