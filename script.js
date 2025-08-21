// Landing overlay
const landing = document.getElementById('landing');
const bgMusic = document.getElementById('bg-music');

landing.addEventListener('click', () => {
    landing.style.opacity = '0';
    setTimeout(() => { landing.style.display = 'none'; }, 800);
    bgMusic.play();
});

// Custom cursor
const cursor = document.getElementById('cursor-dot');
document.addEventListener('mousemove', e => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

// Speaker toggle & volume
const speaker = document.getElementById('speaker');
const volumeSlider = document.getElementById('volume-slider');

speaker.addEventListener('click', () => {
    if(bgMusic.paused) bgMusic.play();
    else bgMusic.pause();
});
volumeSlider.addEventListener('input', () => {
    bgMusic.volume = volumeSlider.value;
});

// Particle canvas
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
