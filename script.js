/* ================= AUDIO SYNTHESIZER & SOUND EFFECTS ================= */
let audioCtx = null;
let isMuted = true;
let bgmInterval = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new(window.AudioContext || window.webkitAudioContext)();
    }
}

function toggleAudio() {
    initAudio();
    const soundBtn = document.getElementById('sound-btn');
    const soundIcon = document.getElementById('sound-icon');

    if (isMuted) {
        isMuted = false;
        soundIcon.className = "fa-solid fa-volume-high text-emerald-400";
        soundBtn.classList.add("border-emerald-500");
        playCelebratoryMelody();
    } else {
        isMuted = true;
        soundIcon.className = "fa-solid fa-volume-xmark text-pink-400";
        soundBtn.classList.remove("border-emerald-500");
        if (bgmInterval) clearInterval(bgmInterval);
    }
}

// Web Audio Synthesizer Happy Birthday Theme
function playCelebratoryMelody() {
    if (isMuted || !audioCtx) return;

    const notes = [
        261.63, 261.63, 293.66, 261.63, 349.23, 329.63, // Happy Birthday to you
        261.63, 261.63, 293.66, 261.63, 392.00, 349.23, // Happy Birthday to you
        261.63, 261.63, 523.25, 440.00, 349.23, 329.63, 293.66, // Happy Birthday dear Yaqeena
        466.16, 466.16, 440.00, 349.23, 392.00, 349.23 // Happy Birthday to you
    ];

    let step = 0;
    if (bgmInterval) clearInterval(bgmInterval);

    bgmInterval = setInterval(() => {
        if (isMuted) return;
        playTone(notes[step % notes.length], 0.25);
        step++;
    }, 400);
}

function playTone(freq, duration) {
    try {
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
}

function playPopSound() {
    initAudio();
    playTone(587.33, 0.15); // D5 note quick pop
}


/* ================= UNBOXING GIFT REVEAL ================= */
function openGift() {
    initAudio();
    playPopSound();
    triggerConfetti();

    const overlay = document.getElementById('unboxing-overlay');
    const mainContent = document.getElementById('main-content');

    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';

    setTimeout(() => {
        overlay.style.display = 'none';
        mainContent.style.opacity = '1';
        // Auto toggle sound on unboxing
        toggleAudio();
    }, 800);
}


/* ================= NETWORK TOPOLOGY PING LOGIC ================= */
function pingNode(nodeType, message) {
    playPopSound();
    const outputText = document.getElementById('ping-text');
    outputText.innerHTML = `<span class="text-emerald-400 animate-pulse">> PING ${nodeType.toUpperCase()} SUCCESS (0ms):</span> ${message}`;
    triggerConfetti();
}


/* ================= CAKE CANDLES LOGIC ================= */
let candlesBlown = false;

function extinguishCandles() {
    if (candlesBlown) return;

    ['flame-1', 'flame-2', 'flame-3'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    candlesBlown = true;
    playPopSound();
    triggerConfetti();

    const wishBox = document.getElementById('wish-box');
    wishBox.innerHTML = '🎉 انطفت الشموع! تحقق الأمنية والتخرج القريب قادم بإذن الله يا أحلى مهندسة! 🎓✨';
}


/* ================= YAQEEN TERMINAL COMMANDS ================= */
function runCommand(cmd) {
    playPopSound();
    const out = document.getElementById('terminal-custom-output');

    if (cmd === 'ping') {
        out.innerHTML = `<span class="text-emerald-400">> PING yaqeen.babylon.edu.iq: 64 bytes from 192.168.1.22: icmp_seq=1 ttl=64 time=0.09 ms (Status: 100% Cute & Smart)</span>`;
    } else if (cmd === 'graduate') {
        out.innerHTML = `<span class="text-purple-300">> [SUCCESS] Executing graduation script... Progress 99% -> 100%! Congratulations Eng. Yaqeen! 🎓🎉</span>`;
    } else if (cmd === 'wish') {
        out.innerHTML = `<span class="text-amber-300">> "كل عام وأنتِ بقمة النجاح والتألق، وأحلى مهندسة شبكات في الدنيا!" 💖</span>`;
    } else if (cmd === 'clear') {
        out.innerHTML = '';
    }
}


/* ================= COMPLIMENT / SURPRISE GENERATOR ================= */
const surprises = [
    "يقين مو بس مهندسة شبكات، يقين طاقة إيجابية وضحكة تمشي على الأرض! 🌸",
    "ذكاء هندسي + كيوتنس وتختخة لطيفة = الخلطة السرية للباش مهندسة يقينة! 🍩✨",
    "سنة 2026 راح تتسجّل بـ التاريخ كأحلى سنة تخرج للمهندسة يقين أحمد! 🎓🏛️",
    "طيبة قلب يقين وروحها الحلوة تعادل سيرفر كامل مليان حب وسعادة! 💾💖",
    "جامعة بابل محظوظة جداً بأن يقين وحدة من مهندساتها المتميزات! 🏛️✨",
    "كل عام وأنتِ النسخة الأحلى والألطف والأكثر نجاحاً من نفسكِ! 👑🎉"
];

function generateSurprise() {
    playPopSound();
    const display = document.getElementById('surprise-display');
    const randomIndex = Math.floor(Math.random() * surprises.length);

    display.style.opacity = '0';
    display.style.transform = 'scale(0.95)';

    setTimeout(() => {
        display.innerText = surprises[randomIndex];
        display.style.opacity = '1';
        display.style.transform = 'scale(1)';
    }, 150);
}


/* ================= PHOTO UPLOAD HANDLER ================= */
function loadUserPhotos(event) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const imgElements = document.querySelectorAll('.gallery-img');
    for (let i = 0; i < Math.min(files.length, imgElements.length); i++) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imgElements[i].src = e.target.result;
        };
        reader.readAsDataURL(files[i]);
    }
    playPopSound();
    triggerConfetti();
}


/* ================= CONFETTI CANNON ================= */
function triggerConfetti() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: {
                y: 0.6
            }
        });
    }
}


/* ================= BACKGROUND ANIMATED PARTICLES ================= */
window.addEventListener('load', () => {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = Array.from({
        length: 45
    }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? 'rgba(244, 63, 94, ' : 'rgba(139, 92, 246, ',
        alpha: Math.random() * 0.5 + 0.2,
        speedY: Math.random() * 0.6 + 0.2,
    }));

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.y -= p.speedY;
            if (p.y < 0) p.y = canvas.height;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color + p.alpha + ')';
            ctx.fill();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
});